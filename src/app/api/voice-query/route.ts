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

function classifyQuery(query: string): string | null {
  const q = query.toLowerCase()
  if (q.match(/celta|teaching practice|tp|lesson plan|ccq|icq/)) return 'celta'
  if (q.match(/delta|diploma|lsa|observed lesson/)) return 'delta'
  if (q.match(/classroom management|discipline|behaviour|instruction/)) return 'classroom_mgmt'
  if (q.match(/phonolog|pronunciation|stress|intonation/)) return 'phonology'
  if (q.match(/grammar|tense|syntax|morpholog/)) return 'linguistics'
  if (q.match(/methodology|approach|ppp|tbl|esa/)) return 'methodology'
  if (q.match(/vocabulary|lexis|collocation/)) return 'vocabulary'
  if (q.match(/reading|writing|listening|speaking|skill/)) return 'skills'
  return null
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()
    if (!query) return NextResponse.json({ error: 'No query provided' }, { status: 400 })

    const embeddingResponse = await openai.embeddings.create({
      model: 'openai/text-embedding-3-small',
      input: query,
    })
    const queryEmbedding = embeddingResponse.data[0].embedding
    const category = classifyQuery(query)

    const { data: chunks, error } = await supabase.rpc('match_chunks', {
      query_embedding: queryEmbedding,
      match_count: 4,
      filter_category: category,
    })

    if (error) {
      console.error('Supabase search error:', error)
      return NextResponse.json({ error: 'Search failed' }, { status: 500 })
    }

    if (!chunks || chunks.length === 0) {
      return NextResponse.json({
        answer: "I don't have specific information on that. Try asking about CELTA, DELTA, or classroom management.",
      })
    }

    const answer = chunks
      .slice(0, 3)
      .map((c: any) => `From ${c.title}${c.chapter ? ` (${c.chapter})` : ''}: ${c.content}`)
      .join('\n\n')

    return NextResponse.json({ answer, sources: chunks.map((c: any) => c.title) })
  } catch (err: any) {
    console.error('voice-query error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
