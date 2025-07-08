-- Simple script to create admin user
-- Replace YOUR_EMAIL and YOUR_PASSWORD with actual values
-- Run this in your Supabase SQL Editor

-- Method 1: Using Supabase auth.signup (Recommended)
SELECT auth.signup(
  'YOUR_EMAIL@example.com',
  'YOUR_PASSWORD',
  '{"full_name": "Admin User"}'::jsonb
);

-- Method 2: If above doesn't work, use the admin dashboard
-- Go to: Authentication → Users → Add User
-- Fill in your email and password
-- Enable "Auto Confirm User"

-- Verify the user was created
SELECT id, email, created_at, email_confirmed_at 
FROM auth.users 
WHERE email = 'YOUR_EMAIL@example.com';

-- Your login credentials will be:
-- Email: YOUR_EMAIL@example.com  
-- Password: YOUR_PASSWORD 