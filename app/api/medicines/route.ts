import { NextResponse } from 'next/server';
import type { Database } from '../../../../lib/database.types';
import { serverSupabase } from '../../../../lib/supabase';
import { createMedicineSchema } from '../../../../lib/validators/medicines';

type MedicineRow = Database['public']['Tables']['medicines']['Row'];

export async function GET() {
  try {
    const { data, error } = await serverSupabase
      .from('medicines')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase GET /medicines error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch (err) {
    console.error('Unexpected GET /medicines error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = createMedicineSchema.parse(body);

    const insertPayload = {
      name: parsed.name,
      description: parsed.description ?? null,
      price: typeof parsed.price === 'number' ? parsed.price : null,
      stock: typeof parsed.stock === 'number' ? parsed.stock : null,
    };

    const { data, error } = await serverSupabase
      .from<MedicineRow>('medicines')
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error('Supabase INSERT /medicines error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
