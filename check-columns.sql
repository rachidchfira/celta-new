-- Run this in Supabase SQL Editor to check column names
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'course_lessons';

-- Also check the actual data
SELECT id, title, youtube_id FROM course_lessons LIMIT 5;
