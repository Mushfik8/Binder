-- ============================================
-- Binder — Initial Database Schema
-- Migration: 001_initial_schema
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 50),
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 120),
  bio TEXT CHECK (char_length(bio) <= 500),
  city TEXT,
  pronouns TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_discoverable BOOLEAN DEFAULT true,
  is_incognito BOOLEAN DEFAULT false,
  is_paused BOOLEAN DEFAULT false,
  is_banned BOOLEAN DEFAULT false,
  is_suspended_until TIMESTAMPTZ,
  is_admin BOOLEAN DEFAULT false,
  location_mode TEXT DEFAULT 'hidden' CHECK (location_mode IN ('approximate', 'city_only', 'hidden')),
  location_point GEOGRAPHY(POINT, 4326),
  location_city TEXT,
  pressure_meter INTEGER DEFAULT 3 CHECK (pressure_meter BETWEEN 1 AND 5),
  show_age BOOLEAN DEFAULT true,
  show_city BOOLEAN DEFAULT true,
  show_distance BOOLEAN DEFAULT false,
  show_online_status BOOLEAN DEFAULT false,
  language_preference TEXT DEFAULT 'bn' CHECK (language_preference IN ('bn', 'en')),
  age_verified_at TIMESTAMPTZ,
  terms_accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  health_disclaimer_accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  onboarding_completed BOOLEAN DEFAULT false,
  last_active_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_profiles_discoverable ON profiles (is_discoverable, is_banned, deleted_at)
  WHERE is_discoverable = true AND is_banned = false AND deleted_at IS NULL;
CREATE INDEX idx_profiles_city ON profiles (location_city) WHERE deleted_at IS NULL;
CREATE INDEX idx_profiles_last_active ON profiles (last_active_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_profiles_age ON profiles (age) WHERE deleted_at IS NULL;

-- ============================================
-- PROFILE PHOTOS
-- ============================================
CREATE TABLE profile_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  card_path TEXT,
  full_path TEXT,
  position INTEGER NOT NULL CHECK (position BETWEEN 0 AND 5),
  moderation_status TEXT DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged')),
  is_primary BOOLEAN DEFAULT false,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (profile_id, position)
);

CREATE INDEX idx_profile_photos_profile ON profile_photos (profile_id, position);
CREATE INDEX idx_profile_photos_moderation ON profile_photos (moderation_status) WHERE moderation_status = 'pending';

-- ============================================
-- TAGS (brand/style, interests)
-- ============================================
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  name_bn TEXT,
  category TEXT NOT NULL CHECK (category IN ('brand_style', 'interest', 'custom')),
  is_brand_name BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_admin_disabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE profile_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (profile_id, tag_id)
);

CREATE INDEX idx_profile_tags_profile ON profile_tags (profile_id);
CREATE INDEX idx_profile_tags_tag ON profile_tags (tag_id);

-- ============================================
-- MOODS (pressure/vibe tags)
-- ============================================
CREATE TABLE moods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL UNIQUE,
  label_bn TEXT,
  emoji TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE profile_moods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mood_id UUID NOT NULL REFERENCES moods(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (profile_id, mood_id)
);

-- ============================================
-- BLOCKS
-- ============================================
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (blocker_id, blocked_id)
);

CREATE INDEX idx_blocks_blocker ON blocks (blocker_id);
CREATE INDEX idx_blocks_blocked ON blocks (blocked_id);

