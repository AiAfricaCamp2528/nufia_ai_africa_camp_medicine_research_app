 'use client';

import React from 'react';
import type { Database } from '../../../lib/database.types';

type MedicineRow = Database['public']['Tables']['medicines']['Row'];

export default function MedicineItem({
  medicine,
  onEdit,
  onDelete,
}: {
  medicine: MedicineRow;
  onEdit?: (m: MedicineRow) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="p-4 rounded-md bg-white/5 backdrop-blur-sm border border-white/5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{medicine.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{medicine.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm">Price: <strong>{medicine.price ?? '—'}</strong></div>
          <div className="text-sm">Stock: <strong>{medicine.stock ?? '—'}</strong></div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
          onClick={() => onEdit && onEdit(medicine)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 rounded bg-rose-600 text-white text-sm"
          onClick={() => onDelete && onDelete(medicine.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
