-- Run this SQL in your Supabase SQL Editor to create the admin user
-- This will create a user with email: work.ankit2@gmail.com and password: Ankit923@#

-- First, enable the auth extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the user directly in auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  confirmation_token,
  recovery_sent_at,
  recovery_token,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'authenticated',
  'work.ankit2@gmail.com',
  crypt('Ankit923@#', gen_salt('bf')),
  NOW(),
  NOW(),
  '',
  NULL,
  '',
  '',
  '',
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL,
  FALSE,
  NULL
);

-- Create corresponding entry in auth.identities
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'work.ankit2@gmail.com',
  (SELECT id FROM auth.users WHERE email = 'work.ankit2@gmail.com'),
  '{"sub":"' || (SELECT id FROM auth.users WHERE email = 'work.ankit2@gmail.com') || '","email":"work.ankit2@gmail.com","email_verified":true,"phone_verified":false}',
  'email',
  NOW(),
  NOW(),
  NOW()
);

-- Note: After running this script, you should be able to login with:
-- Email: work.ankit2@gmail.com
-- Password: Ankit923@# 