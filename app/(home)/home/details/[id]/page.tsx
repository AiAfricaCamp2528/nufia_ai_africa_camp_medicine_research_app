import React from "react";
import Image from "next/image";
import Link from "next/link";
import PharmacyCard from "@/components/PharmacyCard";
import { medicines } from "@/lib/mocks/medicines";
import { pharmacies } from "@/lib/mocks/pharmacies";
import { getPharmaciesWithMedicine } from "@/lib/mocks/pharmacyInventory";

const availabilityLabel = (a: typeof medicines[number]["availability"]) =>
  a === "in_stock"
    ? { text: "✓ Disponible", color: "text-green-600", badge: "bg-green-50 border-l-4 border-green-500" }
    : a === "low_stock"
    ? { text: "⚠ Stock limité", color: "text-orange-500", badge: "bg-orange-50 border-l-4 border-orange-500" }
    : { text: "✗ Rupture", color: "text-red-500", badge: "bg-red-50 border-l-4 border-red-500" };

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const medicineIndex = parseInt(id, 10); // Convertir string en nombre
  const med = Number.isFinite(medicineIndex) && medicines[medicineIndex] ? medicines[medicineIndex] : null;

  if (!med) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Médicament introuvable</h1>
            <p className="text-gray-600 mb-6">Aucun médicament correspondant à cet identifiant.</p>
            <Link href="/home" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              ← Retour à la recherche
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availability = availabilityLabel(med.availability);
  const pharmaciesWithMedicine = getPharmaciesWithMedicine(medicineIndex, pharmacies);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/home" className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-semibold">
          ← Retour à la recherche
        </Link>

        {/* Product Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center overflow-hidden">
                <Image src="/images/hand.png" alt={med.name} width={300} height={300} className="object-contain" />
              </div>
            </div>

            {/* Product Info */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{med.name}</h1>
                <div className="text-lg text-gray-600">
                  <span className="font-semibold">{med.dosage}</span> · <span>{med.form}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Fabriquant: {med.manufacturer}</div>
              </div>

              {/* Availability & Price */}
              <div className={`${availability.badge} p-4 rounded mb-6`}>
                <div className={`font-bold text-lg ${availability.color} mb-2`}>{availability.text}</div>
                <div className="text-3xl font-bold text-green-600">{med.price} FCFA</div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="font-bold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{med.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                  🛒 Ajouter au panier
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                  ❤️ Ajouter aux favoris
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Indications */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">📋 Indications</h3>
            <ul className="space-y-2">
              {med.indications.map((ind, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contre-indications */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-red-500 pb-2">⛔ Contre-indications</h3>
            <ul className="space-y-2">
              {med.contraindications.map((contra, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>{contra}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Side Effects */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-orange-500 pb-2">⚠️ Effets secondaires</h3>
            <ul className="space-y-2">
              {med.sideEffects.map((effect, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pharmacies Available Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🏥 Où trouver ce médicament? ({pharmaciesWithMedicine.length} pharmacie{pharmaciesWithMedicine.length !== 1 ? "s" : ""})
            </h2>
            <p className="text-gray-600">Découvrez tous les endroits où vous pouvez acheter ce médicament avec les prix et stocks disponibles.</p>
          </div>

          {pharmaciesWithMedicine.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pharmaciesWithMedicine.map((pharmacy) => (
                <PharmacyCard
                  key={pharmacy.id}
                  pharmacy={{
                    id: pharmacy.id,
                    name: pharmacy.name,
                    address: pharmacy.address,
                    location: pharmacy.location,
                    city: pharmacy.city,
                    phone: pharmacy.phone,
                    openingHours: pharmacy.openingHours,
                    description: pharmacy.description,
                  }}
                  href={`/pharmacies/${pharmacy.id}?key=${medicineIndex}`}
                  mode="price"
                  price={`${pharmacy.medicinePrice.toLocaleString()} FCFA`}
                  stock={pharmacy.medicineStock}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune pharmacie disponible</h3>
              <p className="text-gray-600">Ce médicament n&apos;est actuellement disponible dans aucune pharmacie. Revenez plus tard.</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <p className="text-gray-700">
            <span className="font-bold">💡 Conseil:</span> Les prix et stocks peuvent varier d&apos;une pharmacie à l&apos;autre. Cliquez sur une pharmacie pour voir tous les médicaments disponibles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;