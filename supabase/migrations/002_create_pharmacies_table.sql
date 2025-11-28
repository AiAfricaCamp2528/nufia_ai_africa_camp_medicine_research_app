-- Create pharmacies table
CREATE TABLE IF NOT EXISTS pharmacies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  city TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  opening_hours TEXT,
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  image TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on city for filtering
CREATE INDEX IF NOT EXISTS idx_pharmacies_city ON pharmacies(city);

-- Create index on location for filtering
CREATE INDEX IF NOT EXISTS idx_pharmacies_location ON pharmacies(location);

-- Create index on name for search
CREATE INDEX IF NOT EXISTS idx_pharmacies_name ON pharmacies(name);
