import type { Database } from '../database.types';

type MedicineRow = Database['public']['Tables']['medicines']['Row'];
type MedicineInsert = Database['public']['Tables']['medicines']['Insert'];
type MedicineUpdate = Database['public']['Tables']['medicines']['Update'];

const base = '/api/medicines';

export async function getMedicines(): Promise<MedicineRow[]> {
  const res = await fetch(base, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch medicines');
  return res.json();
}

export async function getMedicine(id: string): Promise<MedicineRow> {
  const res = await fetch(`${base}/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch medicine');
  return res.json();
}

export async function createMedicine(data: MedicineInsert): Promise<MedicineRow> {
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? 'Failed to create medicine');
  }
  return res.json();
}

export async function updateMedicine(id: string, data: MedicineUpdate): Promise<MedicineRow> {
  const res = await fetch(`${base}/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? 'Failed to update medicine');
  }
  return res.json();
}

export async function deleteMedicine(id: string): Promise<void> {
  const res = await fetch(`${base}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? 'Failed to delete medicine');
  }
}
