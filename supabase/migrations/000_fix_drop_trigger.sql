-- ============================================
-- FIX: Remove the auto-create profile trigger
-- that causes "Database error saving new user"
--
-- Run this in Supabase SQL Editor FIRST,
-- before trying to sign up.
-- ============================================

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function if it exists
DROP FUNCTION IF EXISTS handle_new_user();
