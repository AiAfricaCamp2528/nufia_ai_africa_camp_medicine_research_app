"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlassSurface from "@/components/GlassSurface";
import { updatePharmacy } from "@/lib/api/pharmacies";

interface Pharmacy {
  id: string;
  name: string;
  email: string;
  city: string;
  address: string;
  phone?: string;
  location?: string;
  opening_hours?: string;
  description?: string;
  [key: string]: any;
}

const PharmacistParameters = () => {
  const [pharmacy, setPharmacy] = React.useState<Pharmacy | null>(null);
  const [formData, setFormData] = React.useState<Pharmacy | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const pharmacyAuth = localStorage.getItem('pharmacyAuth');
    if (!pharmacyAuth) {
      router.push("/pharma/signin");
      return;
    }

    try {
      const pharmacyData: Pharmacy = JSON.parse(pharmacyAuth);
      setPharmacy(pharmacyData);
      setFormData(pharmacyData);
    } catch (e) {
      console.error('Failed to load pharmacy:', e);
      router.push("/pharma/signin");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev ? ({
      ...prev,
      [name]: value,
    }) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pharmacy || !formData) return;

    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const updated = await updatePharmacy(pharmacy.id, {
        name: formData.name,
        city: formData.city,
        address: formData.address,
        phone: formData.phone,
        location: formData.location,
        opening_hours: formData.opening_hours,
        description: formData.description,
      });

      // Update localStorage
      localStorage.setItem('pharmacyAuth', JSON.stringify(updated));
      setPharmacy(updated);
      setFormData(updated);
      setSuccess(true);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Failed to update pharmacy", error);
      setError("Erreur lors de la mise à jour. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

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

  if (!pharmacy || !formData) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>

      {/* Header */}
      <header className="relative z-20 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-[800]">
              Paramètres
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
          <Link
            href="/pharma/dashboard"
            className="text-black/60 hover:text-black font-semibold transition"
          >
            ← Tableau de bord
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Success Message */}
        {success && (
          <div className="mb-6">
            <GlassSurface borderRadius={25} blur={11} opacity={0.85} className="!w-full !h-auto !p-4">
              <div className="flex items-center gap-3 text-green-600">
                <span className="text-2xl">✅</span>
                <p className="font-semibold">Vos informations ont été mises à jour avec succès !</p>
              </div>
            </GlassSurface>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="mb-12">
          <div className="text-md text-black/50 mb-6">
            <span className="font-semibold text-black/70">Informations de la pharmacie</span>
          </div>

          <form onSubmit={handleSubmit}>
            <GlassSurface borderRadius={30} blur={11} opacity={0.85} className="!w-full !h-auto !p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-black/70 text-sm font-semibold">Nom de la pharmacie *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/50 rounded-lg border border-black/10 focus:outline-none focus:border-green-500 transition"
                    required
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-black/70 text-sm font-semibold">Ville *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/50 rounded-lg border border-black/10 focus:outline-none focus:border-green-500 transition"
                    required
                  />
                </div>

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <label className="text-black/70 text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 bg-black/5 rounded-lg border border-black/10 cursor-not-allowed text-black/50"
                  />
                  <p className="text-xs text-black/40">L'email ne peut pas être modifié</p>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-black/70 text-sm font-semibold">Téléphone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/50 rounded-lg border border-black/10 focus:outline-none focus:border-green-500 transition"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-black/70 text-sm font-semibold">Adresse *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/50 rounded-lg border border-black/10 focus:outline-none focus:border-green-500 transition"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-black/70 text-sm font-semibold">Localisation</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/50 rounded-lg border border-black/10 focus:outline-none focus:border-green-500 transition"
                    placeholder="Ex: Près du marché central"
                  />
                </div>

                {/* Opening Hours */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-black/70 text-sm font-semibold">Heures d'ouverture</label>
                  <input
                    type="text"
                    name="opening_hours"
                    value={formData.opening_hours || ''}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/50 rounded-lg border border-black/10 focus:outline-none focus:border-green-500 transition"
                    placeholder="Ex: 08:00 - 22:00"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-black/70 text-sm font-semibold">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/50 rounded-lg border border-black/10 focus:outline-none focus:border-green-500 transition resize-none"
                    rows={4}
                    placeholder="Décrivez votre pharmacie..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Link
                  href="/pharma/dashboard"
                  className="px-8 py-3 text-black/60 hover:text-black font-semibold transition"
                >
                  Annuler
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 text-white px-8 py-3 rounded-full cursor-pointer hover:bg-green-700 duration-400 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg"
                >
                  {submitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </button>
              </div>
            </GlassSurface>
          </form>
        </div>

        {/* Security Section */}
        <div className="mb-12">
          <div className="text-md text-black/50 mb-6">
            <span className="font-semibold text-black/70">Sécurité</span>
          </div>

          <GlassSurface borderRadius={30} blur={11} opacity={0.85} className="!w-full !h-auto !p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Mot de passe</h3>
                <p className="text-black/60">Modifiez votre mot de passe de connexion</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition shadow-lg">
                Changer le mot de passe
              </button>
            </div>
          </GlassSurface>
        </div>

        {/* Logout Section */}
        <div>
          <div className="text-md text-black/50 mb-6">
            <span className="font-semibold text-black/70">Session</span>
          </div>

          <GlassSurface borderRadius={30} blur={11} opacity={0.85} className="!w-full !h-auto !p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Déconnexion</h3>
                <p className="text-black/60">Se déconnecter de votre compte pharmacie</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition shadow-lg"
              >
                Se déconnecter
              </button>
            </div>
          </GlassSurface>
        </div>
      </main>
    </div>
  );
};

export default PharmacistParameters;
