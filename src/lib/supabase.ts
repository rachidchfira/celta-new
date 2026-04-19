import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseServiceKey

// Client for frontend (limited permissions)
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Admin client for backend (full permissions)
export const supabaseAdmin = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Helper types
export interface Enrollment {
  id: string
  email: string
  name: string | null
  phone: string | null
  payment_status: 'pending' | 'completed'
  paid_amount: number
  enrolled_at: string
  last_accessed_at: string | null
}

export interface LessonProgress {
  id: string
  enrollment_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
  watch_time: number
}

export interface CourseModule {
  id: string
  title: string
  description: string | null
  order: number
  is_active: boolean
}

export interface CourseLesson {
  id: string
  module_id: string
  title: string
  description: string | null
  youtube_id: string
  duration: number
  order: number
  is_active: boolean
  has_quiz: boolean
}