-- ============================================
-- HELPER FUNCTION: is_blocked
-- ============================================
CREATE OR REPLACE FUNCTION is_blocked(user_a UUID, user_b UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM blocks
    WHERE (blocker_id = user_a AND blocked_id = user_b)
       OR (blocker_id = user_b AND blocked_id = user_a)
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================
-- HELPER FUNCTION: is_admin check
-- ============================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================
-- RLS POLICIES — PROFILES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can read discoverable profiles (not blocked, not banned, not deleted)
CREATE POLICY "Users can read discoverable profiles"
  ON profiles FOR SELECT
  USING (
    is_discoverable = true
    AND is_banned = false
    AND deleted_at IS NULL
    AND NOT is_blocked(auth.uid(), id)
  );

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (is_admin());

-- ============================================
-- RLS POLICIES — PROFILE PHOTOS
-- ============================================
ALTER TABLE profile_photos ENABLE ROW LEVEL SECURITY;

-- Users can manage their own photos
CREATE POLICY "Users can manage own photos"
  ON profile_photos FOR ALL
  USING (profile_id = auth.uid());

-- Users can read approved photos of others (not blocked)
CREATE POLICY "Users can read approved photos"
  ON profile_photos FOR SELECT
  USING (
    moderation_status = 'approved'
    AND NOT is_blocked(auth.uid(), profile_id)
  );

-- ============================================
-- RLS POLICIES — TAGS
-- ============================================
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active tags"
  ON tags FOR SELECT
  USING (is_active = true AND is_admin_disabled = false);

CREATE POLICY "Admins can manage tags"
  ON tags FOR ALL
  USING (is_admin());

-- ============================================
-- RLS POLICIES — PROFILE TAGS
-- ============================================
ALTER TABLE profile_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own tags"
  ON profile_tags FOR ALL
  USING (profile_id = auth.uid());

CREATE POLICY "Users can read others tags"
  ON profile_tags FOR SELECT
  USING (NOT is_blocked(auth.uid(), profile_id));

-- ============================================
-- RLS POLICIES — MOODS
-- ============================================
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active moods"
  ON moods FOR SELECT
  USING (is_active = true);

-- ============================================
-- RLS POLICIES — PROFILE MOODS
-- ============================================
ALTER TABLE profile_moods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own moods"
  ON profile_moods FOR ALL
  USING (profile_id = auth.uid());

CREATE POLICY "Users can read others moods"
  ON profile_moods FOR SELECT
  USING (NOT is_blocked(auth.uid(), profile_id));

-- ============================================
-- RLS POLICIES — BLOCKS
-- ============================================
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own blocks"
  ON blocks FOR ALL
  USING (blocker_id = auth.uid());

-- ============================================
-- TRIGGER: auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, age, terms_accepted_at, health_disclaimer_accepted_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Binder User'),
    18, -- Default age; updated during onboarding
    now(),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- TRIGGER: update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA: Default tags
-- ============================================
INSERT INTO tags (name, name_bn, category, is_brand_name) VALUES
  ('Benson Boy', 'বেনসন বয়', 'brand_style', true),
  ('Gold Leaf Gang', 'গোল্ড লিফ গ্যাং', 'brand_style', true),
  ('Lucky Strike Crew', 'লাকি স্ট্রাইক ক্রু', 'brand_style', true),
  ('Marlboro Mood', 'মার্লবরো মুড', 'brand_style', true),
  ('Biri Veteran', 'বিড়ি ভেটেরান', 'brand_style', true),
  ('Tea Stall Adda', 'চায়ের স্টলে আড্ডা', 'interest', false),
  ('Late Night Work', 'রাত জেগে কাজ', 'interest', false),
  ('Music', 'গান-বাজনা', 'interest', false),
  ('Football', 'ফুটবল', 'interest', false),
  ('Coding', 'কোডিং', 'interest', false),
  ('Gaming', 'গেমিং', 'interest', false),
  ('Campus Life', 'ক্যাম্পাস লাইফ', 'interest', false),
  ('Corporate Life', 'কর্পোরেট লাইফ', 'interest', false);

-- ============================================
-- SEED DATA: Default moods
-- ============================================
INSERT INTO moods (label, label_bn, emoji) VALUES
  ('Office pressure', 'অফিসের প্রেশার', '💼'),
  ('GF er pera', 'জিএফ এর পেরা', '💔'),
  ('Wife pressure', 'বউয়ের প্রেশার', '😅'),
  ('Boss dekhe felse', 'বস দেখে ফেলসে', '😰'),
  ('Salary ekhono ashe nai', 'স্যালারি এখনো আসে নাই', '💸'),
  ('Traffic e atke asi', 'ট্রাফিকে আটকে আসি', '🚗'),
  ('Deadline er agun', 'ডেডলাইনের আগুন', '🔥'),
  ('Exam er tension', 'পরীক্ষার টেনশন', '📚'),
  ('Family group er notification', 'ফ্যামিলি গ্রুপের নোটিফিকেশন', '📱'),
  ('Just need a break', 'শুধু একটু ব্রেক দরকার', '☕');
