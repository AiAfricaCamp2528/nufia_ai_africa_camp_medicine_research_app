import { NextResponse } from 'next/server';
import { serverSupabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type PharmacyRow = Database['public']['Tables']['pharmacies']['Row'];
type PharmacyUpdate = Database['public']['Tables']['pharmacies']['Update'];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await serverSupabase
      .from<PharmacyRow>('pharmacies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('GET /api/pharmacies/[id] error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Pharmacy not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Unexpected GET /api/pharmacies/[id] error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await serverSupabase
      .from<PharmacyRow>('pharmacies')
      .update(body as PharmacyUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('PATCH /api/pharmacies/[id] error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Pharmacy not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Unexpected PATCH /api/pharmacies/[id] error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
