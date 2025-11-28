import { NextResponse } from 'next/server';
import { serverSupabase } from '../../../lib/supabase';
import type { Database } from '../../../lib/database.types';

type InventoryRow = Database['public']['Tables']['pharmacy_inventory']['Row'];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pharmacyId = searchParams.get('pharmacy_id');
    const medicineId = searchParams.get('medicine_id');

    let query = serverSupabase.from<InventoryRow>('pharmacy_inventory').select('*');

    if (pharmacyId) query = query.eq('pharmacy_id', pharmacyId);
    if (medicineId) query = query.eq('medicine_id', medicineId);

    const { data, error } = await query;
    if (error) {
      console.error('GET /api/inventory error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data ?? [], { status: 200 });
  } catch (err) {
    console.error('Unexpected GET /api/inventory error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
