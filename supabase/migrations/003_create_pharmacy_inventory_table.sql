-- Create pharmacy_inventory table (links medicines to pharmacies with stock/pricing)
CREATE TABLE IF NOT EXISTS pharmacy_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
  pharmacy_id TEXT NOT NULL REFERENCES pharmacies(id) ON DELETE CASCADE,
  stock INTEGER NOT NULL DEFAULT 0,
  price NUMERIC(10, 2) NOT NULL,
  availability TEXT CHECK (availability IN ('in_stock', 'low_stock', 'out_of_stock')) DEFAULT 'in_stock',
  last_restocked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(medicine_id, pharmacy_id)
);

-- Create index on medicine_id for lookups
CREATE INDEX IF NOT EXISTS idx_pharmacy_inventory_medicine_id ON pharmacy_inventory(medicine_id);

-- Create index on pharmacy_id for lookups
CREATE INDEX IF NOT EXISTS idx_pharmacy_inventory_pharmacy_id ON pharmacy_inventory(pharmacy_id);

-- Create composite index for finding medicines in a specific pharmacy
CREATE INDEX IF NOT EXISTS idx_pharmacy_inventory_pharmacy_medicine ON pharmacy_inventory(pharmacy_id, medicine_id);

-- Create index on availability for filtering
CREATE INDEX IF NOT EXISTS idx_pharmacy_inventory_availability ON pharmacy_inventory(availability);
