import { config } from 'dotenv'
config()

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Not found')
console.log('Service Key:', supabaseServiceKey ? 'Found' : 'Not found')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials!')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function main() {
  console.log('🌱 Seeding Supabase with new course structure...')

  // First, delete existing lessons and modules
  console.log('Cleaning up existing data...')
  
  // Delete lessons first (due to foreign key constraints)
  const { error: deleteLessonsError } = await supabaseAdmin
    .from('course_lessons')
    .delete()
    .neq('id', 'impossible-id') // Delete all
  
  if (deleteLessonsError) {
    console.log('Note: Could not delete lessons:', deleteLessonsError.message)
  } else {
    console.log('✅ Deleted existing lessons')
  }
  
  // Delete modules
  const { error: deleteModulesError } = await supabaseAdmin
    .from('course_modules')
    .delete()
    .neq('id', 'impossible-id') // Delete all
  
  if (deleteModulesError) {
    console.log('Note: Could not delete modules:', deleteModulesError.message)
  } else {
    console.log('✅ Deleted existing modules')
  }

  // Create course modules - Intro + 8 Modules
  console.log('Creating modules...')
  
  const modules = [
    {
      id: 'module-intro',
      title: 'Cambridge CELTA Guide: The 5 Key Units & Essential Skills You Need to Master Teaching',
      description: 'Comprehensive guide to the Cambridge Intensive CELTA Course covering all 5 key units.',
      order: 0,
      is_active: true
    },
    {
      id: 'module-1',
      title: 'Introduction to my complete CELTA UNLOCKED Preparation Course',
      description: 'Complete overview of the CELTA UNLOCKED preparation program.',
      order: 1,
      is_active: true
    },
    {
      id: 'module-2',
      title: 'CELTA UNLOCKED – Lesson Architecture',
      description: 'How to Build a CELTA-Standard Lesson Every Time.',
      order: 2,
      is_active: true
    },
    {
      id: 'module-3',
      title: 'How to Teach Grammar & Vocabulary the CELTA Way',
      description: 'Master the FMUP framework and effective CCQs.',
      order: 3,
      is_active: true
    },
    {
      id: 'module-4',
      title: 'CELTA Skills Lessons - Reading & Listening',
      description: 'Master receptive skills lessons.',
      order: 4,
      is_active: true
    },
    {
      id: 'module-5',
      title: 'How to Teach Speaking & Writing (Productive Skills)',
      description: 'Master productive skills lessons.',
      order: 5,
      is_active: true
    },
    {
      id: 'module-6',
      title: 'TP Survival & Feedback Mastery',
      description: 'Frameworks for Teaching Practice success.',
      order: 6,
      is_active: true
    },
    {
      id: 'module-7',
      title: 'Assignments Masterclass: How to Pass All 4',
      description: 'Complete guide to all 4 CELTA written assignments.',
      order: 7,
      is_active: true
    },
    {
      id: 'module-8',
      title: 'CELTA Survival Guide: How to Stay Sane & Get a Pass A',
      description: 'Essential tips for surviving CELTA.',
      order: 8,
      is_active: true
    }
  ]

  const { data: insertedModules, error: modulesError } = await supabaseAdmin
    .from('course_modules')
    .insert(modules)
    .select()

  if (modulesError) {
    console.error('Error creating modules:', modulesError)
    process.exit(1)
  }

  console.log(`✅ Created ${insertedModules?.length || 0} modules`)

  // Create lessons
  console.log('Creating lessons...')
  
  const lessons = [
    // Intro
    {
      id: 'lesson-intro',
      module_id: 'module-intro',
      title: 'Cambridge CELTA Guide: The 5 Key Units & Essential Skills',
      description: 'The 5 Key Units & Essential Skills You Need to Master Teaching.',
      youtube_id: 'KSyL7V3ODT4',
      duration: 26,
      order: 1,
      is_active: true,
      has_quiz: false
    },
    // Module 1
    {
      id: 'lesson-1-1',
      module_id: 'module-1',
      title: 'Introduction to CELTA UNLOCKED Preparation Course',
      description: 'Introduction to the complete CELTA UNLOCKED Preparation Course.',
      youtube_id: 'usqsM5IIoqo',
      duration: 34,
      order: 1,
      is_active: true,
      has_quiz: false
    },
    // Module 2
    {
      id: 'lesson-2-1',
      module_id: 'module-2',
      title: 'CELTA UNLOCKED – Lesson Architecture',
      description: 'Learn to deliver safe, predictable, pass-grade lessons.',
      youtube_id: '8bWD0J8C-TU',
      duration: 50,
      order: 1,
      is_active: true,
      has_quiz: false
    },
    // Module 3
    {
      id: 'lesson-3-1',
      module_id: 'module-3',
      title: 'How to Teach Grammar & Vocabulary the CELTA Way',
      description: 'Learn exactly how Cambridge expects grammar and vocabulary to be taught.',
      youtube_id: 'M6etT6bg5XE',
      duration: 60,
      order: 1,
      is_active: true,
      has_quiz: false
    },
    // Module 4
    {
      id: 'lesson-4-1',
      module_id: 'module-4',
      title: 'CELTA Skills Lessons - Reading & Listening',
      description: 'Learn the exact receptive-skills structure tutors expect.',
      youtube_id: 'qZwvc5BlDRo',
      duration: 40,
      order: 1,
      is_active: true,
      has_quiz: false
    },
    // Module 5
    {
      id: 'lesson-5-1',
      module_id: 'module-5',
      title: 'How to Teach Speaking & Writing (Productive Skills)',
      description: 'Learn the CELTA structure for productive skills lessons.',
      youtube_id: '_govkbNLKOI',
      duration: 42,
      order: 1,
      is_active: true,
      has_quiz: false
    },
    // Module 6
    {
      id: 'lesson-6-1',
      module_id: 'module-6',
      title: 'TP Survival & Feedback Mastery',
      description: 'Master teaching practice with proven frameworks.',
      youtube_id: 'lwt8VIH7_5E',
      duration: 41,
      order: 1,
      is_active: true,
      has_quiz: false
    },
    // Module 7
    {
      id: 'lesson-7-1',
      module_id: 'module-7',
      title: 'Assignments Masterclass: How to Pass All 4',
      description: 'Learn what tutors look for and how to structure your work.',
      youtube_id: '13tz3E9dThg',
      duration: 38,
      order: 1,
      is_active: true,
      has_quiz: false
    },
    // Module 8
    {
      id: 'lesson-8-1',
      module_id: 'module-8',
      title: 'CELTA Survival Guide: How to Stay Sane & Get a Pass A',
      description: 'Strategies for time management, self-care, and achieving the best possible grade.',
      youtube_id: 'elQSAx2LbMQ',
      duration: 29,
      order: 1,
      is_active: true,
      has_quiz: false
    }
  ]

  const { data: insertedLessons, error: lessonsError } = await supabaseAdmin
    .from('course_lessons')
    .insert(lessons)
    .select()

  if (lessonsError) {
    console.error('Error creating lessons:', lessonsError)
    process.exit(1)
  }

  console.log(`✅ Created ${insertedLessons?.length || 0} lessons`)

  console.log('\n=== COURSE STRUCTURE ===')
  console.log('Total Modules: 9 (Intro + 8 Modules)')
  console.log('Total Lessons: 9')
  console.log('\n✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
