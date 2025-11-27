import React from "react";
import GlassSurface from "./GlassSurface";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      className="absolute w-full px-14 py-6 flex items-center justify-between z-100"
    >
      <Link href="/" className="text-xl font-bold duration-300 hover:text-green-500">Médiloc</Link>
      <div className="flex items-center justify-end gap-6">
        <Link href="/auth/signin" className="p-4 rounded-full cursor-pointer duration-400 hover:bg-green-500 hover:text-white">Se Connecter</Link>
          <Link href="/auth" className="p-4 rounded-full bg-green-500 cursor-pointer duration-400 hover:bg-green-800 text-white"> Créer un Compte</Link>
      </div>
    </div>
  );
};

export default Navbar;
