"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { medicines } from "@/lib/mocks/medicines";

const PharmacistMedicines = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/pharma/signin");
    }
  }, [isLoggedIn, router]);

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des médicaments</h1>
              <p className="text-gray-600 mt-1">Visualisez et gérez votre inventaire</p>
            </div>
            <Link href="/pharma/dashboard" className="text-blue-600 hover:text-blue-800 font-semibold">
              ← Tableau de bord
            </Link>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          />
        </div>

        {/* Medicines Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Dosage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Forme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Fabricant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Disponibilité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((med, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{med.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{med.dosage}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{med.form}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{med.manufacturer}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{med.price} FCFA</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        med.availability === "in_stock"
                          ? "bg-green-100 text-green-800"
                          : med.availability === "low_stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {med.availability === "in_stock"
                        ? "En stock"
                        : med.availability === "low_stock"
                        ? "Stock limité"
                        : "Rupture"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Link
                      href={`/pharma/medicines/${index}/details`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Détails
                    </Link>
                    <Link
                      href={`/pharma/medicines/${index}/edit`}
                      className="text-green-600 hover:text-green-800 font-semibold"
                    >
                      Éditer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucun médicament trouvé</p>
          </div>
        )}

        <div className="mt-8 text-center text-gray-600">
          <p>Total: {filteredMedicines.length} médicaments</p>
        </div>
      </main>
    </div>
  );
};

export default PharmacistMedicines;
