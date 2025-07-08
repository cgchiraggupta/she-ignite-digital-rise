-- Check and fix RLS policies for registrations table
-- Run this in your Supabase SQL Editor

-- 1. Check if RLS is enabled on tables
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('registrations', 'events')
  AND schemaname = 'public';

-- 2. Check existing RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename IN ('registrations', 'events')
  AND schemaname = 'public'
ORDER BY tablename, policyname;

-- 3. Check if the registrations table exists and its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'registrations'
ORDER BY ordinal_position;

-- 4. Drop existing conflicting policies if they exist
DROP POLICY IF EXISTS "Allow public insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Public can register for events" ON public.registrations;
DROP POLICY IF EXISTS "Allow public to insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Enable insert for public" ON public.registrations;

-- 5. Create the correct RLS policy for public registration
CREATE POLICY "allow_public_registration_insert" ON public.registrations
    FOR INSERT 
    TO public
    WITH CHECK (true);

-- 6. Also ensure authenticated users can read registrations (for admin)
DROP POLICY IF EXISTS "Allow admin read registrations" ON public.registrations;
DROP POLICY IF EXISTS "Authenticated users can manage registrations" ON public.registrations;

CREATE POLICY "allow_authenticated_read_registrations" ON public.registrations
    FOR SELECT 
    TO authenticated
    USING (true);

CREATE POLICY "allow_authenticated_update_registrations" ON public.registrations
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "allow_authenticated_delete_registrations" ON public.registrations
    FOR DELETE 
    TO authenticated
    USING (true);

-- 7. Check events table policies too
DROP POLICY IF EXISTS "Allow public read published events" ON public.events;
DROP POLICY IF EXISTS "Public can read published events" ON public.events;

CREATE POLICY "allow_public_read_published_events" ON public.events
    FOR SELECT 
    TO public
    USING (status = 'published');

CREATE POLICY "allow_authenticated_manage_events" ON public.events
    FOR ALL 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 8. Verify the new policies
SELECT 'NEW POLICIES:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename IN ('registrations', 'events')
  AND schemaname = 'public'
ORDER BY tablename, policyname;

-- 9. Test insert permissions (this should work)
SELECT 'Testing if anonymous role can insert...' as test_info;
-- This will show what the current user role is
SELECT current_user, session_user, current_setting('role') as current_role; 