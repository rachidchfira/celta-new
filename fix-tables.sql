-- Run this in Supabase SQL Editor to fix table structure

-- 1. Add missing columns to course_modules if needed
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_modules' AND column_name = 'is_active') THEN
    ALTER TABLE course_modules ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- 2. Add enrollment_code column to enrollments if missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'enrollment_code') THEN
    ALTER TABLE enrollments ADD COLUMN enrollment_code TEXT;
    CREATE INDEX IF NOT EXISTS idx_enrollments_code ON enrollments(enrollment_code);
  END IF;
END $$;

-- 3. Add payment_status if missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'payment_status') THEN
    ALTER TABLE enrollments ADD COLUMN payment_status TEXT DEFAULT 'completed';
  END IF;
END $$;

-- 4. Add enrolled_at if missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'enrolled_at') THEN
    ALTER TABLE enrollments ADD COLUMN enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- 5. Create lesson_progress table if missing
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id TEXT,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  watch_time INTEGER DEFAULT 0
);

-- 6. Create index for lesson_progress
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);

-- 7. Verify the structure
SELECT 
  'course_modules' as table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'course_modules'
UNION ALL
SELECT 
  'course_lessons' as table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'course_lessons'
UNION ALL
SELECT 
  'enrollments' as table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'enrollments'
ORDER BY table_name, column_name;
