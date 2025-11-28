'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPharmacies, getMedicinesByPharmacy } from '@/lib/db/queries';

interface Params {
  id: string;
}

export default function PharmacyInventoryPage({ params }: { params: Params }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/pharma/signin');
    }
  }, [isLoggedIn, router]);

  const pharmacy = pharmacies.find((p) => p.id === params.id);

  if (!pharmacy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Pharmacie non trouvée</h1>
          <Link
            href="/pharma/select-pharmacy"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Sélectionner une pharmacie
          </Link>
        </div>
      </div>
    );
  }

  const pharmacyMedicines = useMemo(() => {
    const allMeds = getMedicinesByPharmacy(pharmacy.id, medicines);
    if (!searchQuery.trim()) return allMeds;

    const query = searchQuery.toLowerCase();
    return allMeds.filter(
      (med) =>
        med.name.toLowerCase().includes(query) ||
        med.manufacturer.toLowerCase().includes(query) ||
        med.dosage.toLowerCase().includes(query)
    );
  }, [pharmacy.id, searchQuery]);

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-700', text: 'Rupture' };
    if (stock < 20) return { color: 'bg-orange-100 text-orange-700', text: 'Stock limité' };
    return { color: 'bg-green-100 text-green-700', text: 'En stock' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/pharma/dashboard"
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block"
          >
            ← Retour au tableau de bord
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Gestion de l'inventaire - {pharmacy.name}
          </h1>
          <p className="text-gray-600">
            Localité: <span className="font-semibold">{pharmacy.location}</span> | Ville:{' '}
            <span className="font-semibold">{pharmacy.city}</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher un médicament par nom, dosage ou fabricant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-gray-600">
          {pharmacyMedicines.length} médicament
          {pharmacyMedicines.length !== 1 ? 's' : ''} trouvé
          {pharmacyMedicines.length !== 1 ? 's' : ''}
        </div>

        {/* Table */}
        {pharmacyMedicines.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Nom</th>
                    <th className="px-4 py-3 text-left font-semibold">Dosage</th>
                    <th className="px-4 py-3 text-left font-semibold">Forme</th>
                    <th className="px-4 py-3 text-left font-semibold">Fabricant</th>
                    <th className="px-4 py-3 text-right font-semibold">Prix (FCFA)</th>
                    <th className="px-4 py-3 text-center font-semibold">Stock</th>
                    <th className="px-4 py-3 text-center font-semibold">Statut</th>
                    <th className="px-4 py-3 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pharmacyMedicines.map((med, idx) => {
                    const stockStatus = getStockStatus(med.pharmacyStock);
                    const medicineIdx = medicines.findIndex((m) => m.name === med.name);
                    return (
                      <tr key={med.inventoryId} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-800">{med.name}</td>
                        <td className="px-4 py-3 text-gray-600">{med.dosage}</td>
                        <td className="px-4 py-3 text-gray-600">{med.form}</td>
                        <td className="px-4 py-3 text-gray-600">{med.manufacturer}</td>
                        <td className="px-4 py-3 text-right font-bold text-blue-600">
                          {med.pharmacyPrice.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700">
                          {med.pharmacyStock}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${stockStatus.color}`}
                          >
                            {stockStatus.text}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <Link
                            href={`/home/details/${medicineIdx}`}
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                          >
                            Détails
                          </Link>
                          <Link
                            href={`/pharma/inventory/${params.id}/edit/${med.inventoryId}`}
                            className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                          >
                            Éditer
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? `Aucun médicament trouvé pour "${searchQuery}"`
                : 'Aucun médicament disponible'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
