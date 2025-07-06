-- SQL script to create events and registrations tables
-- Run this in your Supabase SQL Editor

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    registration_enabled BOOLEAN DEFAULT true,
    max_attendees INTEGER DEFAULT 100,
    price DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'ended')),
    registration_fields JSONB DEFAULT '["name", "email", "phone"]',
    thank_you_message TEXT DEFAULT 'Thank you for registering! We''ll send you more details soon.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    additional_info JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for events table
-- Allow public to read published events
CREATE POLICY "Allow public read published events" ON public.events
    FOR SELECT USING (status = 'published');

-- Allow authenticated users (admin) to do everything
CREATE POLICY "Allow admin full access to events" ON public.events
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for registrations table
-- Allow public to insert registrations
CREATE POLICY "Allow public insert registrations" ON public.registrations
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admin) to read all registrations
CREATE POLICY "Allow admin read registrations" ON public.registrations
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users (admin) to update registration status
CREATE POLICY "Allow admin update registrations" ON public.registrations
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users (admin) to delete registrations
CREATE POLICY "Allow admin delete registrations" ON public.registrations
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for events table
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample event (optional)
INSERT INTO public.events (
    title,
    description,
    event_date,
    event_time,
    location,
    image_url,
    registration_enabled,
    max_attendees,
    price,
    status,
    registration_fields,
    thank_you_message
) VALUES (
    'SHELeads Digital Workshop 2024',
    'Join us for an empowering workshop on digital marketing strategies for women entrepreneurs. Learn the latest tools and techniques to grow your business online.',
    '2024-08-15',
    '10:00:00',
    'Online - Zoom',
    'https://images.unsplash.com/photo-1559223607-b4d0555ae8f6?w=800',
    true,
    50,
    29.99,
    'published',
    '["name", "email", "phone", "business_name", "experience_level"]',
    'Thank you for registering for the SHELeads Digital Workshop! You will receive the Zoom link and workshop materials via email 24 hours before the event.'
) ON CONFLICT DO NOTHING;

-- Verify tables were created
SELECT 'Events table created successfully' as message
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events');

SELECT 'Registrations table created successfully' as message
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'registrations'); 