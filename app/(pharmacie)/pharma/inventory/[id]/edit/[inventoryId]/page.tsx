'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPharmacies } from '@/lib/db/queries';

interface Params {
  id: string;
  inventoryId: string;
}

export default function EditInventoryPage({ params }: { params: Params }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    price: 0,
    stock: 0
  });

  const pharmacy = pharmacies.find((p) => p.id === params.id);
  const inventoryItem = pharmacyInventory.find((i) => i.id === params.inventoryId);
  const medicine = inventoryItem ? medicines[inventoryItem.medicineId] : null;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/pharma/signin');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (inventoryItem) {
      setFormData({
        price: inventoryItem.price,
        stock: inventoryItem.stock
      });
      setLoading(false);
    }
  }, [inventoryItem]);

  if (!pharmacy || !inventoryItem || !medicine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Médicament non trouvé</h1>
          <Link
            href={`/pharma/inventory/${params.id}`}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Retour à l'inventaire
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    alert(`Prix et stock du médicament mis à jour pour ${pharmacy.name}`);
    router.push(`/pharma/inventory/${params.id}`);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link
          href={`/pharma/inventory/${params.id}`}
          className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block"
        >
          ← Retour à l'inventaire
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Éditer: {medicine.name}
          </h1>
          <p className="text-gray-600 mb-6">
            Pharmacie: <span className="font-semibold">{pharmacy.name}</span>
          </p>

          {/* Medicine Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Dosage</p>
                <p className="font-semibold text-gray-800">{medicine.dosage}</p>
              </div>
              <div>
                <p className="text-gray-500">Forme</p>
                <p className="font-semibold text-gray-800">{medicine.form}</p>
              </div>
              <div>
                <p className="text-gray-500">Fabricant</p>
                <p className="font-semibold text-gray-800">{medicine.manufacturer}</p>
              </div>
              <div>
                <p className="text-gray-500">Description</p>
                <p className="font-semibold text-gray-800 line-clamp-2">{medicine.description}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Price */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Prix (FCFA)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Quantité en stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.stock === 0
                  ? 'Rupture'
                  : formData.stock < 20
                  ? '⚠️ Stock limité'
                  : '✓ En stock'}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 p-4 rounded-lg my-8">
            <p className="text-gray-700">
              <span className="font-semibold">Résumé:</span> {medicine.name} |{' '}
              {formData.price.toLocaleString()} FCFA | {formData.stock} unités en stock
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Enregistrer
            </button>
            <Link
              href={`/pharma/inventory/${params.id}`}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition text-center"
            >
              Annuler
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
