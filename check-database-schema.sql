-- Check current database schema
-- Run this in your Supabase SQL Editor to see what tables and columns exist

-- Check what tables exist
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Check registrations table structure if it exists
SELECT 'REGISTRATIONS TABLE STRUCTURE:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'registrations'
ORDER BY ordinal_position;

-- Check training_registrations table structure if it exists
SELECT 'TRAINING_REGISTRATIONS TABLE STRUCTURE:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'training_registrations'
ORDER BY ordinal_position;

-- Check events table structure
SELECT 'EVENTS TABLE STRUCTURE:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'events'
ORDER BY ordinal_position;

-- Check posts table structure
SELECT 'POSTS TABLE STRUCTURE:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'posts'
ORDER BY ordinal_position;

-- Check trainings table structure
SELECT 'TRAININGS TABLE STRUCTURE:' as info;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'trainings'
ORDER BY ordinal_position;

-- Count records in each table
SELECT 'RECORD COUNTS:' as info;
SELECT 
  (SELECT COUNT(*) FROM public.events) as events_count,
  (SELECT COUNT(*) FROM public.posts) as posts_count,
  (SELECT COUNT(*) FROM public.trainings) as trainings_count,
  (SELECT COUNT(*) FROM public.registrations) as registrations_count,
  (SELECT COUNT(*) FROM public.training_registrations) as training_registrations_count; 