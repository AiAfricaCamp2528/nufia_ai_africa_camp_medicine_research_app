"use client";

import React from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PharmacistDashboard = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/pharma/signin");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/pharma/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600">{user.pharmacyName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Welcome Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-5xl mb-4">👋</div>
            <h3 className="text-xl font-bold mb-2">Bienvenue {user.name}</h3>
            <p className="text-gray-600">Gérez votre inventaire de médicaments facilement</p>
          </div>

          {/* Medicines Card */}
          <Link href="/pharma/medicines">
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition">
              <div className="text-5xl mb-4">💊</div>
              <h3 className="text-xl font-bold mb-2">Gérer les médicaments</h3>
              <p>Visualiser et modifier votre stock</p>
            </div>
          </Link>

          {/* Inventory Card */}
          <Link href="/pharma/select-pharmacy">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">Inventaire par pharmacie</h3>
              <p>Gérer l&apos;inventaire de vos pharmacies</p>
            </div>
          </Link>

          {/* Settings Card */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-5xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold mb-2">Paramètres</h3>
            <p>Configurer votre profil pharmacien</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Informations de votre pharmacie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-600 text-sm">Nom</p>
              <p className="text-2xl font-bold text-gray-900">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pharmacie</p>
              <p className="text-2xl font-bold text-gray-900">{user.pharmacyName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-lg font-mono text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Rôle</p>
              <p className="text-2xl font-bold text-green-600">Pharmacien</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/pharma/medicines"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
            >
              → Voir les médicaments
            </Link>
            <Link
              href="/pharma/parameters"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              ⚙️ Paramètres du compte
            </Link>
            <Link
              href="/home"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition"
            >
              ← Retour à la recherche
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PharmacistDashboard;
