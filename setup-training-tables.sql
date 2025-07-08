-- Create trainings table
CREATE TABLE IF NOT EXISTS trainings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_date DATE,
  end_time TIME,
  location TEXT NOT NULL,
  image_url TEXT,
  level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')) DEFAULT 'Beginner',
  duration TEXT NOT NULL,
  max_participants INTEGER DEFAULT 50,
  price NUMERIC(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT CHECK (status IN ('draft', 'published', 'completed', 'cancelled')) DEFAULT 'draft',
  topics JSONB DEFAULT '[]',
  requirements JSONB DEFAULT '[]',
  instructor TEXT NOT NULL,
  instructor_bio TEXT,
  registration_enabled BOOLEAN DEFAULT true,
  registration_fields JSONB DEFAULT '["name", "email", "phone"]',
  certificate_provided BOOLEAN DEFAULT false,
  materials_included JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create training_registrations table
CREATE TABLE IF NOT EXISTS training_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  training_id UUID REFERENCES trainings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  additional_info JSONB DEFAULT '{}',
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trainings table
CREATE POLICY "Allow public read access to published trainings"
ON trainings FOR SELECT
TO public
USING (status = 'published');

CREATE POLICY "Allow authenticated users full access to trainings"
ON trainings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- RLS Policies for training_registrations table
CREATE POLICY "Allow authenticated users to insert training registrations"
ON training_registrations FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all training registrations"
ON training_registrations FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update training registrations"
ON training_registrations FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trainings_status ON trainings(status);
CREATE INDEX IF NOT EXISTS idx_trainings_start_date ON trainings(start_date);
CREATE INDEX IF NOT EXISTS idx_training_registrations_training_id ON training_registrations(training_id);
CREATE INDEX IF NOT EXISTS idx_training_registrations_email ON training_registrations(email);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON trainings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 