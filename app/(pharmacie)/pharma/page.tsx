"use client";

import React from "react";
import Link from "next/link";

const PharmacieHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-6">💊</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Espace Pharmacien
        </h1>
        <p className="text-gray-600 mb-8">
          Gérez votre inventaire et vos médicaments
        </p>

        <div className="space-y-4">
          <Link
            href="/pharma/signin"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Se connecter
          </Link>
          <Link
            href="/pharma/signup"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Créer un compte
          </Link>
          <Link
            href="/home"
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Retour à l'accueil
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3 font-semibold">
            Compte de démo disponible :
          </p>
          <div className="bg-gray-100 rounded p-3 text-left text-sm">
            <p>
              <strong>Email:</strong> pharma@test.com
            </p>
            <p>
              <strong>Mot de passe:</strong> password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacieHome;
