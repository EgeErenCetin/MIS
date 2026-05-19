-- HAOS Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. patients table
CREATE TABLE patients (
  patient_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  date_of_birth DATE NOT NULL,
  kvkk_consent BOOLEAN NOT NULL DEFAULT false,
  ai_portal_consent BOOLEAN NOT NULL DEFAULT false,
  preferred_notification_channel TEXT CHECK (preferred_notification_channel IN ('whatsapp', 'sms', 'voice')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. doctors table
CREATE TABLE doctors (
  doctor_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  department TEXT NOT NULL,
  schedule JSONB, -- stores weekly availability
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. appointments table
CREATE TABLE appointments (
  appointment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(doctor_id) ON DELETE SET NULL,
  department TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT CHECK (status IN ('confirmed', 'cancelled', 'no-show', 'completed')) DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. waitlist table
CREATE TABLE waitlist (
  waitlist_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
  department TEXT NOT NULL,
  preferred_doctor_id UUID REFERENCES doctors(doctor_id) ON DELETE SET NULL,
  preferred_date_range_start DATE NOT NULL,
  preferred_date_range_end DATE NOT NULL,
  preferred_time_of_day TEXT CHECK (preferred_time_of_day IN ('morning', 'afternoon', 'any')),
  notification_channel TEXT CHECK (notification_channel IN ('whatsapp', 'sms', 'voice')),
  waitlist_position SERIAL, -- Auto-incrementing queue position
  status TEXT CHECK (status IN ('waiting', 'offered', 'accepted', 'expired')) DEFAULT 'waiting',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. health_documents table
CREATE TABLE health_documents (
  document_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  ai_summary TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. clinic_metrics view
CREATE OR REPLACE VIEW clinic_metrics AS
SELECT
  (SELECT COUNT(*) FROM appointments WHERE status = 'no-show' AND appointment_date >= CURRENT_DATE - INTERVAL '7 days') as weekly_no_shows,
  (SELECT COUNT(*) FROM waitlist WHERE status = 'waiting') as active_waitlist_count,
  (SELECT COUNT(*) FROM appointments WHERE status = 'completed' AND appointment_date = CURRENT_DATE) as todays_completed;

-- Note: RLS (Row Level Security) and Policies should be added here to secure the tables
-- based on roles (Patient, Reception, Admin) if using Supabase Auth.
