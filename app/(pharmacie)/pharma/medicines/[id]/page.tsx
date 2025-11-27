"use client";

import React from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { medicines } from "@/lib/mocks/medicines";

const MedicineDetails = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const params = useParams();
  const medicineId = parseInt(params.id as string, 10);

  const medicine = medicines[medicineId];

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/pharma/signin");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !medicine) {
    return null;
  }

  const availabilityLabel =
    medicine.availability === "in_stock"
      ? { text: "En stock", color: "text-green-600" }
      : medicine.availability === "low_stock"
      ? { text: "Stock limité", color: "text-orange-500" }
      : { text: "Rupture", color: "text-red-500" };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Détails du médicament</h1>
            <Link href="/pharma/medicines" className="text-blue-600 hover:text-blue-800 font-semibold">
              ← Retour
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <Image src="/images/hand.png" alt={medicine.name} width={250} height={250} className="object-contain" />
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{medicine.name}</h2>
              <p className="text-gray-600 text-lg mb-6">
                {medicine.dosage} · {medicine.form} · <span className="font-semibold">{medicine.manufacturer}</span>
              </p>

              {/* Price and Availability */}
              <div className="flex items-center gap-8 mb-8 pb-8 border-b">
                <div>
                  <p className="text-gray-600 text-sm">Prix</p>
                  <p className="text-4xl font-bold text-gray-900">{medicine.price} FCFA</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Disponibilité</p>
                  <p className={`text-2xl font-bold ${availabilityLabel.color}`}>{availabilityLabel.text}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{medicine.description}</p>
              </div>

              {/* Indications */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Indications</h3>
                <ul className="list-disc list-inside space-y-2">
                  {medicine.indications.map((indication, idx) => (
                    <li key={idx} className="text-gray-700">
                      {indication}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contraindications */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Contre-indications</h3>
                <ul className="list-disc list-inside space-y-2">
                  {medicine.contraindications.map((contraindication, idx) => (
                    <li key={idx} className="text-gray-700">
                      {contraindication}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side Effects */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Effets secondaires</h3>
                <ul className="list-disc list-inside space-y-2">
                  {medicine.sideEffects.map((effect, idx) => (
                    <li key={idx} className="text-gray-700">
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Link
                  href={`/pharma/medicines/${medicineId}/edit`}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Éditer
                </Link>
                <Link
                  href="/pharma/medicines"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Retour à la liste
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicineDetails;
