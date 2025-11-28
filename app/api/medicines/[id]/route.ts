import { NextResponse } from 'next/server';
import type { Database } from '../../../../../lib/database.types';
import { serverSupabase } from '../../../../../lib/supabase';
import { updateMedicineSchema } from '../../../../../lib/validators/medicines';

type MedicineRow = Database['public']['Tables']['medicines']['Row'];

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const { data, error } = await serverSupabase
      .from<MedicineRow>('medicines')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Supabase GET /medicines/[id] error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Unexpected GET /medicines/[id] error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const body = await req.json();
    const parsed = updateMedicineSchema.parse(body);

    const { data, error } = await serverSupabase
      .from<MedicineRow>('medicines')
      .update(parsed)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase PATCH /medicines/[id] error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const { data, error } = await serverSupabase
      .from<MedicineRow>('medicines')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase DELETE /medicines/[id] error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Unexpected DELETE /medicines/[id] error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
