#!/usr/bin/env npx tsx
/**
 * prepare-docs.ts v2
 *
 * Automatic document preparation pipeline for RAG ingestion.
 * Uses OpenRouter (no separate Claude API needed).
 *
 * Usage:
 *   npx tsx scripts/prepare-docs.ts ~/books/harmer.md ~/books-clean/
 *   npx tsx scripts/prepare-docs.ts ~/books/ ~/books-clean/
 */

import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!

const openrouter = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://celtaprep.com',
    'X-Title': 'CELTA Prep Morocco',
  },
})

// ── Format detection ──────────────────────────────────────────────────────────
type DocFormat = 'page_ocr' | 'good_md' | 'flat_text' | 'merged_index' | 'marker_md'

function detectFormat(content: string): DocFormat {
  const lines = content.split('\n')
  const headings = lines.filter(l => l.match(/^#{1,4}\s/))
  const pageHeadings = headings.filter(l => l.match(/^## page_\d+/i))
  const realHeadings = headings.filter(l => !l.match(/^## page_\d+/i))
  const hasIndex = content.includes('File Information') && content.includes('Purpose & Context')
  const hasYaml = content.slice(0, 500).includes('optimized_for:') || content.slice(0, 500).includes('chatgpt_capacity')

  if (hasYaml || hasIndex) return 'merged_index'
  if (pageHeadings.length > 5 || content.includes("\\n\\n**Source PDF")) return 'page_ocr'
  if (realHeadings.length > 15) return 'good_md'
  if (realHeadings.length > 3) return 'marker_md'
  return 'flat_text'
}

// ── Noise patterns ────────────────────────────────────────────────────────────
const NOISE_LINE_RE = [
  /^## page_\d+\s*$/i,
  /^\*\*(Source PDF|Total Pages|Processed|OCR Method|Original|Size|Module|Type|Category):\*\*/,
  /^(📄|🎯|🔍|💡|🔗)\s*\*\*/,
  /^\s*[-—=]{3,}\s*$/,
  /^\s*\d{1,3}\s*$/,
  /^optimized_for:|^chatgpt_capacity|^token_limit|^total_size|^estimated_tokens/,
]

function isNoise(line: string): boolean {
  const s = line.trim()
  if (!s) return false
  for (const p of NOISE_LINE_RE) if (p.test(s)) return true
  if (s.length <= 3 && !s.match(/^[a-z]/i)) return true
  const nonAscii = [...s].filter(c => c.charCodeAt(0) > 127).length
  if (s.length > 3 && nonAscii / s.length > 0.4) return true
  return false
}

// ── Heading detection ─────────────────────────────────────────────────────────
const HEADING_RE = [
  /^(?:Chapter\s+)?(\d{1,2})[.:]\s+[A-Z].{4,60}$/,
  /^(?:UNIT|SECTION|PART|MODULE)\s+[\dA-Z]+(?:\s*[:\-]\s*.{0,50})?$/i,
  /^(?:Teaching|Learning|Using|Managing|Giving|Planning|Working|Understanding|Getting|Making|Developing)\s+\w.{3,40}$/i,
  /^[A-Z][a-zA-Z]+(?:\s+[a-zA-Z]+){1,5}$/,
]

function looksLikeHeading(line: string, prev: string, next: string): boolean {
  const s = line.trim()
  if (s.length < 5 || s.length > 70) return false
  if (s.startsWith('#') || s.endsWith(',') || s.endsWith(';') || s.endsWith('.')) return false
  if (prev.trim() && next.trim()) return false // not surrounded by blanks
  for (const p of HEADING_RE) if (p.test(s)) return true
  return false
}

// ── Claude via OpenRouter for hard heading detection ──────────────────────────
async function detectHeadingsWithAI(content: string, filename: string): Promise<string[]> {
  if (!OPENROUTER_API_KEY) return []

  const sample = content.slice(0, 4000)
  try {
    const res = await openrouter.chat.completions.create({
      model: 'anthropic/claude-haiku-4-5',
      max_tokens: 400,
      messages: [{
        role: 'user',
        content: `This is from an ELT textbook called "${path.basename(filename, '.md')}".

List ALL chapter and section headings found in this text sample. Return ONLY the heading text, one per line, exactly as written. If none found, write NONE.

TEXT:
${sample}`,
      }],
    })
    const text = res.choices[0]?.message?.content || ''
    if (text.trim() === 'NONE') return []
    return text.split('\n').map(l => l.trim()).filter(l => l.length > 3 && l.length < 80 && !l.startsWith('-'))
  } catch {
    return []
  }
}

// ── Cleaners per format ───────────────────────────────────────────────────────
function processLines(lines: string[], aiHeadings: string[]): string[] {
  const headingSet = new Set(aiHeadings.map(h => h.toLowerCase()))
  const out: string[] = []
  let blanks = 0
  let skipHeader = true

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const s = line.trim()

    // Skip big OCR file header at top of file
    if (skipHeader) {
      if (s.match(/^## page_\d+/i) || s.match(/Source PDF|Total Pages|OCR Method/)) continue
      if (s && !s.startsWith('#') && s.length > 10) skipHeader = false
      else if (skipHeader) continue
    }

    if (isNoise(line)) continue
    if (s.match(/^## page_\d+/i)) continue

    // AI-detected heading
    if (s && headingSet.has(s.toLowerCase()) && !s.startsWith('#')) {
      out.push(`\n## ${s}`)
      blanks = 0
      continue
    }

    // Pattern-detected heading
    const prev = lines[i - 1] || ''
    const next = lines[i + 1] || ''
    if (s && looksLikeHeading(s, prev, next)) {
      out.push(`\n## ${s}`)
      blanks = 0
      continue
    }

    if (!s) {
      blanks++
      if (blanks <= 2) out.push('')
    } else {
      blanks = 0
      out.push(line.trimEnd())
    }
  }

  return out
}

function cleanPageOCR(content: string, aiHeadings: string[]): string {
  return processLines(content.split('\n'), aiHeadings).join('\n')
}

function cleanGoodMD(content: string): string {
  return content.split('\n')
    .filter(l => !isNoise(l))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
}

function cleanMergedIndex(content: string): string {
  const lines = content.split('\n')
  const out: string[] = []
  let skip = false
  for (const line of lines) {
    const s = line.trim()
    if (s.match(/^(📄|🎯|🔍|💡|🔗)\s*\*\*/) || s.match(/^#### Document \d+/)) { skip = true; continue }
    if (skip && s === '---') { skip = false; continue }
    if (skip) continue
    if (isNoise(line)) continue
    if (s.match(/^(title|description|version|created|optimized_for|total_|estimated_|chatgpt_|token_limit):/i)) continue
    out.push(line.trimEnd())
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n')
}

// ── Quality check ─────────────────────────────────────────────────────────────
interface QualityReport {
  filename: string
  format: DocFormat
  originalLines: number
  cleanedLines: number
  reductionPct: number
  headingCount: number
  qualityScore: number
  warnings: string[]
  pass: boolean
}

function checkQuality(orig: string, cleaned: string, filename: string, format: DocFormat): QualityReport {
  const origLines = orig.split('\n').length
  const cleanLines = cleaned.split('\n').length
  const headings = cleaned.split('\n').filter(l => l.match(/^#{1,3}\s/)).length
  const warnings: string[] = []
  let score = 100

  if (headings < 3) { warnings.push(`Only ${headings} headings — flat chunking`); score -= 30 }
  if (cleanLines < 50) { warnings.push(`Only ${cleanLines} lines — file too short`); score -= 40 }
  if (format === 'page_ocr' && cleanLines / origLines > 0.95) {
    warnings.push(`<5% noise removed from OCR — check manually`); score -= 15
  }

  return {
    filename, format,
    originalLines: origLines,
    cleanedLines: cleanLines,
    reductionPct: Math.round((1 - cleanLines / origLines) * 100),
    headingCount: headings,
    qualityScore: Math.max(0, score),
    warnings,
    pass: score >= 50,
  }
}

// ── Process single file ────────────────────────────────────────────────────────
async function processFile(inputPath: string, outputDir: string): Promise<QualityReport> {
  const filename = path.basename(inputPath)
  const outputPath = path.join(outputDir, filename)
  const content = fs.readFileSync(inputPath, 'utf-8')
  const format = detectFormat(content)

  let aiHeadings: string[] = []
  if (format === 'page_ocr' || format === 'flat_text') {
    aiHeadings = await detectHeadingsWithAI(content, filename)
  }

  let cleaned = ''
  switch (format) {
    case 'page_ocr':
    case 'flat_text':
      cleaned = cleanPageOCR(content, aiHeadings)
      break
    case 'good_md':
    case 'marker_md':
      cleaned = cleanGoodMD(content)
      break
    case 'merged_index':
      cleaned = cleanMergedIndex(content)
      break
  }

  // Add title if missing
  const title = filename.replace(/[-_]/g, ' ').replace('.md', '').replace(/\b\w/g, l => l.toUpperCase())
  if (!cleaned.trimStart().startsWith('#')) {
    cleaned = `# ${title}\n\n${cleaned}`
  }

  // Clean up trailing whitespace and excess blanks
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n'

  const report = checkQuality(content, cleaned, filename, format)

  if (report.pass) {
    fs.writeFileSync(outputPath, cleaned, 'utf-8')
  } else {
    // Save anyway but with a .review suffix so you can inspect it
    fs.writeFileSync(outputPath.replace('.md', '.review.md'), cleaned, 'utf-8')
  }

  return report
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const input = process.argv[2]
  const outputDir = process.argv[3]

  if (!input || !outputDir) {
    console.error('Usage: npx tsx scripts/prepare-docs.ts <input.md or folder/> <output-folder/>')
    process.exit(1)
  }

  if (!OPENROUTER_API_KEY) {
    console.error('Missing OPENROUTER_API_KEY env var')
    process.exit(1)
  }

  fs.mkdirSync(outputDir, { recursive: true })

  const files = fs.statSync(input).isDirectory()
    ? fs.readdirSync(input).filter(f => f.endsWith('.md')).map(f => path.join(input, f))
    : [input]

  console.log(`\n🔧 DOCUMENT PREPARATION PIPELINE`)
  console.log(`   ${files.length} file(s) → ${outputDir}\n`)

  const reports: QualityReport[] = []
  let passed = 0
  let failed = 0

  for (const file of files) {
    const fname = path.basename(file)
    process.stdout.write(`  📄 ${fname.slice(0, 45).padEnd(45)} `)

    try {
      const report = await processFile(file, outputDir)
      reports.push(report)

      const icon = report.pass ? '✅' : '⚠️ '
      console.log(`${icon} [${report.format.padEnd(12)}] ${String(report.headingCount).padStart(3)} headings | score: ${report.qualityScore}/100 | -${report.reductionPct}% noise`)

      for (const w of report.warnings) console.log(`       ${w}`)

      if (report.pass) passed++
      else failed++
    } catch (err: any) {
      console.log(`❌ ERROR: ${err.message}`)
      failed++
    }
  }

  // Summary
  const bar = '═'.repeat(65)
  console.log(`\n${bar}`)
  console.log(`📊 SUMMARY`)
  console.log(bar)
  console.log(`  ✅ Ready to upload : ${passed}`)
  console.log(`  ⚠️  Needs review   : ${failed}`)

  const fmtCounts: Record<string, number> = {}
  for (const r of reports) fmtCounts[r.format] = (fmtCounts[r.format] || 0) + 1
  console.log(`\n  Format breakdown:`)
  for (const [f, n] of Object.entries(fmtCounts)) console.log(`    ${f.padEnd(16)} ${n}`)

  const avgScore = Math.round(reports.reduce((s, r) => s + r.qualityScore, 0) / reports.length)
  console.log(`\n  Avg quality score: ${avgScore}/100`)
  console.log(`  Output folder    : ${outputDir}`)

  if (failed > 0) {
    console.log(`\n  ⚠️  Files needing review (saved as .review.md):`)
    reports.filter(r => !r.pass).forEach(r => {
      console.log(`    - ${r.filename} (score: ${r.qualityScore})`)
      r.warnings.forEach(w => console.log(`      ${w}`))
    })
  }

  console.log(`\n  Next: npx tsx scripts/upload-docs.ts ${outputDir}`)
  console.log()
}

main().catch(console.error)
