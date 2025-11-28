import { NextResponse } from 'next/server';
import { getPharmaciesWithMedicine } from '../../../../../lib/db/queries';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const result = await getPharmaciesWithMedicine(id);
    return NextResponse.json(result ?? [], { status: 200 });
  } catch (err: any) {
    console.error('GET /api/pharmacies/with-medicine/[id] error', err);
    return NextResponse.json({ error: err?.message ?? 'Unexpected error' }, { status: 500 });
  }
}
