 'use client';

import React, { useState } from 'react';
import type { Database } from '../../../lib/database.types';
import { createMedicine, updateMedicine } from '../../../lib/api/medicines';

type MedicineInsert = Database['public']['Tables']['medicines']['Insert'];
type MedicineRow = Database['public']['Tables']['medicines']['Row'];

export default function MedicineForm({
  initial,
  onSuccess,
  onCancel,
}: {
  initial?: MedicineRow | null;
  onSuccess?: (m?: MedicineRow) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [price, setPrice] = useState<string>(
    initial?.price != null ? String(initial.price) : ''
  );
  const [stock, setStock] = useState<string>(
    initial?.stock != null ? String(initial.stock) : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload: MedicineInsert = {
        name: name.trim(),
        description: description.trim() || null,
        price: price !== '' ? parseFloat(price) : null,
        stock: stock !== '' ? parseInt(stock, 10) : null,
      };

      if (initial?.id) {
        const updated = await updateMedicine(initial.id, payload as any);
        onSuccess && onSuccess(updated);
      } else {
        const created = await createMedicine(payload);
        onSuccess && onSuccess(created as any);
        // clear form
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
      }
    } catch (err: any) {
      setError(err?.message ?? 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block text-sm">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white/5 border border-white/5"
          required
        />
      </div>
      <div>
        <label className="block text-sm">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white/5 border border-white/5"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            step="0.01"
            className="w-full px-3 py-2 rounded bg-white/5 border border-white/5"
          />
        </div>
        <div className="w-32">
          <label className="block text-sm">Stock</label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            className="w-full px-3 py-2 rounded bg-white/5 border border-white/5"
          />
        </div>
      </div>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
          disabled={loading}
        >
          {initial ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
