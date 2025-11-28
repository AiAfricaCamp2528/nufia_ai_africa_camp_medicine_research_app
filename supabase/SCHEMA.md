# Supabase Database Schema

This document describes the complete database schema for the medicine pharmacy application, generated from the mock data structures.

## Overview

The schema consists of three core tables:
- **medicines**: Catalog of medications with medical information
- **pharmacies**: Physical pharmacy locations and contact info
- **pharmacy_inventory**: Junction table linking medicines to pharmacies with stock/pricing

## Tables

### 1. medicines

Stores the complete catalog of medications.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Unique identifier |
| name | TEXT | NO | - | Medicine name (e.g., "Paracétamol") |
| dosage | TEXT | YES | - | Dosage strength (e.g., "500mg") |
| form | TEXT | YES | - | Pharmaceutical form (e.g., "Comprimé") |
| description | TEXT | YES | - | Medical description and use |
| indications | TEXT[] | YES | '{}' | Array of medical indications/uses |
| contraindications | TEXT[] | YES | '{}' | Array of contraindications |
| side_effects | TEXT[] | YES | '{}' | Array of potential side effects |
| manufacturer | TEXT | YES | - | Manufacturer name (e.g., "Sanofi") |
| availability | TEXT | YES | 'in_stock' | Enum: 'in_stock', 'low_stock', 'out_of_stock' |
| price | NUMERIC(10,2) | YES | - | Base price in local currency |
| created_at | TIMESTAMP | YES | now() | Record creation timestamp |
| updated_at | TIMESTAMP | YES | now() | Record last update timestamp |

**Indexes:**
- `idx_medicines_name`: Name search performance
- `idx_medicines_availability`: Availability filtering

**Sample Data:**
```
- Paracétamol 500mg (Comprimé) - 500 - Sanofi
- Ibuprofène 400mg (Comprimé) - 1200 - GSK
- Amoxicilline 1g (Comprimé) - 2500 - Sandoz
- Doliprane 1000mg (Comprimé) - 800 - Sanofi
- Metformine 850mg (Comprimé) - 1200 - Merck
```

### 2. pharmacies

Stores physical pharmacy locations and operational details.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | TEXT | NO | - | Unique identifier (e.g., "pharm-001") |
| name | TEXT | NO | - | Pharmacy name |
| location | TEXT | YES | - | District/neighborhood (e.g., "Plateau") |
| city | TEXT | YES | - | City (e.g., "Abidjan") |
| phone | TEXT | YES | - | Contact phone number |
| email | TEXT | YES | - | Contact email |
| address | TEXT | YES | - | Full street address |
| opening_hours | TEXT | YES | - | Operating hours (e.g., "08:00 - 22:00") |
| latitude | NUMERIC(10,8) | YES | - | Geographic latitude |
| longitude | NUMERIC(11,8) | YES | - | Geographic longitude |
| image | TEXT | YES | - | Path to pharmacy image |
| description | TEXT | YES | - | Pharmacy description/specialties |
| created_at | TIMESTAMP | YES | now() | Record creation timestamp |
| updated_at | TIMESTAMP | YES | now() | Record last update timestamp |

**Indexes:**
- `idx_pharmacies_city`: Filter by city
- `idx_pharmacies_location`: Filter by district
- `idx_pharmacies_name`: Search by name

**Sample Data:**
```
- pharm-001: Pharmacie Central (Plateau, Abidjan)
- pharm-002: Pharmacie Santé Plus (Cocody, Abidjan)
- pharm-003: Pharmacie Étoile (Riviera, Abidjan)
```

### 3. pharmacy_inventory

Junction table linking medicines to pharmacies with stock/pricing. Enables per-pharmacy price variations and stock tracking.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Unique identifier |
| medicine_id | UUID | NO | - | Foreign key → medicines.id (CASCADE) |
| pharmacy_id | TEXT | NO | - | Foreign key → pharmacies.id (CASCADE) |
| stock | INTEGER | NO | 0 | Current stock quantity |
| price | NUMERIC(10,2) | NO | - | Price at this pharmacy (can differ) |
| availability | TEXT | YES | 'in_stock' | Enum: 'in_stock', 'low_stock', 'out_of_stock' |
| last_restocked | TIMESTAMP | YES | - | When inventory was last updated |
| created_at | TIMESTAMP | YES | now() | Record creation timestamp |
| updated_at | TIMESTAMP | YES | now() | Record last update timestamp |

**Indexes:**
- `idx_pharmacy_inventory_medicine_id`: Find all pharmacies with a medicine
- `idx_pharmacy_inventory_pharmacy_id`: Find all medicines in a pharmacy
- `idx_pharmacy_inventory_pharmacy_medicine`: Composite for quick lookups
- `idx_pharmacy_inventory_availability`: Filter by availability

**Constraints:**
- UNIQUE(medicine_id, pharmacy_id): Each pharmacy can only have one inventory entry per medicine
- Foreign keys with CASCADE delete ensure data integrity

**Sample Data:**
```
Each pharmacy has ~15 medicines in stock with varying prices and quantities.
E.g., Paracétamol might be 2500 at pharm-001, 2800 at pharm-002, 2300 at pharm-003.
```

## Relationships

```
medicines (1) ──────┬────── pharmacy_inventory (M)
                    │
                    ├────── pharmacies (M) [via pharmacy_inventory]

pharmacies (1) ──────┬────── pharmacy_inventory (M)
                     │
                     ├────── medicines (M) [via pharmacy_inventory]
```

## Row-Level Security (RLS)

Currently, no RLS policies are enforced. You should add:
- **PUBLIC READ**: Anyone can read medicines, pharmacies, and inventory (search/browse)
- **AUTHENTICATED CREATE/UPDATE**: Only logged-in pharmacists/admins can modify inventory
- **ROLE-BASED**: Pharmacists can only edit inventory for their pharmacy

Example RLS policies to implement:
```sql
-- Allow public read on medicines
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_public_read_medicines" ON medicines
  FOR SELECT USING (true);

-- Allow authenticated users to modify pharmacy_inventory
ALTER TABLE pharmacy_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_authenticated_write_inventory" ON pharmacy_inventory
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
```

## How to Use with Supabase CLI

1. **Copy migration files** to your Supabase project:
   ```bash
   supabase migration new create_base_schema
   # Then copy content from 001_create_medicines_table.sql etc.
   ```

2. **Or apply directly in Supabase dashboard**:
   - Open SQL Editor in Supabase dashboard
   - Copy and run each migration file (001 → 004) in order

3. **Generate TypeScript types**:
   ```bash
   supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts
   ```

## Performance Considerations

- **Indexes** are set up for common queries (search by name, filter by city/availability)
- **Composite index** on `(pharmacy_id, medicine_id)` speeds up inventory lookups
- **UNIQUE constraint** on `(medicine_id, pharmacy_id)` prevents duplicates and acts as a natural index
- Consider adding **full-text search** index on medicines.name/description for advanced search

## Future Enhancements

- Add `users` table for pharmacists/customers with auth integration
- Add `orders` table to track medicine purchases
- Add `audit_log` table to track inventory changes
- Add `categories` table to organize medicines by type/family
- Add `interactions` table to track drug interactions
- Add `reviews` table for customer ratings/comments
