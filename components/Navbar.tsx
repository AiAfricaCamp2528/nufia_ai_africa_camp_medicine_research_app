"use client";

import React, { useState, useEffect } from "react";
import GlassSurface from "./GlassSurface";
import Link from "next/link";

const Navbar = () => {
  const [isPharmacyLoggedIn, setIsPharmacyLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si une pharmacie est connectée
    const pharmacyAuth = localStorage.getItem('pharmacyAuth');
    setIsPharmacyLoggedIn(!!pharmacyAuth);
  }, []);

  return (
    <div
      className="absolute w-full px-14 py-6 flex items-center justify-between z-100"
    >
      <Link href="/" className="text-xl font-bold duration-300 hover:text-green-500">Médiloc</Link>
      <div className="flex items-center justify-end gap-6">
        {isPharmacyLoggedIn ? (
          // Quand la pharmacie est connectée : afficher seulement le bouton Dashboard
          <Link
            href="/pharma/dashboard"
            className="p-4 rounded-full bg-green-600 cursor-pointer duration-400 hover:bg-green-800 text-white font-semibold"
          >
            Dashboard
          </Link>
        ) : (
          // Quand la pharmacie n'est pas connectée : afficher les boutons de connexion/inscription
          <>
            <Link
              href="/pharma/signin"
              className="p-4 rounded-full cursor-pointer duration-400 hover:bg-green-600 hover:text-white"
            >
              Pharmacie (Connexion)
            </Link>
            <Link
              href="/pharma/signup"
              className="p-4 rounded-full bg-green-600 cursor-pointer duration-400 hover:bg-green-800 text-white"
            >
              Pharmacie (Inscription)
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
