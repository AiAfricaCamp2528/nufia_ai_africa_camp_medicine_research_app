"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { medicines } from "@/lib/mocks/medicines";

const EditMedicine = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const params = useParams();
  const medicineId = parseInt(params.id as string, 10);

  const medicine = medicines[medicineId];
  const [formData, setFormData] = useState({
    name: medicine?.name || "",
    dosage: medicine?.dosage || "",
    form: medicine?.form || "",
    description: medicine?.description || "",
    manufacturer: medicine?.manufacturer || "",
    price: medicine?.price || 0,
    availability: medicine?.availability || "in_stock",
  });

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/pharma/signin");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !medicine) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Modifications enregistrées !\n\nNote: Cette démo ne persiste que les données en mémoire.");
    router.push("/pharma/medicines");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Éditer un médicament</h1>
              <p className="text-gray-600 mt-1">{medicine.name}</p>
            </div>
            <Link href="/pharma/medicines" className="text-blue-600 hover:text-blue-800 font-semibold">
              ← Retour
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nom du médicament</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Forme</label>
                <input
                  type="text"
                  name="form"
                  value={formData.form}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Fabricant</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Prix (FCFA)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Disponibilité</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                >
                  <option value="in_stock">En stock</option>
                  <option value="low_stock">Stock limité</option>
                  <option value="out_of_stock">Rupture</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Enregistrer les modifications
              </button>
              <Link
                href="/pharma/medicines"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditMedicine;
