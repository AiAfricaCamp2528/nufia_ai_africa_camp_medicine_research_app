 'use client';

import React, { useEffect, useState } from 'react';
import MedicineItem from './MedicineItem';
import MedicineForm from './MedicineForm';
import type { Database } from '../../../lib/database.types';
import { getMedicines, deleteMedicine } from '../../../lib/api/medicines';

type MedicineRow = Database['public']['Tables']['medicines']['Row'];

export default function MedicineList() {
  const [items, setItems] = useState<MedicineRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<MedicineRow | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await getMedicines();
      setItems(data || []);
    } catch (err) {
      console.error('Failed to load medicines', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this medicine?')) return;
    try {
      await deleteMedicine(id);
      await load();
    } catch (err) {
      console.error(err);
      alert('Could not delete');
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-md bg-white/3 border border-white/5">
        <h2 className="text-xl font-bold">Create / Edit Medicine</h2>
        <MedicineForm
          initial={editing}
          onSuccess={async () => {
            setEditing(null);
            await load();
          }}
          onCancel={() => setEditing(null)}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold">Medicines</h2>
        {loading && <div>Loading...</div>}
        <div className="grid gap-3 mt-3">
          {items.map((m) => (
            <MedicineItem
              key={m.id}
              medicine={m}
              onEdit={(med) => setEditing(med)}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
          {items.length === 0 && !loading && <div>No medicines yet.</div>}
        </div>
      </div>
    </div>
  );
}
