-- Fix training table schema issues
-- Run this in your Supabase SQL Editor

-- Check current trainings table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'trainings'
ORDER BY ordinal_position;

-- Fix any potential issues with the trainings table
-- Make sure all JSONB columns have proper defaults
ALTER TABLE public.trainings ALTER COLUMN topics SET DEFAULT '[]';
ALTER TABLE public.trainings ALTER COLUMN requirements SET DEFAULT '[]';
ALTER TABLE public.trainings ALTER COLUMN registration_fields SET DEFAULT '["name", "email", "phone"]';
ALTER TABLE public.trainings ALTER COLUMN materials_included SET DEFAULT '[]';

-- Update any existing NULL values to proper defaults
UPDATE public.trainings 
SET topics = '[]' 
WHERE topics IS NULL;

UPDATE public.trainings 
SET requirements = '[]' 
WHERE requirements IS NULL;

UPDATE public.trainings 
SET registration_fields = '["name", "email", "phone"]' 
WHERE registration_fields IS NULL;

UPDATE public.trainings 
SET materials_included = '[]' 
WHERE materials_included IS NULL;

-- Fix any potential data type issues
-- Make sure instructor_bio allows NULL
ALTER TABLE public.trainings ALTER COLUMN instructor_bio DROP NOT NULL;

-- Make sure end_date and end_time allow NULL
ALTER TABLE public.trainings ALTER COLUMN end_date DROP NOT NULL;
ALTER TABLE public.trainings ALTER COLUMN end_time DROP NOT NULL;

-- Add any missing RLS policies
DROP POLICY IF EXISTS "Allow public read access to published trainings" ON public.trainings;
DROP POLICY IF EXISTS "Allow authenticated users full access to trainings" ON public.trainings;

-- Create correct RLS policies
CREATE POLICY "allow_public_read_published_trainings" ON public.trainings
    FOR SELECT 
    TO public
    USING (status = 'published');

CREATE POLICY "allow_authenticated_manage_trainings" ON public.trainings
    FOR ALL 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Test with sample data
INSERT INTO public.trainings (
    title,
    description,
    start_date,
    start_time,
    location,
    level,
    duration,
    instructor,
    topics,
    requirements,
    registration_fields,
    materials_included,
    status
) VALUES (
    'Test Training Session',
    'This is a test training session to verify the schema works correctly.',
    '2024-12-01',
    '10:00:00',
    'Online - Zoom',
    'Beginner',
    '2 hours',
    'Test Instructor',
    '["Digital Marketing", "Social Media"]',
    '["Basic computer skills", "Internet connection"]',
    '["name", "email", "phone", "company"]',
    '["Course materials", "Certificate"]',
    'draft'
) ON CONFLICT DO NOTHING;

-- Show the final structure
SELECT 'FINAL TRAININGS TABLE STRUCTURE:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'trainings'
ORDER BY ordinal_position;

-- Show any existing data
SELECT 'EXISTING TRAININGS:' as info;
SELECT id, title, topics, requirements, registration_fields, materials_included, status
FROM public.trainings 
LIMIT 5; 