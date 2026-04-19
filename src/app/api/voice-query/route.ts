import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://celtaprep.com',
    'X-Title': 'CELTA Prep Morocco',
  },
})

const EMBEDDING_MODEL = 'openai/text-embedding-3-small'

// ── LLM Query Classification ──────────────────────────────────────────────────
// Replaces all regex — the LLM understands ELT jargon, abbreviations, and 
// concepts naturally without hardcoding every possibility
interface QueryClass {
  category: string | null
  intent: string
  target_type: string
  key_terms: string[]
  expanded_query: string  // full English expansion of query for better embedding
}

async function classifyQuery(query: string): Promise<QueryClass> {
  const prompt = `You are an ELT (English Language Teaching) expert. Classify this teacher training query.

Query: "${query}"

Return ONLY a JSON object with these exact fields:
{
  "category": one of [celta, delta, classroom_mgmt, phonology, linguistics, methodology, vocabulary, skills] or null if unclear,
  "intent": one of [how_to, definition, comparison, example, warning, requirements, rationale, general],
  "target_type": one of [procedure, definition, example, warning, assessment_criteria, explanation],
  "key_terms": array of 3-6 most important ELT terms from this query (expand abbreviations: TTT→teacher talk time, CCQ→concept checking question, ICQ→instruction checking question, STT→student talk time, PPP→presentation practice production, TBL→task based learning, ESA→engage study activate),
  "expanded_query": rewrite the query in full plain English, expanding all abbreviations and jargon (e.g. "What does TTT mean?" → "What does teacher talking time mean in English language teaching and why is it a problem for student learning?")
}

Rules for category:
- methodology: teaching methods, approaches, lesson stages, accuracy/fluency, TTT/STT, teacher roles, monitoring, feedback, error correction, PPP, TBL, ESA
- classroom_mgmt: student behaviour, motivation, reluctant learners, classroom control, groupwork, pairwork setup
- celta: CELTA criteria, teaching practice, lesson planning, CELTA assignments, trainee teachers
- delta: DELTA modules, LSA, PDA, background essays, observed lessons
- linguistics: grammar, syntax, morphology, language systems, tense, aspect
- phonology: pronunciation, phonemes, stress, intonation, sounds
- vocabulary: lexis, collocation, word teaching, lexical chunks
- skills: reading, writing, listening, speaking

Return ONLY the JSON, no other text.`

  try {
    const res = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      max_tokens: 300,
      temperature: 0,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = res.choices[0]?.message?.content || '{}'
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return {
      category: parsed.category || null,
      intent: parsed.intent || 'general',
      target_type: parsed.target_type || 'explanation',
      key_terms: parsed.key_terms || [],
      expanded_query: parsed.expanded_query || query,
    }
  } catch {
    // Fallback to safe defaults if LLM fails
    return {
      category: null,
      intent: 'general',
      target_type: 'explanation',
      key_terms: [],
      expanded_query: query,
    }
  }
}

// ── Aggressive reranker ───────────────────────────────────────────────────────
interface RawChunk {
  id: number
  document_id: number
  content: string
  chapter: string
  section: string
  heading_path: string
  chunk_type: string
  keywords: string[]
  category: string
  title: string
  author: string
  similarity: number
}

const PROCEDURAL_PATTERNS = /\b(step|first(ly)?|second(ly)?|third(ly)?|then|next|after(wards)?|finally|you (should|can|could|might|need to)|make sure|ensure|remember to|it is important to|avoid|don.t)\b/i

function rerank(chunks: RawChunk[], qClass: QueryClass): (RawChunk & { _score: number; _signals: string[] })[] {
  return chunks.map(chunk => {
    const content = chunk.content.toLowerCase()
    const hp = (chunk.heading_path || '').toLowerCase()
    const section = (chunk.section || '').toLowerCase()
    const kws = (chunk.keywords || []).map(k => k.toLowerCase())
    const signals: string[] = []

    let score = chunk.similarity * 10

    // Strong boosts
    if (chunk.chunk_type === qClass.target_type) {
      score += 4.0
      signals.push(`type_match:${chunk.chunk_type}`)
    }

    const headingHits = qClass.key_terms.filter(t => hp.includes(t) || section.includes(t))
    if (headingHits.length >= 2) {
      score += 3.0
      signals.push(`heading_hit:${headingHits.join(',')}`)
    } else if (headingHits.length === 1) {
      score += 1.5
      signals.push(`heading_hit:${headingHits[0]}`)
    }

    if (qClass.category && chunk.category === qClass.category) {
      score += 2.0
      signals.push(`cat:${chunk.category}`)
    }

    // Procedural language boost for how_to
    if (qClass.intent === 'how_to' && PROCEDURAL_PATTERNS.test(chunk.content)) {
      score += 2.0
      signals.push('procedural_language')
    }

    // Keyword overlap
    const kwHits = kws.filter(kw => qClass.key_terms.some(t => t.includes(kw) || kw.includes(t)))
    if (kwHits.length > 0) {
      score += Math.min(kwHits.length * 0.8, 2.0)
      signals.push(`kw:${kwHits.slice(0, 3).join(',')}`)
    }

    // Key terms in content
    const contentHits = qClass.key_terms.filter(t => content.includes(t))
    if (contentHits.length >= 3) {
      score += 1.5
      signals.push(`content_hits:${contentHits.length}`)
    } else if (contentHits.length >= 1) {
      score += contentHits.length * 0.4
    }

    // Penalties
    if (qClass.intent === 'how_to' && chunk.chunk_type === 'definition') {
      score -= 2.0
      signals.push('penalty:definition_for_how_to')
    }
    if (chunk.content.length < 200) {
      score -= 1.5
      signals.push('penalty:short')
    }

    return { ...chunk, _score: score, _signals: signals }
  }).sort((a, b) => b._score - a._score)
}

