import { serverSupabase } from '../supabase';
import type { Database } from '../database.types';

type MedicineRow = Database['public']['Tables']['medicines']['Row'];
type PharmacyRow = Database['public']['Tables']['pharmacies']['Row'];
type InventoryRow = Database['public']['Tables']['pharmacy_inventory']['Row'];

export async function getMedicines(): Promise<MedicineRow[]> {
  const { data, error } = await serverSupabase
    .from<MedicineRow>('medicines')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getMedicineById(id: string): Promise<MedicineRow | null> {
  const { data, error } = await serverSupabase
    .from<MedicineRow>('medicines')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

// Helper: accept either uuid id or numeric index (legacy). If numeric, pick by ordering.
export async function getMedicineByIdOrIndex(idOrIndex: string): Promise<MedicineRow | null> {
  // try as uuid first
  const byId = await getMedicineById(idOrIndex);
  if (byId) return byId;

  const idx = parseInt(idOrIndex, 10);
  if (!Number.isFinite(idx)) return null;

  const all = await getMedicines();
  return all[idx] ?? null;
}

export async function getPharmacies(): Promise<PharmacyRow[]> {
  const { data, error } = await serverSupabase.from<PharmacyRow>('pharmacies').select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getInventoryByMedicine(medicineId: string): Promise<InventoryRow[]> {
  const { data, error } = await serverSupabase
    .from<InventoryRow>('pharmacy_inventory')
    .select('*')
    .eq('medicine_id', medicineId);
  if (error) throw error;
  return data ?? [];
}

export async function getInventoryByPharmacy(pharmacyId: string): Promise<InventoryRow[]> {
  const { data, error } = await serverSupabase
    .from<InventoryRow>('pharmacy_inventory')
    .select('*')
    .eq('pharmacy_id', pharmacyId);
  if (error) throw error;
  return data ?? [];
}

export async function getPharmaciesWithMedicine(medicineId: string) {
  // returns array of { pharmacy: PharmacyRow, medicinePrice, medicineStock, availability }
  const inventory = await getInventoryByMedicine(medicineId);
  if (inventory.length === 0) return [];

  const pharmacyIds = inventory.map((i) => i.pharmacy_id);
  const { data: pharmacies, error } = await serverSupabase
    .from<PharmacyRow>('pharmacies')
    .select('*')
    .in('id', pharmacyIds);
  if (error) throw error;

  const pharmaciesMap = new Map(pharmacies?.map((p) => [p.id, p]));

  return inventory.map((inv) => {
    const pharmacy = pharmaciesMap.get(inv.pharmacy_id)!;
    return {
      id: pharmacy.id,
      name: pharmacy.name,
      address: pharmacy.address,
      location: pharmacy.location,
      city: pharmacy.city,
      phone: pharmacy.phone,
      openingHours: pharmacy.opening_hours,
      description: pharmacy.description,
      medicinePrice: inv.price,
      medicineStock: inv.stock,
      availability: inv.availability,
    };
  });
}

export async function getMedicinesByPharmacy(pharmacyId: string) {
  const inventory = await getInventoryByPharmacy(pharmacyId);
  if (inventory.length === 0) return [];

  const medicineIds = inventory.map((i) => i.medicine_id);
  const { data: medicines, error } = await serverSupabase
    .from<MedicineRow>('medicines')
    .select('*')
    .in('id', medicineIds);
  if (error) throw error;

  const medMap = new Map(medicines?.map((m) => [m.id, m]));

  return inventory.map((inv) => {
    const med = medMap.get(inv.medicine_id)!;
    return {
      ...med,
      pharmacyPrice: inv.price,
      pharmacyStock: inv.stock,
      availability: inv.availability,
      inventoryId: inv.id,
    };
  });
}
