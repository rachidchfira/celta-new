-- Update YouTube Video IDs in Supabase
-- Run this in SQL Editor

-- Video IDs extracted from your playlist:
-- 1. elQSAx2LbMQ (index 1-2)
-- 2. 13tz3E9dThg (index 3-4)
-- 3. lwt8VIH7_5E (index 5-6)
-- 4. _govkbNLKOI (index 7-8)
-- 5. qZwvc5BlDRo (index 9)
-- 6. M6etT6bg5XE (index 10-11)
-- 7. 8bWD0J8C-TU (index 12)
-- 8. usqsM5IIoqo (index 13-14)
-- 9. KSyL7V3ODT4 (index 15)
-- 10. GIsIJ58k4Bs (index 16)

-- Module 1: CELTA Foundations
UPDATE course_lessons SET youtube_id = 'elQSAx2LbMQ' WHERE id = 'lesson-1-1';
UPDATE course_lessons SET youtube_id = 'elQSAx2LbMQ' WHERE id = 'lesson-1-2';
UPDATE course_lessons SET youtube_id = '13tz3E9dThg' WHERE id = 'lesson-1-3';

-- Module 2: Lesson Planning
UPDATE course_lessons SET youtube_id = '13tz3E9dThg' WHERE id = 'lesson-2-1';
UPDATE course_lessons SET youtube_id = 'lwt8VIH7_5E' WHERE id = 'lesson-2-2';
UPDATE course_lessons SET youtube_id = 'lwt8VIH7_5E' WHERE id = 'lesson-2-3';

-- Module 3: Teaching Skills
UPDATE course_lessons SET youtube_id = '_govkbNLKOI' WHERE id = 'lesson-3-1';
UPDATE course_lessons SET youtube_id = '_govkbNLKOI' WHERE id = 'lesson-3-2';
UPDATE course_lessons SET youtube_id = 'qZwvc5BlDRo' WHERE id = 'lesson-3-3';

-- Module 4: Language Analysis
UPDATE course_lessons SET youtube_id = 'M6etT6bg5XE' WHERE id = 'lesson-4-1';
UPDATE course_lessons SET youtube_id = 'M6etT6bg5XE' WHERE id = 'lesson-4-2';

-- Module 5: Teaching Practice
UPDATE course_lessons SET youtube_id = '8bWD0J8C-TU' WHERE id = 'lesson-5-1';
UPDATE course_lessons SET youtube_id = 'usqsM5IIoqo' WHERE id = 'lesson-5-2';
UPDATE course_lessons SET youtube_id = 'usqsM5IIoqo' WHERE id = 'lesson-5-3';

-- Module 6: Written Assignments
UPDATE course_lessons SET youtube_id = 'KSyL7V3ODT4' WHERE id = 'lesson-6-1';
UPDATE course_lessons SET youtube_id = 'GIsIJ58k4Bs' WHERE id = 'lesson-6-2';
UPDATE course_lessons SET youtube_id = 'GIsIJ58k4Bs' WHERE id = 'lesson-6-3';

-- Verify
SELECT id, title, youtube_id FROM course_lessons ORDER BY id;