function dedupeBySource(
  chunks: (RawChunk & { _score: number; _signals: string[] })[],
  maxPerDoc = 2
): (RawChunk & { _score: number; _signals: string[] })[] {
  const countByDoc: Record<number, number> = {}
  return chunks.filter(c => {
    countByDoc[c.document_id] = (countByDoc[c.document_id] || 0) + 1
    if (countByDoc[c.document_id] === 2) c._score -= 0.5
    return countByDoc[c.document_id] <= maxPerDoc
  })
}

// ── Main route ────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()
    if (!query) return NextResponse.json({ error: 'No query provided' }, { status: 400 })

    // 1. LLM classification + embedding run in parallel
    const [qClass, embeddingResponse] = await Promise.all([
      classifyQuery(query),
      openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: query,
      }),
    ])

    const queryEmbedding = embeddingResponse.data[0].embedding

    // 2. Also embed the expanded query for better retrieval on abbreviations
    let searchEmbedding = queryEmbedding
    if (qClass.expanded_query !== query) {
      const expandedEmbedding = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: qClass.expanded_query,
      })
      // Average the two embeddings for better coverage
      searchEmbedding = queryEmbedding.map((v, i) =>
        (v + expandedEmbedding.data[0].embedding[i]) / 2
      )
    }

    // 3. Semantic cache check (use original query embedding for cache)
    const { data: cached } = await supabase.rpc('match_cache', {
      query_embedding: queryEmbedding,
      similarity_threshold: 0.92,
      match_count: 1,
    })

    if (cached && cached.length > 0) {
      supabase.from('query_cache')
        .update({ hit_count: cached[0].hit_count + 1, last_hit_at: new Date().toISOString() })
        .eq('id', cached[0].id).then(() => {})

      return NextResponse.json({
        answer: cached[0].answer,
        sources: cached[0].sources,
        cached: true,
      })
    }

    // 4. Retrieve top 25 with averaged embedding
    let { data: chunks, error } = await supabase.rpc('match_chunks', {
      query_embedding: searchEmbedding,
      match_count: 25,
      filter_category: qClass.category,
      filter_chunk_type: null,
    })

    // 5. Fallback to all categories
    if ((!chunks || chunks.length < 5) && qClass.category !== null) {
      const fallback = await supabase.rpc('match_chunks', {
        query_embedding: searchEmbedding,
        match_count: 25,
        filter_category: null,
        filter_chunk_type: null,
      })
      chunks = fallback.data
      error = fallback.error
    }

    if (error) return NextResponse.json({ error: 'Search failed' }, { status: 500 })

    if (!chunks || chunks.length === 0) {
      return NextResponse.json({
        answer: "I don't have information on that topic yet. Try asking about CELTA teaching practice, DELTA requirements, classroom management, or methodology.",
      })
    }

    // 6. Rerank + dedupe + top 5
    const reranked = rerank(chunks as RawChunk[], qClass)
    const top = dedupeBySource(reranked, 2).slice(0, 5)

    // 7. Build context
    const context = top.map((c, i) => {
      const loc = [c.chapter !== c.section ? c.chapter : null, c.section].filter(Boolean).join(' › ')
      return `[${i + 1}] ${c.title}${loc ? ` — ${loc}` : ''} (${c.chunk_type})\n${c.content}`
    }).join('\n\n---\n\n')

    // 8. Directive synthesis
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      max_tokens: 220,
      messages: [
        {
          role: 'system',
          content: `You are an expert Cambridge CELTA/DELTA teacher trainer giving direct guidance to a practising teacher.

Use ONLY the provided source material. Rules:
- Spoken English only — this will be read aloud
- 80–120 words maximum
- NO bullet points, NO markdown, NO headers
- Give: (1) one clear principle, (2) one concrete classroom action, (3) one way to check or follow up
- Be specific — if the source gives a specific technique, name it
- Do NOT give generic advice unless that is all the source contains
- If the source doesn't clearly answer the question, say so honestly in one sentence
- Speak directly: "you should", "try this", "avoid", "the key is"
- Cite the source naturally: "According to Harmer..." or "Scrivener suggests..."`,
        },
        {
          role: 'user',
          content: `Question: ${query}\nQuery type: ${qClass.intent} — looking for ${qClass.target_type}\nKey concepts: ${qClass.key_terms.join(', ')}\n\nSource material:\n${context}`,
        },
      ],
    })

    const answer = completion.choices[0]?.message?.content || ''
    const sources = [...new Set(top.map(c => c.title))]

    // 9. Save to cache
    supabase.from('query_cache').upsert({
      query_text: query,
      query_embedding: JSON.stringify(queryEmbedding),
      answer, sources,
      category: qClass.category,
      intent: qClass.intent,
    }, { onConflict: 'query_text' }).then(() => {})

    // 10. Rich diagnostics
    return NextResponse.json({
      answer,
      sources,
      cached: false,
      debug: {
        category: qClass.category,
        intent: qClass.intent,
        target_type: qClass.target_type,
        key_terms: qClass.key_terms,
        expanded_query: qClass.expanded_query !== query ? qClass.expanded_query : null,
        chunks_retrieved: chunks.length,
        chunks_used: top.length,
        top_chunks: top.map(c => ({
          title: c.title,
          section: c.section,
          chunk_type: c.chunk_type,
          similarity: Math.round(c.similarity * 1000) / 1000,
          rerank_score: Math.round((c as any)._score * 100) / 100,
          signals: (c as any)._signals,
        })),
      },
    })
  } catch (err: any) {
    console.error('voice-query error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
