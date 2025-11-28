import type { Database } from '../database.types';

type PharmacyRow = Database['public']['Tables']['pharmacies']['Row'];
type PharmacyUpdate = Database['public']['Tables']['pharmacies']['Update'];

const base = '/api/pharmacies';

export async function getPharmacy(id: string): Promise<PharmacyRow> {
  const res = await fetch(`${base}/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch pharmacy');
  return res.json();
}

export async function updatePharmacy(id: string, data: PharmacyUpdate): Promise<PharmacyRow> {
  const res = await fetch(`${base}/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? 'Failed to update pharmacy');
  }
  return res.json();
}
