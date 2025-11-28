'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { getPharmacies } from '@/lib/api/pharmacies';
import PharmacyCard from '@/components/PharmacyCard';

export default function PharmaciesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPharmacies = useMemo(() => {
    if (!searchQuery.trim()) return pharmacies;
    const query = searchQuery.toLowerCase();
    return pharmacies.filter(
      (pharm) =>
        pharm.name.toLowerCase().includes(query) ||
        pharm.city.toLowerCase().includes(query) ||
        pharm.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏥 Nos Pharmacies Partenaires
          </h1>
          <p className="text-gray-600 text-lg">
            Trouvez une pharmacie près de chez vous et consultez les médicaments disponibles
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par nom, ville ou localité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
            />
            <span className="absolute right-4 top-4 text-2xl">🔍</span>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-gray-700 font-semibold">
          {filteredPharmacies.length} pharmacie{filteredPharmacies.length !== 1 ? 's' : ''} trouvée
          {filteredPharmacies.length !== 1 ? 's' : ''}
        </div>

        {/* Pharmacies Grid */}
        {filteredPharmacies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPharmacies.map((pharmacy) => {
              const pharmacyMedicines = getMedicinesByPharmacy(pharmacy.id, medicines);

              return (
                <div key={pharmacy.id}>
                  <PharmacyCard
                    pharmacy={pharmacy}
                    href={`/pharmacies/${pharmacy.id}`}
                    mode="count"
                    productCount={pharmacyMedicines.length}
                    className="h-full"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">
              Aucune pharmacie trouvée pour &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <p className="text-gray-700">
            <span className="font-semibold">💡 Conseil:</span> Visitez la page de chaque pharmacie pour consulter les
            détails complets des médicaments disponibles, les prix spécifiques et le stock en temps réel.
          </p>
        </div>
      </div>
    </div>
  );
}
