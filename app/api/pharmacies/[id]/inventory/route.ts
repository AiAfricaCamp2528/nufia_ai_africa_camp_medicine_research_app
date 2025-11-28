import { NextResponse } from 'next/server';
import { serverSupabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await serverSupabase
      .from('pharmacy_inventory')
      .select('*, medicines(*)')
      .eq('pharmacy_id', id);

    if (error) {
      console.error('Error fetching inventory:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // body should contain medicine_id, stock, price, availability
    // If medicine_id is not provided, we might be creating a new medicine entirely?
    // For now assume medicine exists and we are linking it.
    
    const { medicine_id, stock, price, availability } = body;

    const { data, error } = await serverSupabase
      .from('pharmacy_inventory')
      .insert({
        pharmacy_id: id,
        medicine_id,
        stock,
        price,
        availability
      })
      .select('*, medicines(*)')
      .single();

    if (error) {
      console.error('Error adding to inventory:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const inventory_id = searchParams.get('inventory_id');
    
    if (!inventory_id) {
      return NextResponse.json({ error: 'Missing inventory_id' }, { status: 400 });
    }

    const body = await request.json();

    const { data, error } = await serverSupabase
      .from('pharmacy_inventory')
      .update(body)
      .eq('id', inventory_id)
      .eq('pharmacy_id', id)
      .select('*, medicines(*)')
      .single();

    if (error) {
      console.error('Error updating inventory:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const inventory_id = searchParams.get('inventory_id');

    if (!inventory_id) {
      return NextResponse.json({ error: 'Missing inventory_id' }, { status: 400 });
    }

    const { error } = await serverSupabase
      .from('pharmacy_inventory')
      .delete()
      .eq('id', inventory_id)
      .eq('pharmacy_id', id);

    if (error) {
      console.error('Error deleting from inventory:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
