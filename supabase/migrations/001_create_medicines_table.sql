-- Create medicines table
CREATE TABLE IF NOT EXISTS medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  dosage TEXT,
  form TEXT,
  description TEXT,
  indications TEXT[] DEFAULT '{}',
  contraindications TEXT[] DEFAULT '{}',
  side_effects TEXT[] DEFAULT '{}',
  manufacturer TEXT,
  availability TEXT CHECK (availability IN ('in_stock', 'low_stock', 'out_of_stock')) DEFAULT 'in_stock',
  price NUMERIC(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on name for search performance
CREATE INDEX IF NOT EXISTS idx_medicines_name ON medicines(name);

-- Create index on availability for filtering
CREATE INDEX IF NOT EXISTS idx_medicines_availability ON medicines(availability);
