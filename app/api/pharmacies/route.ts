import { NextResponse } from 'next/server';
import { serverSupabase } from '../../../lib/supabase';
import type { Database } from '../../../lib/database.types';

type PharmacyRow = Database['public']['Tables']['pharmacies']['Row'];

export async function GET() {
  try {
    const { data, error } = await serverSupabase.from<PharmacyRow>('pharmacies').select('*');
    if (error) {
      console.error('GET /api/pharmacies error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data ?? [], { status: 200 });
  } catch (err) {
    console.error('Unexpected GET /api/pharmacies error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
