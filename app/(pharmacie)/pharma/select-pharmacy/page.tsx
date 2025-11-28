'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PharmacySelectPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(
    user?.pharmacyId || null
  );

  // Mock pharmacies for selection
  const pharmacies = [
    {
      id: 'pharm-001',
      name: 'Pharmacie Central',
      location: 'Plateau, Abidjan'
    },
    {
      id: 'pharm-002',
      name: 'Pharmacie Santé Plus',
      location: 'Cocody, Abidjan'
    },
    {
      id: 'pharm-003',
      name: 'Pharmacie Étoile',
      location: 'Riviera, Abidjan'
    }
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/pharma/signin');
    }
  }, [isLoggedIn, router]);

  const handleSelectPharmacy = () => {
    if (selectedPharmacy) {
      // Store pharmacy selection in localStorage
      localStorage.setItem('selected_pharmacy', selectedPharmacy);
      router.push(`/pharma/inventory/${selectedPharmacy}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link
          href="/pharma/dashboard"
          className="mb-6 inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Retour au tableau de bord
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sélectionner votre pharmacie
          </h1>
          <p className="text-gray-600">
            Choisissez la pharmacie pour laquelle vous souhaitez gérer l'inventaire
          </p>
        </div>

        {/* Pharmacy Selection */}
        <div className="space-y-4">
          {pharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              onClick={() => setSelectedPharmacy(pharmacy.id)}
              className={`p-6 rounded-lg cursor-pointer transition border-2 ${
                selectedPharmacy === pharmacy.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedPharmacy === pharmacy.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedPharmacy === pharmacy.id && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{pharmacy.name}</h3>
                  <p className="text-sm text-gray-600">{pharmacy.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleSelectPharmacy}
            disabled={!selectedPharmacy}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              selectedPharmacy
                ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuer
          </button>
          <Link
            href="/pharma/dashboard"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition text-center"
          >
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}
