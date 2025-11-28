'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PharmacyCard from '@/components/PharmacyCard';
import { medicines } from '@/lib/mocks/medicines';
import { pharmacies } from '@/lib/mocks/pharmacies';
import { getPharmaciesWithMedicine } from '@/lib/mocks/pharmacyInventory';

interface Params {
  id: string;
}

export default function MedicinePharmaciesPage({ params }: { params: Params }) {
  const medicineId = parseInt(params.id, 10);
  const medicine = Number.isFinite(medicineId) && medicines[medicineId] ? medicines[medicineId] : null;

  if (!medicine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Médicament non trouvé</h1>
            <Link
              href="/home"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
            >
              Retour à la recherche
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pharmaciesWithMedicine = getPharmaciesWithMedicine(medicineId, pharmacies);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href={`/home/details/${medicineId}`}
          className="mb-6 inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Retour aux détails
        </Link>

        {/* Medicine Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-black/5 rounded-md flex items-center justify-center">
              <Image
                src="/images/hand.png"
                alt={medicine.name}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{medicine.name}</h1>
              <p className="text-gray-600 mb-4">
                {medicine.dosage} · {medicine.form} · {medicine.manufacturer}
              </p>
              <p className="text-gray-700">{medicine.description}</p>
            </div>
          </div>
        </div>

        {/* Pharmacies Available */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Disponible dans {pharmaciesWithMedicine.length} pharmacie
            {pharmaciesWithMedicine.length !== 1 ? 's' : ''}
          </h2>

          {pharmaciesWithMedicine.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pharmaciesWithMedicine.map((pharmacy) => {
                  return (
                    <PharmacyCard
                      key={pharmacy.id}
                      pharmacy={{ id: pharmacy.id, name: pharmacy.name, address: pharmacy.address, location: pharmacy.location, city: pharmacy.city, phone: pharmacy.phone, openingHours: pharmacy.openingHours, description: pharmacy.description }}
                      href={`/pharmacies/${pharmacy.id}?key=${encodeURIComponent(String(medicineId))}`}
                      mode="price"
                      price={pharmacy.medicinePrice.toLocaleString() + ' FCFA'}
                      stock={pharmacy.medicineStock}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">
                Ce médicament n&apos;est actuellement disponible dans aucune pharmacie
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
