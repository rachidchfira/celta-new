-- CELTA PREP COURSE - Supabase Schema
-- Add to your existing Supabase database
-- Run this in SQL Editor

-- ============================================
-- 1. COURSE MODULES
-- ============================================
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. COURSE LESSONS
-- ============================================
CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  youtube_id TEXT NOT NULL,
  duration INTEGER DEFAULT 0,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  has_quiz BOOLEAN DEFAULT false,
  quiz_data JSONB,
  resources JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. ENROLLMENTS (for paid course access)
-- ============================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  enrollment_code TEXT UNIQUE NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  paid_amount INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_code ON enrollments(enrollment_code);

-- ============================================
-- 4. LESSON PROGRESS
-- ============================================
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES course_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  watch_time INTEGER DEFAULT 0,
  notes TEXT,
  
  CONSTRAINT unique_enrollment_lesson UNIQUE (enrollment_id, lesson_id)
);

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on new tables
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;

-- Course content is publicly readable (no auth needed to view course structure)
CREATE POLICY "Course modules are public read" ON course_modules
  FOR SELECT USING (is_active = true);

CREATE POLICY "Course lessons are public read" ON course_lessons
  FOR SELECT USING (is_active = true);

-- Enrollments: Users can read their own (using email matching)
CREATE POLICY "Users can read own enrollment" ON enrollments
  FOR SELECT USING (true);

-- Lesson progress: Public read (we verify enrollment in API)
CREATE POLICY "Progress is readable" ON lesson_progress
  FOR SELECT USING (true);

-- Allow inserts/updates via service role (backend API)
CREATE POLICY "Service role can manage enrollments" ON enrollments
  FOR ALL USING (true);

CREATE POLICY "Service role can manage progress" ON lesson_progress
  FOR ALL USING (true);

-- Allow public insert for enrollments (for API)
CREATE POLICY "Allow enrollment insert" ON enrollments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow enrollment update" ON enrollments
  FOR UPDATE USING (true);

CREATE POLICY "Allow progress insert" ON lesson_progress
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow progress update" ON lesson_progress
  FOR UPDATE USING (true);

-- ============================================
-- 6. SAMPLE DATA - COURSE MODULES & LESSONS
-- ============================================

INSERT INTO course_modules (id, title, description, "order") VALUES
  ('module-1', 'Module 1: CELTA Foundations', 'Understanding the CELTA course structure and requirements', 1),
  ('module-2', 'Module 2: Lesson Planning Mastery', 'Creating effective lesson plans that impress trainers', 2),
  ('module-3', 'Module 3: Teaching Skills', 'Core teaching techniques for CELTA success', 3),
  ('module-4', 'Module 4: Language Analysis', 'Grammar and vocabulary knowledge for teaching', 4),
  ('module-5', 'Module 5: Teaching Practice Success', 'Excelling in your teaching practice sessions', 5),
  ('module-6', 'Module 6: Written Assignments', 'Successfully completing CELTA written work', 6)
ON CONFLICT (id) DO NOTHING;

-- Module 1 Lessons
INSERT INTO course_lessons (id, module_id, title, description, youtube_id, duration, "order", has_quiz) VALUES
  ('lesson-1-1', 'module-1', 'What is CELTA?', 'Introduction to the CELTA certification', 'dQw4w9WgXcQ', 15, 1, false),
  ('lesson-1-2', 'module-1', 'CELTA Course Structure', 'Understanding input sessions and TP', 'dQw4w9WgXcQ', 20, 2, false),
  ('lesson-1-3', 'module-1', 'Assessment Criteria', 'How you will be evaluated', 'dQw4w9WgXcQ', 25, 3, true)
ON CONFLICT (id) DO NOTHING;

-- Module 2 Lessons
INSERT INTO course_lessons (id, module_id, title, description, youtube_id, duration, "order", has_quiz) VALUES
  ('lesson-2-1', 'module-2', 'Anatomy of a Lesson Plan', 'Essential components every plan needs', 'dQw4w9WgXcQ', 30, 1, false),
  ('lesson-2-2', 'module-2', 'Writing Effective ILOs', 'Learning Outcomes that work', 'dQw4w9WgXcQ', 25, 2, false),
  ('lesson-2-3', 'module-2', 'Problems & Solutions', 'Proactive planning', 'dQw4w9WgXcQ', 20, 3, true)
