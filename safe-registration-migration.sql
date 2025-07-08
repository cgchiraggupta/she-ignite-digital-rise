-- Safe migration script for registration tables
-- Run this in your Supabase SQL Editor

-- Function to check if column exists (fixed naming conflict)
CREATE OR REPLACE FUNCTION column_exists(tbl_name text, col_name text)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = tbl_name 
        AND column_name = col_name
    );
END;
$$ LANGUAGE plpgsql;

-- Check current registrations table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'registrations'
ORDER BY ordinal_position;

-- Add registration_data column if it doesn't exist
DO $$
BEGIN
    IF NOT column_exists('registrations', 'registration_data') THEN
        ALTER TABLE public.registrations ADD COLUMN registration_data JSONB DEFAULT '{}';
    END IF;
END $$;

-- Add created_at column if it doesn't exist, or rename registered_at
DO $$
BEGIN
    IF column_exists('registrations', 'registered_at') AND NOT column_exists('registrations', 'created_at') THEN
        -- Rename registered_at to created_at
        ALTER TABLE public.registrations RENAME COLUMN registered_at TO created_at;
    ELSIF NOT column_exists('registrations', 'created_at') THEN
        -- Add created_at if it doesn't exist
        ALTER TABLE public.registrations ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Migrate existing data to registration_data if old columns exist
DO $$
BEGIN
    -- Only migrate if we have the old columns and registration_data is empty
    IF column_exists('registrations', 'name') AND column_exists('registrations', 'email') THEN
        UPDATE public.registrations 
        SET registration_data = jsonb_build_object(
            'name', COALESCE(name, ''),
            'email', COALESCE(email, ''),
            'phone', COALESCE(phone, '')
        ) || COALESCE(
            CASE 
                WHEN column_exists('registrations', 'additional_info') THEN additional_info::jsonb
                ELSE '{}'::jsonb
            END, 
            '{}'::jsonb
        )
        WHERE registration_data = '{}' OR registration_data IS NULL;
    END IF;
END $$;

-- Clean up old columns if they exist and data has been migrated
DO $$
BEGIN
    IF column_exists('registrations', 'name') THEN
        -- Check if data has been migrated (registration_data is not empty)
        IF (SELECT COUNT(*) FROM public.registrations WHERE registration_data != '{}' AND registration_data IS NOT NULL) > 0 THEN
            ALTER TABLE public.registrations DROP COLUMN IF EXISTS name;
            ALTER TABLE public.registrations DROP COLUMN IF EXISTS email;
            ALTER TABLE public.registrations DROP COLUMN IF EXISTS phone;
            ALTER TABLE public.registrations DROP COLUMN IF EXISTS additional_info;
        END IF;
    END IF;
END $$;

-- Do the same for training_registrations table
-- Add registration_data column if it doesn't exist
DO $$
BEGIN
    IF NOT column_exists('training_registrations', 'registration_data') THEN
        ALTER TABLE public.training_registrations ADD COLUMN registration_data JSONB DEFAULT '{}';
    END IF;
END $$;

-- Migrate training registration data if old columns exist
DO $$
BEGIN
    IF column_exists('training_registrations', 'name') AND column_exists('training_registrations', 'email') THEN
        UPDATE public.training_registrations 
        SET registration_data = jsonb_build_object(
            'name', COALESCE(name, ''),
            'email', COALESCE(email, ''),
            'phone', COALESCE(phone, '')
        ) || COALESCE(
            CASE 
                WHEN column_exists('training_registrations', 'additional_info') THEN additional_info::jsonb
                ELSE '{}'::jsonb
            END, 
            '{}'::jsonb
        )
        WHERE registration_data = '{}' OR registration_data IS NULL;
    END IF;
END $$;

-- Clean up old training registration columns
DO $$
BEGIN
    IF column_exists('training_registrations', 'name') THEN
        IF (SELECT COUNT(*) FROM public.training_registrations WHERE registration_data != '{}' AND registration_data IS NOT NULL) > 0 THEN
            ALTER TABLE public.training_registrations DROP COLUMN IF EXISTS name;
            ALTER TABLE public.training_registrations DROP COLUMN IF EXISTS email;
            ALTER TABLE public.training_registrations DROP COLUMN IF EXISTS phone;
            ALTER TABLE public.training_registrations DROP COLUMN IF EXISTS additional_info;
        END IF;
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_training_registrations_training_id ON public.training_registrations(training_id);
CREATE INDEX IF NOT EXISTS idx_training_registrations_created_at ON public.training_registrations(created_at);

-- Insert sample registrations only if we have events
INSERT INTO public.registrations (
    event_id,
    registration_data,
    status,
    created_at
) 
SELECT 
    e.id,
    '{"name": "Sarah Johnson", "email": "sarah@example.com", "phone": "+1-555-0123", "business_name": "Sarah Marketing Agency", "experience_level": "Intermediate"}',
    'confirmed',
    NOW() - INTERVAL '2 days'
FROM public.events e 
WHERE e.title LIKE '%SHELeads%' OR e.title LIKE '%Digital%'
LIMIT 1
ON CONFLICT DO NOTHING;

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
WHERE e.title LIKE '%SHELeads%' OR e.title LIKE '%Digital%'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Drop the helper function
DROP FUNCTION IF EXISTS column_exists(text, text);

-- Show final table structures
SELECT 'registrations table structure:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'registrations'
ORDER BY ordinal_position;

SELECT 'training_registrations table structure:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'training_registrations'
ORDER BY ordinal_position;

-- Show sample data
SELECT 'Sample registrations:' as info;
SELECT id, event_id, registration_data, status, created_at 
FROM public.registrations 
LIMIT 3; 