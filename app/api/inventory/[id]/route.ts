import { NextResponse } from 'next/server';
import { serverSupabase } from '../../../../lib/supabase';
import type { Database } from '../../../../lib/database.types';
import { z } from 'zod';

type InventoryRow = Database['public']['Tables']['pharmacy_inventory']['Row'];

const updateInventorySchema = z.object({
  stock: z.number().int().nonnegative().optional(),
  price: z.number().nonnegative().optional(),
  availability: z.enum(['in_stock', 'low_stock', 'out_of_stock']).optional(),
  last_restocked: z.string().optional(),
});

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { data, error } = await serverSupabase
      .from<InventoryRow>('pharmacy_inventory')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('GET /api/inventory/[id] error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Unexpected GET /api/inventory/[id] error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const body = await req.json();
    const parsed = updateInventorySchema.parse(body);

    const { data, error } = await serverSupabase
      .from<InventoryRow>('pharmacy_inventory')
      .update(parsed)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('PATCH /api/inventory/[id] error', error);
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

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { data, error } = await serverSupabase
      .from<InventoryRow>('pharmacy_inventory')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('DELETE /api/inventory/[id] error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Unexpected DELETE /api/inventory/[id] error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