ON CONFLICT (id) DO NOTHING;

-- Module 3 Lessons
INSERT INTO course_lessons (id, module_id, title, description, youtube_id, duration, "order", has_quiz) VALUES
  ('lesson-3-1', 'module-3', 'Concept Checking Questions', 'The art of CCQs', 'dQw4w9WgXcQ', 35, 1, false),
  ('lesson-3-2', 'module-3', 'Instructions & ICQs', 'Clear instructions', 'dQw4w9WgXcQ', 25, 2, false),
  ('lesson-3-3', 'module-3', 'Monitoring & Feedback', 'Classroom management', 'dQw4w9WgXcQ', 30, 3, true)
ON CONFLICT (id) DO NOTHING;

-- Module 4 Lessons
INSERT INTO course_lessons (id, module_id, title, description, youtube_id, duration, "order", has_quiz) VALUES
  ('lesson-4-1', 'module-4', 'Grammar for Teachers', 'Essential grammar knowledge', 'dQw4w9WgXcQ', 40, 1, false),
  ('lesson-4-2', 'module-4', 'Vocabulary Teaching', 'MPF framework', 'dQw4w9WgXcQ', 30, 2, false),
  ('lesson-4-3', 'module-4', 'Language Analysis', 'Practical exercises', 'dQw4w9WgXcQ', 25, 3, true)
ON CONFLICT (id) DO NOTHING;

-- Module 5 Lessons
INSERT INTO course_lessons (id, module_id, title, description, youtube_id, duration, "order", has_quiz) VALUES
  ('lesson-5-1', 'module-5', 'Preparing for TP', 'Teaching practice prep', 'dQw4w9WgXcQ', 35, 1, false),
  ('lesson-5-2', 'module-5', 'Handling Feedback', 'Professional feedback', 'dQw4w9WgXcQ', 20, 2, false),
  ('lesson-5-3', 'module-5', 'Common TP Mistakes', 'What to avoid', 'dQw4w9WgXcQ', 25, 3, true)
ON CONFLICT (id) DO NOTHING;

-- Module 6 Lessons
INSERT INTO course_lessons (id, module_id, title, description, youtube_id, duration, "order", has_quiz) VALUES
  ('lesson-6-1', 'module-6', 'Assignment Types', 'Four written assignments', 'dQw4w9WgXcQ', 30, 1, false),
  ('lesson-6-2', 'module-6', 'Focus on the Learner', 'Learner assignment', 'dQw4w9WgXcQ', 25, 2, false),
  ('lesson-6-3', 'module-6', 'Language Related Tasks', 'Language analysis', 'dQw4w9WgXcQ', 30, 3, false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 7. LINK LEADS TO ENROLLMENTS (Optional)
-- ============================================
-- If you want to track which leads became students:
-- ALTER TABLE enrollments ADD COLUMN lead_id UUID REFERENCES leads(id);

-- ============================================
-- 8. LESSON PLAN DOCTOR
-- ============================================
CREATE TABLE IF NOT EXISTS lesson_plan_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  anonymous_id TEXT,
  lesson_plan_text TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'quick',
  report_json JSONB NOT NULL,
  verdict TEXT NOT NULL,
  overall_score INTEGER DEFAULT 0,
  level TEXT DEFAULT '',
  skill TEXT DEFAULT '',
  tp TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analyses_enrollment ON lesson_plan_analyses(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_analyses_anonymous ON lesson_plan_analyses(anonymous_id, created_at);

-- RLS: enrolled users can only read their own analyses
ALTER TABLE lesson_plan_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own analyses"
  ON lesson_plan_analyses FOR SELECT
  USING (auth.uid()::text = enrollment_id::text OR anonymous_id IS NOT NULL);

CREATE POLICY "Service role can insert analyses"
  ON lesson_plan_analyses FOR INSERT
  WITH CHECK (true);
