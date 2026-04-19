/**
 * upload-docs.ts v2
 *
 * Hierarchical chunking, rich metadata, chunk_type inference, keyword extraction.
 *
 * Usage:
 *   npx tsx scripts/upload-docs.ts ./books/
 *   npx tsx scripts/upload-docs.ts ./books/harmer.md
 */

import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!

const EMBEDDING_MODEL = 'openai/text-embedding-3-small' // MUST match route.ts exactly
const TARGET_CHUNK_TOKENS = 400
const TARGET_CHUNK_CHARS = TARGET_CHUNK_TOKENS * 4
const BATCH_SIZE = 20

// ── Category detection ────────────────────────────────────────────────────────
function detectCategory(filename: string): string {
  const f = filename.toLowerCase()
  if (f.match(/celta|cambridge.cert|teaching.practice|tp.feedback/)) return 'celta'
  if (f.match(/delta|diploma/)) return 'delta'
  if (f.match(/classroom.manag|scrivener|managing.class/)) return 'classroom_mgmt'
  if (f.match(/phonolog|pronunciation|sound|intonation/)) return 'phonology'
  if (f.match(/grammar|syntax|morpholog/)) return 'linguistics'
  if (f.match(/methodolog|approach|harmer|ppp|tbl|esa|how.to.teach/)) return 'methodology'
  if (f.match(/vocabular|lexis|nation/)) return 'vocabulary'
  if (f.match(/reading|writing|listening|speaking|skill/)) return 'skills'
  return 'general_elt'
}

// ── Title/author from filename ────────────────────────────────────────────────
function parseMeta(filename: string): { title: string; author: string } {
  const base = path.basename(filename, path.extname(filename))
  const match = base.match(/^(.+?)\s*[-–]\s*(.+)$/)
  if (match) return { author: match[1].trim(), title: match[2].trim() }
  return { title: base.replace(/[-_]/g, ' '), author: 'Unknown' }
}

// ── Chunk type inference ──────────────────────────────────────────────────────
function inferChunkType(heading: string, content: string): string {
  const h = heading.toLowerCase()
  const c = content.toLowerCase()

  if (h.match(/step|how to|procedure|giving instructions|instruction|technique|method|approach/))
    return 'procedure'
  if (h.match(/criteria|assessment|grade|pass|lsa|pda|requirement|standard|descriptor/))
    return 'assessment_criteria'
  if (h.match(/example|sample|illustration|case study|extract/))
    return 'example'
  if (h.match(/definition|what is|meaning|concept|term|glossary/))
    return 'definition'
  if (h.match(/warning|avoid|common mistake|pitfall|error|problem|challenge/))
    return 'warning'
  if (c.match(/for example|for instance|such as|e\.g\.|consider this/))
    return 'example'
  if (c.match(/step 1|step 2|firstly|secondly|thirdly|finally,|next,|then,/))
    return 'procedure'
  if (c.match(/criterion|criteria|must|should|required|assessed|marked/))
    return 'assessment_criteria'
  return 'explanation'
}

// ── Keyword extraction ────────────────────────────────────────────────────────
const ELT_KEYWORDS = [
  'ccq', 'icq', 'concept checking', 'elicitation', 'drilling', 'board work',
  'classroom management', 'instructions', 'giving instructions', 'monitoring',
  'feedback', 'error correction', 'recast', 'reformulation',
  'lesson plan', 'stage', 'warmer', 'lead-in', 'presentation', 'practice', 'production',
  'ppp', 'tbl', 'esa', 'clt', 'communicative',
  'target language', 'language awareness', 'form', 'meaning', 'use', 'pronunciation',
  'receptive skills', 'productive skills', 'reading', 'writing', 'listening', 'speaking',
  'fluency', 'accuracy', 'complexity',
  'celta', 'delta', 'lsa', 'pda', 'teaching practice', 'observed lesson',
  'assessment criteria', 'merit', 'distinction', 'pass', 'fail',
  'teacher talking time', 'ttt', 'student talking time', 'stt',
  'phoneme', 'stress', 'intonation', 'connected speech', 'word stress',
  'collocation', 'lexical chunk', 'vocabulary', 'lexis',
]

function extractKeywords(content: string): string[] {
  const lower = content.toLowerCase()
  return ELT_KEYWORDS.filter(kw => lower.includes(kw))
}

// ── Hierarchical Markdown chunker ─────────────────────────────────────────────
interface Chunk {
  content: string
  chapter: string
  section: string
  heading_path: string
  chunk_type: string
  keywords: string[]
}

