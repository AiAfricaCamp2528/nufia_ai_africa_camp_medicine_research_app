"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PharmacistParameters = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    pharmacyName: user?.pharmacyName || "",
    email: user?.email || "",
  });

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/pharma/signin");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Profil mis à jour !\n\nNote: Cette démo ne persiste les données que localement.");
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/pharma/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Paramètres du compte</h1>
            <Link href="/pharma/dashboard" className="text-blue-600 hover:text-blue-800 font-semibold">
              ← Tableau de bord
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Informations du profil</h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Modifier
              </button>
            )}
          </div>

          {editMode ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nom de la pharmacie</label>
                <input
                  type="text"
                  name="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm">Nom complet</p>
                  <p className="text-xl font-semibold text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Pharmacie</p>
                  <p className="text-xl font-semibold text-gray-900">{user.pharmacyName}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-lg font-mono text-gray-900">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sécurité</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Changer le mot de passe
          </button>
        </div>

        {/* Logout Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Session</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
          >
            Se déconnecter
          </button>
        </div>
      </main>
    </div>
  );
};

export default PharmacistParameters;
