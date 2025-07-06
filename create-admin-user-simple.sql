-- Simple way to create admin user in Supabase
-- Run this in your Supabase SQL Editor

-- Create the admin user
INSERT INTO auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES (
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'work.ankit2@gmail.com',
  crypt('Ankit923@#', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  ''
);

-- Create identity record
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES (
  'work.ankit2@gmail.com',
  (SELECT id FROM auth.users WHERE email = 'work.ankit2@gmail.com'),
  format('{"sub":"%s","email":"%s"}', 
    (SELECT id FROM auth.users WHERE email = 'work.ankit2@gmail.com'), 
    'work.ankit2@gmail.com'
  )::jsonb,
  'email',
  now(),
  now()
);

-- Verify the user was created
SELECT email, created_at FROM auth.users WHERE email = 'work.ankit2@gmail.com'; 