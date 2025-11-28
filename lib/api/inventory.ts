import { Database } from '../database.types';

export type InventoryRow = Database['public']['Tables']['pharmacy_inventory']['Row'] & {
  medicines: Database['public']['Tables']['medicines']['Row'];
};

export async function getPharmacyInventory(pharmacyId: string): Promise<InventoryRow[]> {
  const res = await fetch(`/api/pharmacies/${pharmacyId}/inventory`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch inventory');
  return res.json();
}

export async function addToInventory(pharmacyId: string, data: any): Promise<InventoryRow> {
  const res = await fetch(`/api/pharmacies/${pharmacyId}/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add to inventory');
  return res.json();
}

export async function createNewMedicine(pharmacyId: string, data: any): Promise<InventoryRow> {
  const res = await fetch(`/api/pharmacies/${pharmacyId}/inventory/create-new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create medicine and add to inventory');
  return res.json();
}

export async function updateInventory(pharmacyId: string, inventoryId: string, data: any): Promise<InventoryRow> {
  const res = await fetch(`/api/pharmacies/${pharmacyId}/inventory?inventory_id=${inventoryId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update inventory');
  return res.json();
}

export async function deleteFromInventory(pharmacyId: string, inventoryId: string): Promise<void> {
  const res = await fetch(`/api/pharmacies/${pharmacyId}/inventory?inventory_id=${inventoryId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete from inventory');
}
