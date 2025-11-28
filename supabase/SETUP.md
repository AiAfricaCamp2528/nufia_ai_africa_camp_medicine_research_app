# Supabase Database Setup Guide

This guide explains how to apply the database schema and seed data to your Supabase project.

## 📋 What's Included

The schema is generated from your mock data structures and includes:

1. **medicines** table: Medication catalog with medical info
2. **pharmacies** table: Pharmacy locations and contact info
3. **pharmacy_inventory** table: Links medicines to pharmacies with stock/pricing
4. **Indexes**: Performance optimization for common queries
5. **Seed data**: 5 medicines and 3 pharmacies (from your mocks)

## 🚀 Quick Start

### Option 1: Using Supabase Dashboard (Easiest)

1. Go to your **Supabase Dashboard** → **SQL Editor**
2. Click **New Query**
3. Copy and paste the migration files in order:
   - `supabase/migrations/001_create_medicines_table.sql`
   - `supabase/migrations/002_create_pharmacies_table.sql`
   - `supabase/migrations/003_create_pharmacy_inventory_table.sql`
   - `supabase/migrations/004_seed_initial_data.sql`
4. Run each query
5. Verify in the **Table Editor** that all tables exist

### Option 2: Using Supabase CLI

1. **Initialize Supabase** (if not done):
   ```bash
   cd medicine_search
   supabase init
   ```

2. **Create migration from template**:
   ```bash
   supabase migration new create_schema_from_mocks
   ```

3. **Copy the content** from the migration files into the generated file

4. **Apply migrations**:
   ```bash
   supabase db push
   ```

### Option 3: Manual SQL Copy-Paste

Copy each migration file's content into the Supabase SQL Editor and run sequentially.

## ✅ Verify Installation

After applying migrations, verify in Supabase Dashboard:

1. **SQL Editor** → Run this query:
   ```sql
   SELECT 
     'medicines' as table_name, COUNT(*) as row_count 
   FROM medicines
   UNION ALL
   SELECT 
     'pharmacies' as table_name, COUNT(*) as row_count 
   FROM pharmacies
   UNION ALL
   SELECT 
     'pharmacy_inventory' as table_name, COUNT(*) as row_count 
   FROM pharmacy_inventory;
   ```
   
   Expected output:
   ```
   medicines            | 5
   pharmacies           | 3
   pharmacy_inventory   | ~15-45 rows
   ```

2. **Table Editor**: Check all three tables are listed

3. **Test a query**:
   ```sql
   SELECT m.name, m.dosage, p.name as pharmacy_name, pi.price, pi.stock
   FROM pharmacy_inventory pi
   JOIN medicines m ON pi.medicine_id = m.id
   JOIN pharmacies p ON pi.pharmacy_id = p.id
   LIMIT 5;
   ```

## 📝 Update TypeScript Types

After creating the schema, regenerate types to match your actual database:

```bash
# Install Supabase CLI if you haven't
npm install -D supabase

# Generate types (replace YOUR_PROJECT_ID)
supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts
```

Or if you prefer to use the pre-configured types I've created, they're already in `lib/database.types.ts`.

## 🔐 Security Considerations

Currently, the schema has **NO row-level security (RLS) policies**. Before going to production:

1. **Enable RLS on sensitive tables**:
   ```sql
   ALTER TABLE pharmacy_inventory ENABLE ROW LEVEL SECURITY;
   ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
   ALTER TABLE pharmacies ENABLE ROW LEVEL SECURITY;
   ```

2. **Create public read policy**:
   ```sql
   CREATE POLICY "allow_public_read_medicines" ON medicines
     FOR SELECT USING (true);
   ```

3. **Create authenticated write policy** (example):
   ```sql
   CREATE POLICY "allow_authenticated_write_inventory" ON pharmacy_inventory
     FOR ALL TO authenticated
     USING (true) WITH CHECK (true);
   ```

See `supabase/SCHEMA.md` for full RLS recommendations.

## 🗂️ Schema Structure

### medicines
- Catalog of medications
- Medical information (indications, contraindications, side effects)
- Fields: name, dosage, form, description, indications[], contraindications[], side_effects[], manufacturer, availability, price

### pharmacies
- Physical pharmacy locations
- Fields: id, name, location, city, phone, email, address, opening_hours, latitude, longitude, image, description

### pharmacy_inventory
- Many-to-many junction between medicines and pharmacies
- Supports per-pharmacy pricing and stock tracking
- Fields: medicine_id (FK), pharmacy_id (FK), stock, price, availability, last_restocked

## 🔄 Integration with Your App

Your app already has API routes and helpers configured:

```bash
app/api/medicines/           # API endpoints
lib/api/medicines.ts         # Frontend helpers
lib/database.types.ts        # TypeScript types
components/medicines/        # Demo UI components
```

The API routes use `serverSupabase` (with service role key) to query the database.

## 🧪 Test the Integration

1. **Make sure environment variables are set** (`.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

2. **Start dev server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Test API endpoints**:
   - GET: `http://localhost:3000/api/medicines`
   - Should return 5 medicines from the database

4. **Test demo UI**:
   - Add `<MedicineList />` to any page component
   - Should display medicines, form to create, and edit/delete buttons

## 📖 More Info

- **Schema documentation**: `supabase/SCHEMA.md`
- **Migration files**: `supabase/migrations/`
- **API routes**: `app/api/medicines/`
- **Frontend helpers**: `lib/api/medicines.ts`
- **Database types**: `lib/database.types.ts`

## 🆘 Troubleshooting

### "Table does not exist" error
- Make sure all 4 migration files were applied in order (001 → 004)
- Check the Supabase Dashboard → Table Editor

### "SUPABASE_SERVICE_ROLE_KEY is missing" warning
- Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Restart the dev server

### Types are outdated
- Regenerate with: `supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts`

### API returns 500 error
- Check the Supabase dashboard for table/query errors
- Verify the service role key is valid
- Check server logs for details

## ✨ Next Steps

1. Apply the migrations to your Supabase project
2. Verify the schema with test queries
3. Update `.env.local` with Supabase credentials
4. Restart your dev server
5. Test the API endpoints
6. Integrate `MedicineList` component into your app
7. Add row-level security policies
8. Implement user authentication/roles as needed
