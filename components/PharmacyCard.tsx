"use client";

import React from "react";
import Link from "next/link";

type Pharmacy = {
  id: string;
  name: string;
  address?: string;
  location?: string;
  city?: string;
  phone?: string;
  openingHours?: string;
  description?: string;
};

type Props = {
  pharmacy: Pharmacy;
  href?: string;
  mode?: "count" | "price"; // count: show number of products; price: show product price
  productCount?: number;
  price?: number | string;
  stock?: number | string;
  className?: string;
};

export default function PharmacyCard({
  pharmacy,
  href,
  mode = "count",
  productCount,
  price,
  stock,
  className = "",
}: Props) {
  const content = (
    <div className={`bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer overflow-hidden h-full flex flex-col ${className}`}>
      <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
        <div className="text-4xl">💊</div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{pharmacy.name}</h3>
        <p className="text-xs text-gray-500 mb-3">{pharmacy.address ?? pharmacy.location ?? pharmacy.city}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{pharmacy.description}</p>

        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-lg text-center">
          {mode === "count" ? (
            <>
              <div>
                <p className="text-2xl font-bold text-green-600">{productCount ?? 0}</p>
                <p className="text-xs text-gray-600">Médicaments</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{pharmacy.city ?? "-"}</p>
                <p className="text-xs text-gray-600">Ville</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-700">{pharmacy.phone ?? "-"}</p>
                <p className="text-xs text-gray-600">Contact</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-2xl font-bold text-green-600">{price ?? "-"}</p>
                <p className="text-xs text-gray-600">Prix</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-700">{stock ?? "-"}</p>
                <p className="text-xs text-gray-600">Stock</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{pharmacy.city ?? "-"}</p>
                <p className="text-xs text-gray-600">Ville</p>
              </div>
            </>
          )}
        </div>

        <div className="mt-auto">
          <div className="text-sm text-gray-600 mb-2">{pharmacy.openingHours}</div>
          <div className="flex gap-2">
            <a
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-center"
              href={href ?? `/pharmacies/${pharmacy.id}`}>
              Voir la pharmacie
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    // if href provided, wrap in Link
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
