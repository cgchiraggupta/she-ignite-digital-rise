-- Simple SQL script to create events and registrations tables
-- Copy and paste this into your Supabase SQL Editor

-- Create events table
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    registration_enabled BOOLEAN DEFAULT true,
    max_attendees INTEGER DEFAULT 100,
    price DECIMAL(10,2) DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'draft',
    registration_fields JSONB DEFAULT '["name", "email", "phone"]',
    thank_you_message TEXT DEFAULT 'Thank you for registering!',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table
CREATE TABLE registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    additional_info JSONB DEFAULT '{}',
    status TEXT DEFAULT 'confirmed',
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow public to read published events
CREATE POLICY "Public can read published events" ON events
    FOR SELECT USING (status = 'published');

-- Allow authenticated users full access to events
CREATE POLICY "Authenticated users can manage events" ON events
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to register for events
CREATE POLICY "Public can register for events" ON registrations
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to manage registrations
CREATE POLICY "Authenticated users can manage registrations" ON registrations
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert a sample event for testing
INSERT INTO events (
    title,
    description,
    event_date,
    event_time,
    location,
    status,
    registration_enabled,
    max_attendees,
    price
) VALUES (
    'SHELeads Workshop - Digital Marketing Mastery',
    'Join us for an intensive workshop on digital marketing strategies for women entrepreneurs. Learn the latest tools, techniques, and best practices to grow your business online.',
    '2024-08-15',
    '10:00:00',
    'Online - Zoom Meeting',
    'published',
    true,
    50,
    29.99
);

-- Verify tables were created
SELECT 'Events table created successfully!' as message;
SELECT 'Registrations table created successfully!' as message; 