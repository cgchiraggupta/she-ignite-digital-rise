-- Fix registration table schema to match code expectations
-- Run this in your Supabase SQL Editor

-- First, let's update the existing registrations table to match the expected schema
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS registration_data JSONB DEFAULT '{}';

-- Migrate existing data to the new structure
UPDATE public.registrations 
SET registration_data = jsonb_build_object(
    'name', name,
    'email', email,
    'phone', phone
) || COALESCE(additional_info, '{}')
WHERE registration_data = '{}';

-- Add created_at column if it doesn't exist (rename registered_at)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'registrations' AND column_name = 'registered_at') THEN
        ALTER TABLE public.registrations RENAME COLUMN registered_at TO created_at;
    END IF;
END $$;

-- Add created_at column if it doesn't exist at all
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Drop old columns that are now in registration_data
ALTER TABLE public.registrations 
DROP COLUMN IF EXISTS name,
DROP COLUMN IF EXISTS email,
DROP COLUMN IF EXISTS phone,
DROP COLUMN IF EXISTS additional_info;

-- Update training registrations table as well
-- First, let's update the existing training_registrations table to match the expected schema
ALTER TABLE public.training_registrations 
ADD COLUMN IF NOT EXISTS registration_data JSONB DEFAULT '{}';

-- Migrate existing data to the new structure for training registrations
UPDATE public.training_registrations 
SET registration_data = jsonb_build_object(
    'name', name,
    'email', email,
    'phone', phone
) || COALESCE(additional_info, '{}')
WHERE registration_data = '{}' AND name IS NOT NULL;

-- Drop old columns that are now in registration_data for training registrations
ALTER TABLE public.training_registrations 
DROP COLUMN IF EXISTS name,
DROP COLUMN IF EXISTS email,
DROP COLUMN IF EXISTS phone,
DROP COLUMN IF EXISTS additional_info;

-- Create updated registrations table structure if needed
CREATE TABLE IF NOT EXISTS public.registrations_new (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    registration_data JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated training_registrations table structure if needed
CREATE TABLE IF NOT EXISTS public.training_registrations_new (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    training_id UUID NOT NULL REFERENCES public.trainings(id) ON DELETE CASCADE,
    registration_data JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_event_new ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_training_registrations_training_new ON public.training_registrations(training_id);
CREATE INDEX IF NOT EXISTS idx_training_registrations_created_at ON public.training_registrations(created_at);

-- Insert sample registration for testing
INSERT INTO public.registrations (
    event_id,
    registration_data,
    status,
    created_at
) 
SELECT 
    e.id,
    '{"name": "Sarah Johnson", "email": "sarah@example.com", "phone": "+1-555-0123", "business_name": "Sarah''s Marketing Agency", "experience_level": "Intermediate"}',
    'confirmed',
    NOW() - INTERVAL '2 days'
FROM public.events e 
WHERE e.title = 'SHELeads Digital Workshop 2024'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert another sample registration
INSERT INTO public.registrations (
    event_id,
    registration_data,
    status,
    created_at
) 
SELECT 
    e.id,
    '{"name": "Maria Rodriguez", "email": "maria@example.com", "phone": "+1-555-0456", "business_name": "Rodriguez Consulting", "experience_level": "Beginner"}',
    'pending',
    NOW() - INTERVAL '1 day'
FROM public.events e 
WHERE e.title = 'SHELeads Digital Workshop 2024'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Verify the schema
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'registrations' 
ORDER BY ordinal_position; 