function chunkMarkdown(content: string): Chunk[] {
  const chunks: Chunk[] = []
  const lines = content.split('\n')

  let h1 = ''
  let h2 = ''
  let h3 = ''
  let paragraphBuffer: string[] = []

  const flushBuffer = () => {
    const text = paragraphBuffer.join('\n').trim()
    if (text.length < 120) {
      paragraphBuffer = []
      return
    }

    const chapter = h1 || 'Introduction'
    const section = h2 || h1 || 'Introduction'
    const headingPath = [h1, h2, h3].filter(Boolean).join(' > ')
    const lowestHeading = h3 || h2 || h1 || 'Introduction'

    // Split oversized buffers by paragraph
    if (text.length > TARGET_CHUNK_CHARS) {
      const paragraphs = text.split(/\n{2,}/)
      let current: string[] = []

      for (const para of paragraphs) {
        const currentText = current.join('\n\n')
        if (currentText.length + para.length > TARGET_CHUNK_CHARS && current.length > 0) {
          const chunkText = currentText.trim()
          if (chunkText.length >= 120) {
            chunks.push({
              content: chunkText,
              chapter,
              section,
              heading_path: headingPath,
              chunk_type: inferChunkType(lowestHeading, chunkText),
              keywords: extractKeywords(chunkText),
            })
          }
          // Overlap: keep last paragraph
          current = [paragraphs[paragraphs.indexOf(para) - 1] || '', para].filter(Boolean)
        } else {
          current.push(para)
        }
      }

      if (current.length > 0) {
        const chunkText = current.join('\n\n').trim()
        if (chunkText.length >= 120) {
          chunks.push({
            content: chunkText,
            chapter,
            section,
            heading_path: headingPath,
            chunk_type: inferChunkType(lowestHeading, chunkText),
            keywords: extractKeywords(chunkText),
          })
        }
      }
    } else {
      chunks.push({
        content: text,
        chapter,
        section,
        heading_path: headingPath,
        chunk_type: inferChunkType(lowestHeading, text),
        keywords: extractKeywords(text),
      })
    }

    paragraphBuffer = []
  }

  for (const line of lines) {
    if (line.match(/^#\s/)) {
      flushBuffer()
      h1 = line.replace(/^#+\s/, '').trim()
      h2 = ''
      h3 = ''
    } else if (line.match(/^##\s/)) {
      flushBuffer()
      h2 = line.replace(/^#+\s/, '').trim()
      h3 = ''
    } else if (line.match(/^###\s/)) {
      flushBuffer()
      h3 = line.replace(/^#+\s/, '').trim()
    } else {
      paragraphBuffer.push(line)
    }
  }

  flushBuffer()
  return chunks
}

// ── Embed batch ───────────────────────────────────────────────────────────────
async function embedBatch(texts: string[], openai: OpenAI): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  })
  return response.data.map(d => d.embedding)
}

// ── Upload one file ───────────────────────────────────────────────────────────
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

  // Skip if already uploaded
  const { data: existing } = await supabase
    .from('documents')
    .select('id')
    .eq('filename', filename)
    .single()

  if (existing) {
    console.log(`   ⏭  Already uploaded — skipping`)
    return
  }

  const { data: doc, error: docError } = await supabase
    .from('documents')
    .insert({ title, author, filename, category })
    .select()
    .single()

  if (docError || !doc) {
    console.error(`   ❌ Failed to insert document:`, docError)
    return
  }

  const rawChunks = chunkMarkdown(content)
  console.log(`   📦 ${rawChunks.length} chunks`)

  let uploaded = 0
  for (let i = 0; i < rawChunks.length; i += BATCH_SIZE) {
    const batch = rawChunks.slice(i, i + BATCH_SIZE)
    const texts = batch.map(c => c.content)

    let embeddings: number[][]
    try {
      embeddings = await embedBatch(texts, openai)
    } catch (err) {
      console.error(`   ❌ Embedding error at batch ${i}:`, err)
      continue
    }

    const rows = batch.map((chunk, j) => ({
      document_id: doc.id,
      content: chunk.content,
      embedding: JSON.stringify(embeddings[j]),
      chapter: chunk.chapter,
      section: chunk.section,
      heading_path: chunk.heading_path,
      chunk_type: chunk.chunk_type,
      keywords: chunk.keywords,
      chunk_index: i + j,
      token_count: Math.round(chunk.content.length / 4),
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

  await supabase.from('documents').update({ chunk_count: uploaded }).eq('id', doc.id)
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
  for (const file of files) await uploadFile(file, supabase, openai)
  console.log('\n🎉 All done!')
}

main().catch(console.error)
