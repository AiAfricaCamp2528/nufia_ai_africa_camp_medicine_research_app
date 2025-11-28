'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { pharmacies } from '@/lib/mocks/pharmacies';
import { getMedicinesByPharmacy } from '@/lib/mocks/pharmacyInventory';
import { medicines } from '@/lib/mocks/medicines';
import { Key } from 'lucide-react';




export default function PharmacyDetailsPage({ params }  ) {
  // lire la key passée en query: /pharmacies/pharm-001?key=maValeur
    const { id } = React.use(params)


  const pharmacy = pharmacies.find((p) => p.id === id);

  if (!pharmacy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Pharmacie non trouvée</h1>
          <p className="text-gray-600 mb-6">
            La pharmacie que vous recherchez n'existe pas.
          </p>
          <Link
            href="/pharmacies"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Retour aux pharmacies
          </Link>
        </div>
      </div>
    );
  }

  const pharmacyMedicines = useMemo(() => {
    return getMedicinesByPharmacy(pharmacy.id, medicines);
  }, [pharmacy.id]);

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-700', text: 'Rupture' };
    if (stock < 20) return { color: 'bg-orange-100 text-orange-700', text: 'Stock limité' };
    return { color: 'bg-green-100 text-green-700', text: 'En stock' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/pharmacies"
          className="mb-6 inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Retour aux pharmacies
        </Link>

        {/* Pharmacy Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {pharmacy.name}
              </h1>
              <p className="text-gray-600 mb-4">{pharmacy.description}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl mb-2">💊</p>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-800">{pharmacyMedicines.length}</span>
                <br />
                Médicaments en stock
              </p>
            </div>
          </div>

          {/* Pharmacy Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase mb-1">📍 Localité</p>
              <p className="font-semibold text-gray-800">{pharmacy.location}</p>
              <p className="text-sm text-gray-600">{pharmacy.city}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase mb-1">📞 Téléphone</p>
              <p className="font-semibold text-gray-800">{pharmacy.phone}</p>
              <p className="text-sm text-gray-500">Appel gratuit</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase mb-1">📧 Email</p>
              <p className="font-semibold text-gray-800 text-sm break-all">{pharmacy.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase mb-1">🕐 Horaires</p>
              <p className="font-semibold text-gray-800">{pharmacy.openingHours}</p>
              <p className="text-sm text-green-600">Ouvert maintenant</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase mb-1">📍 Coordonnées GPS</p>
              <p className="font-semibold text-gray-800 text-sm">
                {pharmacy.latitude.toFixed(4)}<br />
                {pharmacy.longitude.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Adresse complète:</span> {pharmacy.address}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-6 flex-wrap">
            <a
              href={`tel:${pharmacy.phone.replace(/\s/g, '')}`}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              📞 Appeler
            </a>
            <a
              href={`mailto:${pharmacy.email}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              📧 Envoyer un email
            </a>
            <a
              href={`https://maps.google.com/?q=${pharmacy.latitude},${pharmacy.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              📍 Voir sur la carte
            </a>
          </div>
        </div>

        {/* Medicines Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Médicaments disponibles ({pharmacyMedicines.length})
          </h2>

          {pharmacyMedicines.length > 0 ? (
            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-sm text-gray-600">En stock</p>
                  <p className="text-2xl font-bold text-green-600">
                    {pharmacyMedicines.filter((m) => m.pharmacyStock > 0).length}
                  </p>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                  <p className="text-sm text-gray-600">Stock limité</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {pharmacyMedicines.filter((m) => m.pharmacyStock > 0 && m.pharmacyStock < 20).length}
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-sm text-gray-600">Rupture</p>
                  <p className="text-2xl font-bold text-red-600">
                    {pharmacyMedicines.filter((m) => m.pharmacyStock === 0).length}
                  </p>
                </div>
              </div>

              {/* Medicines Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pharmacyMedicines.map((medicine) => {
                  const stockStatus = getStockStatus(medicine.pharmacyStock);
                  const medicineIdx = medicines.findIndex((m) => m.name === medicine.name);
                  return (
                    <div key={medicine.inventoryId} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                      {/* Card Header with gradient */}
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                      <div className="p-5">
                        {/* Medicine Name */}
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {medicine.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {medicine.dosage} · {medicine.form}
                        </p>

                        {/* Manufacturer */}
                        <p className="text-xs text-gray-600 mb-3">
                          <span className="font-semibold">Fabricant:</span> {medicine.manufacturer}
                        </p>

                        {/* Description */}
                        <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
                          {medicine.description}
                        </p>

                        {/* Price Box */}
                        <div className="bg-blue-50 rounded-lg p-3 mb-3">
                          <p className="text-xs text-gray-600 mb-1">Prix</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {medicine.pharmacyPrice.toLocaleString()} FCFA
                          </p>
                        </div>

                        {/* Stock Info */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Quantité disponible:</span>
                            <span className="text-lg font-bold text-gray-800">
                              {medicine.pharmacyStock} unités
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${stockStatus.color}`}
                            >
                              {stockStatus.text}
                            </span>
                            {medicine.pharmacyStock > 0 && (
                              <span className="text-xs text-gray-500">
                                Disponible immédiatement
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Indications */}
                        {medicine.indications && medicine.indications.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-700 mb-1">Indications:</p>
                            <ul className="text-xs text-gray-600 space-y-0.5">
                              {medicine.indications.slice(0, 2).map((indication, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-1">•</span>
                                  <span>{indication}</span>
                                </li>
                              ))}
                              {medicine.indications.length > 2 && (
                                <li className="text-blue-600 font-medium">
                                  +{medicine.indications.length - 2} indication(s) supplémentaire(s)
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link
                            href={`/home/details/${medicineIdx}`}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center font-semibold text-sm transition"
                          >
                            Détails complets
                          </Link>
                          {medicine.pharmacyStock > 0 && (
                            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold text-sm transition">
                              Ajouter
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">Aucun médicament disponible actuellement</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
