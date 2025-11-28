'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { medicines } from '@/lib/mocks/medicines';
import { pharmacies } from '@/lib/mocks/pharmacies';
import { getMedicinesByPharmacy } from '@/lib/mocks/pharmacyInventory';

export default function DashboardPage() {
  const stats = useMemo(() => {
    const totalMedicines = medicines.length;
    const totalPharmacies = pharmacies.length;
    const medicinesInStock = medicines.filter((m) => m.availability === 'in_stock').length;
    const medicinesLowStock = medicines.filter((m) => m.availability === 'low_stock').length;

    return {
      totalMedicines,
      totalPharmacies,
      medicinesInStock,
      medicinesLowStock,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Tableau de Bord
          </h1>
          <p className="text-gray-600 text-lg">Gestion de votre plateforme sanitaire</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Medicines Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-8 hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">💊</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"></div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Médicaments</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {stats.totalMedicines}
            </p>
            <p className="text-xs text-gray-500 mt-3">{stats.medicinesInStock} en stock</p>
          </div>

          {/* Total Pharmacies Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-8 hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">🏥</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-20"></div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Pharmacies</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              {stats.totalPharmacies}
            </p>
            <p className="text-xs text-gray-500 mt-3">Partenaires actifs</p>
          </div>

          {/* Stock Status Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-8 hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">📦</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-20"></div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">En Stock</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              {stats.medicinesInStock}
            </p>
            <p className="text-xs text-gray-500 mt-3">{Math.round((stats.medicinesInStock / stats.totalMedicines) * 100)}% du total</p>
          </div>

          {/* Low Stock Alert Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-8 hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">⚠️</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-20"></div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Stock Limité</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              {stats.medicinesLowStock}
            </p>
            <p className="text-xs text-gray-500 mt-3">À réapprovisionner</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Actions Rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/home"
                  className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  👀 Voir tous les médicaments
                </Link>
                <Link
                  href="/pharmacies"
                  className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  🏥 Voir les pharmacies
                </Link>
                <button className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105">
                  ➕ Ajouter un médicament
                </button>
                <button className="bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-4 px-6 rounded-xl font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105">
                  ➕ Ajouter une pharmacie
                </button>
              </div>
            </div>

            {/* Medicines List */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">💊 Médicaments Disponibles</h2>
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                  {stats.totalMedicines}
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {medicines.slice(0, 10).map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 rounded-lg border border-blue-100/50 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{med.name}</p>
                      <p className="text-sm text-gray-600">
                        {med.dosage} • {med.form} • {med.manufacturer}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-blue-600">{med.price} FCFA</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          med.availability === 'in_stock'
                            ? 'bg-green-100 text-green-700'
                            : med.availability === 'low_stock'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {med.availability === 'in_stock'
                          ? '✓ En stock'
                          : med.availability === 'low_stock'
                          ? '⚠ Limité'
                          : '✗ Rupture'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/home"
                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition text-center block"
              >
                Voir tous les médicaments →
              </Link>
            </div>
          </div>

          {/* Right Column - Pharmacies */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-8 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">🏥 Pharmacies</h2>
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                {stats.totalPharmacies}
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {pharmacies.map((pharmacy) => {
                const pharmMeds = getMedicinesByPharmacy(pharmacy.id, medicines);
                const inStock = pharmMeds.filter((m) => m.pharmacyStock > 0).length;

                return (
                  <div
                    key={pharmacy.id}
                    className="p-4 bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 rounded-lg border border-green-100/50 transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{pharmacy.name}</p>
                        <p className="text-xs text-gray-600">📍 {pharmacy.location}</p>
                      </div>
                      <span className="text-lg font-bold text-green-600">{inStock}/{pharmMeds.length}</span>
                    </div>
                    <p className="text-xs text-gray-500">📞 {pharmacy.phone}</p>
                  </div>
                );
              })}
            </div>

            <Link
              href="/pharmacies"
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold transition text-center block"
            >
              Voir les détails →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>Dashboard • Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>
    </div>
  );
}
