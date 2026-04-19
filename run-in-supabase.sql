-- ============================================
-- CELTA PREP COURSE - Fixed SQL for Supabase
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. COURSE MODULES (using TEXT id instead of UUID)
CREATE TABLE IF NOT EXISTS course_modules (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. COURSE LESSONS
CREATE TABLE IF NOT EXISTS course_lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  youtube_id TEXT NOT NULL DEFAULT 'dQw4w9WgXcQ',
  duration INTEGER DEFAULT 0,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  has_quiz BOOLEAN DEFAULT false
);

-- 3. ENROLLMENTS
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  enrollment_code TEXT UNIQUE NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  paid_amount INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE
);

-- 4. LESSON PROGRESS
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES course_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  watch_time INTEGER DEFAULT 0,
  CONSTRAINT unique_enrollment_lesson UNIQUE (enrollment_id, lesson_id)
);

-- 5. ENABLE ROW LEVEL SECURITY
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- 6. CREATE POLICIES (allow all for simplicity)
CREATE POLICY "Modules public" ON course_modules FOR ALL USING (true);
CREATE POLICY "Lessons public" ON course_lessons FOR ALL USING (true);
CREATE POLICY "Enrollments all" ON enrollments FOR ALL USING (true);
CREATE POLICY "Progress all" ON lesson_progress FOR ALL USING (true);

-- 7. INSERT COURSE MODULES
INSERT INTO course_modules (id, title, description, "order") VALUES
  ('module-1', 'Module 1: CELTA Foundations', 'Understanding the CELTA course structure', 1),
  ('module-2', 'Module 2: Lesson Planning', 'Creating effective lesson plans', 2),
  ('module-3', 'Module 3: Teaching Skills', 'Core teaching techniques', 3),
  ('module-4', 'Module 4: Language Analysis', 'Grammar and vocabulary', 4),
  ('module-5', 'Module 5: Teaching Practice', 'Excelling in teaching practice', 5),
  ('module-6', 'Module 6: Written Assignments', 'Completing written work', 6)
ON CONFLICT (id) DO NOTHING;

-- 8. INSERT LESSONS
INSERT INTO course_lessons (id, module_id, title, description, duration, "order") VALUES
  ('lesson-1-1', 'module-1', 'What is CELTA?', 'Introduction to CELTA certification', 15, 1),
  ('lesson-1-2', 'module-1', 'Course Structure', 'Understanding input sessions and TP', 20, 2),
  ('lesson-1-3', 'module-1', 'Assessment Criteria', 'How you will be evaluated', 25, 3),
  ('lesson-2-1', 'module-2', 'Lesson Plan Anatomy', 'Essential lesson plan components', 30, 1),
  ('lesson-2-2', 'module-2', 'Writing ILOs', 'Learning Outcomes that work', 25, 2),
  ('lesson-2-3', 'module-2', 'Problems & Solutions', 'Proactive planning', 20, 3),
  ('lesson-3-1', 'module-3', 'Concept Checking Questions', 'The art of CCQs', 35, 1),
  ('lesson-3-2', 'module-3', 'Instructions & ICQs', 'Clear instructions', 25, 2),
  ('lesson-3-3', 'module-3', 'Monitoring & Feedback', 'Classroom management', 30, 3),
  ('lesson-4-1', 'module-4', 'Grammar for Teachers', 'Essential grammar knowledge', 40, 1),
  ('lesson-4-2', 'module-4', 'Vocabulary Teaching', 'MPF framework', 30, 2),
  ('lesson-5-1', 'module-5', 'Preparing for TP', 'Teaching practice prep', 35, 1),
  ('lesson-5-2', 'module-5', 'Handling Feedback', 'Professional feedback', 20, 2),
  ('lesson-5-3', 'module-5', 'Common TP Mistakes', 'What to avoid', 25, 3),
  ('lesson-6-1', 'module-6', 'Assignment Types', 'Four written assignments', 30, 1),
  ('lesson-6-2', 'module-6', 'Focus on the Learner', 'Learner assignment', 25, 2),
  ('lesson-6-3', 'module-6', 'Language Related Tasks', 'Language analysis', 30, 3)
ON CONFLICT (id) DO NOTHING;

SELECT '✅ Done! Tables created with ' || (SELECT COUNT(*) FROM course_modules) || ' modules and ' || (SELECT COUNT(*) FROM course_lessons) || ' lessons.' as result;
