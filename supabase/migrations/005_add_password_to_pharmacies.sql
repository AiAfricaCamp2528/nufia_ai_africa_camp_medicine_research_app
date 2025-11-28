-- Add password and manager info to pharmacies table
ALTER TABLE pharmacies ADD COLUMN IF NOT EXISTS password TEXT;
ALTER TABLE pharmacies ADD COLUMN IF NOT EXISTS manager_name TEXT;
ALTER TABLE pharmacies ADD COLUMN IF NOT EXISTS manager_phone TEXT;
ALTER TABLE pharmacies ADD COLUMN IF NOT EXISTS has_guard BOOLEAN DEFAULT FALSE;
ALTER TABLE pharmacies ADD COLUMN IF NOT EXISTS has_prescription BOOLEAN DEFAULT FALSE;
ALTER TABLE pharmacies ADD COLUMN IF NOT EXISTS district TEXT;
