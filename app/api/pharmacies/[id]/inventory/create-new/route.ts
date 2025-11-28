import { NextResponse } from 'next/server';
import { serverSupabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pharmacyId } = await params;
    const body = await request.json();
    
    const {
      name,
      dosage,
      form,
      description,
      manufacturer,
      price, // Inventory price
      stock,
      availability,
      indications,
      contraindications,
      side_effects
    } = body;

    // 1. Create Medicine
    const { data: medicineData, error: medicineError } = await serverSupabase
      .from('medicines')
      .insert({
        name,
        dosage,
        form,
        description,
        manufacturer,
        price, // Default price in medicines table
        availability: 'in_stock', // Default availability for the medicine generally
        indications: indications || [],
        contraindications: contraindications || [],
        side_effects: side_effects || []
      })
      .select()
      .single();

    if (medicineError || !medicineData) {
      console.error('Error creating medicine:', medicineError);
      return NextResponse.json({ error: medicineError?.message || 'Failed to create medicine' }, { status: 500 });
    }

    // 2. Add to Pharmacy Inventory
    const { data: inventoryData, error: inventoryError } = await serverSupabase
      .from('pharmacy_inventory')
      .insert({
        pharmacy_id: pharmacyId,
        medicine_id: medicineData.id,
        stock: Number(stock),
        price: Number(price),
        availability: availability || 'in_stock'
      })
      .select('*, medicines(*)')
      .single();

    if (inventoryError) {
      console.error('Error adding to inventory:', inventoryError);
      // Optional: Rollback medicine creation if inventory creation fails? 
      // For now, we'll just report the error. The medicine exists but isn't linked.
      return NextResponse.json({ error: inventoryError.message }, { status: 500 });
    }

    return NextResponse.json(inventoryData);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
