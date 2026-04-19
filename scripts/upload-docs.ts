/**
 * upload-docs.ts
 * 
 * Chunks your MD files, embeds them with OpenAI, and uploads to Supabase.
 * 
 * Usage:
 *   npx tsx scripts/upload-docs.ts ./books/
 * 
 * Or a single file:
 *   npx tsx scripts/upload-docs.ts ./books/harmer.md
 */

import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY! // use service role for writes
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!

const CHUNK_SIZE = 400      // tokens (approximate — we use chars/4)
const CHUNK_OVERLAP = 50    // token overlap between chunks
const BATCH_SIZE = 20       // embeddings per API call

// ── Category detection from filename ─────────────────────────────────────────
function detectCategory(filename: string): string {
  const f = filename.toLowerCase()
  if (f.includes('celta') || f.includes('cambridge-cert') || f.includes('teaching-practice')) return 'celta'
  if (f.includes('delta') || f.includes('diploma')) return 'delta'
  if (f.includes('classroom-management') || f.includes('scrivener') || f.includes('managing')) return 'classroom_mgmt'
  if (f.includes('phonolog') || f.includes('pronunciation') || f.includes('sound')) return 'phonology'
  if (f.includes('grammar') || f.includes('syntax') || f.includes('morpholog')) return 'linguistics'
  if (f.includes('methodology') || f.includes('approach') || f.includes('method') || f.includes('harmer')) return 'methodology'
  if (f.includes('vocabulary') || f.includes('lexis') || f.includes('nation')) return 'vocabulary'
  if (f.includes('reading') || f.includes('writing') || f.includes('listening') || f.includes('speaking')) return 'skills'
  return 'general_elt'
}

// ── Extract title/author from filename ───────────────────────────────────────
function parseMeta(filename: string): { title: string; author: string } {
  const base = path.basename(filename, path.extname(filename))
  // Try "Author - Title" format
  const match = base.match(/^(.+?)\s*[-–]\s*(.+)$/)
  if (match) return { author: match[1].trim(), title: match[2].trim() }
  return { title: base.replace(/[-_]/g, ' '), author: 'Unknown' }
}

// ── Chunk MD file by headings + size ─────────────────────────────────────────
function chunkMarkdown(content: string): { text: string; chapter: string }[] {
  const chunks: { text: string; chapter: string }[] = []
  const lines = content.split('\n')
  
  let currentChapter = 'Introduction'
  let currentBuffer: string[] = []
  const charLimit = CHUNK_SIZE * 4 // approx chars per token
  const overlapChars = CHUNK_OVERLAP * 4

  const flush = (buffer: string[]) => {
    const text = buffer.join('\n').trim()
    if (text.length < 100) return // skip tiny chunks
    chunks.push({ text, chapter: currentChapter })
  }

  for (const line of lines) {
    // New heading = new chapter
    if (line.match(/^#{1,3}\s/)) {
      if (currentBuffer.length > 0) flush(currentBuffer)
      currentChapter = line.replace(/^#+\s/, '').trim()
      currentBuffer = [line]
      continue
    }

    currentBuffer.push(line)
    const bufferText = currentBuffer.join('\n')

    // If buffer exceeds chunk size, flush with overlap
    if (bufferText.length > charLimit) {
      flush(currentBuffer)
      // Keep last N chars as overlap for next chunk
      const overlap = bufferText.slice(-overlapChars)
      currentBuffer = [overlap]
    }
  }

  if (currentBuffer.length > 0) flush(currentBuffer)
  return chunks
}

// ── Embed batch of texts ──────────────────────────────────────────────────────
async function embedBatch(texts: string[], openai: OpenAI): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  })
  return response.data.map(d => d.embedding)
}

// ── Upload one MD file ────────────────────────────────────────────────────────
async function uploadFile(
  filePath: string,
  supabase: ReturnType<typeof createClient>,
  openai: OpenAI
) {
  const filename = path.basename(filePath)
  const { title, author } = parseMeta(filename)
  const category = detectCategory(filename)
  const content = fs.readFileSync(filePath, 'utf-8')

  console.log(`\n📖 ${title} (${category})`)

  // Check if already uploaded
  const { data: existing } = await supabase
    .from('documents')
    .select('id')
    .eq('filename', filename)
    .single()

  if (existing) {
    console.log(`   ⏭  Already uploaded, skipping`)
    return
  }

  // Insert document
  const { data: doc, error: docError } = await supabase
    .from('documents')
    .insert({ title, author, filename, category })
    .select()
    .single()

  if (docError || !doc) {
    console.error(`   ❌ Failed to insert document:`, docError)
    return
  }

  // Chunk the content
  const rawChunks = chunkMarkdown(content)
  console.log(`   📦 ${rawChunks.length} chunks`)

  // Embed in batches
  let uploaded = 0
  for (let i = 0; i < rawChunks.length; i += BATCH_SIZE) {
    const batch = rawChunks.slice(i, i + BATCH_SIZE)
    const texts = batch.map(c => c.text)

    let embeddings: number[][]
    try {
      embeddings = await embedBatch(texts, openai)
    } catch (err) {
      console.error(`   ❌ Embedding error at batch ${i}:`, err)
      continue
    }

    const rows = batch.map((chunk, j) => ({
      document_id: doc.id,
      content: chunk.text,
      embedding: JSON.stringify(embeddings[j]),
      chapter: chunk.chapter,
      chunk_index: i + j,
      token_count: Math.round(chunk.text.length / 4),
      category,
    }))

    const { error: chunkError } = await supabase.from('chunks').insert(rows)
    if (chunkError) {
      console.error(`   ❌ Chunk insert error:`, chunkError)
      continue
    }

    uploaded += batch.length
    process.stdout.write(`   ✅ ${uploaded}/${rawChunks.length} chunks\r`)
  }

  // Update chunk count
  await supabase
    .from('documents')
    .update({ chunk_count: uploaded })
    .eq('id', doc.id)

  console.log(`   ✅ Done — ${uploaded} chunks uploaded`)
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const input = process.argv[2]
  if (!input) {
    console.error('Usage: npx tsx scripts/upload-docs.ts <file.md or folder/>')
    process.exit(1)
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !OPENROUTER_API_KEY) {
    console.error('Missing env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENROUTER_API_KEY')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  const openai = new OpenAI({
    apiKey: OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'https://celtaprep.com',
      'X-Title': 'CELTA Prep Morocco',
    },
  })

  // Collect files
  let files: string[] = []
  const stat = fs.statSync(input)
  if (stat.isDirectory()) {
    files = fs.readdirSync(input)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(input, f))
  } else {
    files = [input]
  }

  console.log(`\n🚀 Uploading ${files.length} file(s) to Supabase...\n`)

  for (const file of files) {
    await uploadFile(file, supabase, openai)
  }

  console.log('\n🎉 All done!')
}

main().catch(console.error)
