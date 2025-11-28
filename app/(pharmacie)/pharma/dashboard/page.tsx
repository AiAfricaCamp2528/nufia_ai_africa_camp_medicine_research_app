"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlassSurface from "@/components/GlassSurface";
import { getPharmacyInventory } from "@/lib/api/inventory";

interface Pharmacy {
  id: string;
  name: string;
  email: string;
  city: string;
  address: string;
  phone?: string;
  opening_hours?: string;
  description?: string;
  [key: string]: any;
}

interface Stats {
  totalMedicines: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

const PharmacistDashboard = () => {
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalMedicines: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if pharmacy is logged in
    const pharmacyAuth = localStorage.getItem('pharmacyAuth');
    if (!pharmacyAuth) {
      router.push("/pharma/signin");
      return;
    }

    try {
      const pharmacyData: Pharmacy = JSON.parse(pharmacyAuth);
      setPharmacy(pharmacyData);

      // Load inventory stats
      getPharmacyInventory(pharmacyData.id)
        .then((inventory) => {
          const total = inventory.length;
          const inStock = inventory.filter(item => item.availability === 'in_stock').length;
          const lowStock = inventory.filter(item => item.availability === 'low_stock').length;
          const outOfStock = inventory.filter(item => item.availability === 'out_of_stock').length;

          setStats({
            totalMedicines: total,
            inStock,
            lowStock,
            outOfStock,
          });
        })
        .catch((err) => {
          console.error('Failed to load inventory stats:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
      console.error('Failed to load pharmacy:', e);
      router.push("/pharma/signin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('pharmacyAuth');
    router.push("/pharma/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <p className="text-gray-600 text-lg">Chargement...</p>
      </div>
    );
  }

  if (!pharmacy) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>

      {/* Header with Navbar */}
      <header className="relative z-20 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-[800]">
              Tableau de bord
              <Image
                src="/images/star.png"
                alt="star"
                width={50}
                height={50}
                className="inline-block ml-2 -mt-2"
              />
            </h1>
            <p className="text-black/40 ml-4">{pharmacy.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300 shadow-lg hover:shadow-xl"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="text-md text-black/50 mb-6">
            Bienvenue dans votre <span className="font-semibold text-black/70">espace pharmacie</span>
          </div>

          <GlassSurface borderRadius={30} blur={11} opacity={0.85} className="!w-full !h-auto !p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="text-6xl">👋</div>
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">Bienvenue, {pharmacy.name}!</h2>
                <p className="text-black/60">Gérez facilement votre inventaire de médicaments</p>
              </div>
            </div>
          </GlassSurface>
        </div>

        {/* Statistics Section */}
        <div className="mb-12">
          <div className="text-md text-black/50 mb-6">
            <span className="font-semibold text-black/70">Statistiques de votre inventaire</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Medicines */}
            <GlassSurface borderRadius={25} blur={11} opacity={0.85} className="!w-full !h-auto !p-6">
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Total Médicaments</p>
                <p className="text-4xl font-bold text-black">{stats.totalMedicines}</p>
                <p className="text-xs text-black/40">Dans votre inventaire</p>
              </div>
            </GlassSurface>

            {/* In Stock */}
            <GlassSurface borderRadius={25} blur={11} opacity={0.85} className="!w-full !h-auto !p-6">
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">En Stock</p>
                <p className="text-4xl font-bold text-green-600">{stats.inStock}</p>
                <p className="text-xs text-black/40">Disponibles</p>
              </div>
            </GlassSurface>

            {/* Low Stock */}
            <GlassSurface borderRadius={25} blur={11} opacity={0.85} className="!w-full !h-auto !p-6">
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Stock Limité</p>
                <p className="text-4xl font-bold text-orange-500">{stats.lowStock}</p>
                <p className="text-xs text-black/40">À réapprovisionner</p>
              </div>
            </GlassSurface>

            {/* Out of Stock */}
            <GlassSurface borderRadius={25} blur={11} opacity={0.85} className="!w-full !h-auto !p-6">
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Rupture</p>
                <p className="text-4xl font-bold text-red-500">{stats.outOfStock}</p>
                <p className="text-xs text-black/40">Indisponibles</p>
              </div>
            </GlassSurface>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <div className="text-md text-black/50 mb-6">
            <span className="font-semibold text-black/70">Actions rapides</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Medicines Card */}
            <Link href="/pharma/medicines" className="group cursor-pointer">
              <GlassSurface borderRadius={25} blur={11} opacity={0.8} className="!w-full !h-[200px] !p-6 group-hover:opacity-100 transition">
                <div className="h-full flex flex-col justify-between">
                  <div className="text-5xl">💊</div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">Gérer les médicaments</h3>
                    <p className="text-black/60 text-sm">Visualiser et modifier votre stock</p>
                  </div>
                  <div className="text-green-600 font-semibold text-sm group-hover:translate-x-1 transition">→ Accéder</div>
                </div>
              </GlassSurface>
            </Link>

            {/* Settings Card */}
            <Link href="/pharma/parameters" className="group cursor-pointer">
              <GlassSurface borderRadius={25} blur={11} opacity={0.8} className="!w-full !h-[200px] !p-6 group-hover:opacity-100 transition">
                <div className="h-full flex flex-col justify-between">
                  <div className="text-5xl">⚙️</div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">Paramètres</h3>
                    <p className="text-black/60 text-sm">Configurer votre profil pharmacie</p>
                  </div>
                  <div className="text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition">→ Accéder</div>
                </div>
              </GlassSurface>
            </Link>
          </div>
        </div>

        {/* Pharmacy Information Section */}
        <div>
          <div className="text-md text-black/50 mb-6">
            <span className="font-semibold text-black/70">Informations de votre pharmacie</span>
          </div>

          <GlassSurface borderRadius={30} blur={11} opacity={0.85} className="!w-full !h-auto !p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Nom de la pharmacie</p>
                <p className="text-2xl font-bold text-black">{pharmacy.name}</p>
              </div>

              {/* City */}
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Ville</p>
                <p className="text-2xl font-bold text-black">{pharmacy.city}</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Email</p>
                <p className="text-lg font-mono text-black break-all">{pharmacy.email}</p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Téléphone</p>
                <p className="text-lg font-bold text-black">{pharmacy.phone || 'Non spécifié'}</p>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Adresse</p>
                <p className="text-lg text-black">{pharmacy.address}</p>
              </div>

              {/* Opening Hours */}
              <div className="space-y-2">
                <p className="text-black/50 text-sm font-medium">Horaires</p>
                <p className="text-lg text-black">{pharmacy.opening_hours || 'Non définis'}</p>
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2 lg:col-span-2">
                <p className="text-black/50 text-sm font-medium">Description</p>
                <p className="text-lg text-black">{pharmacy.description || 'Aucune description'}</p>
              </div>
            </div>
          </GlassSurface>
        </div>
      </main>
    </div>
  );
};

export default PharmacistDashboard;
