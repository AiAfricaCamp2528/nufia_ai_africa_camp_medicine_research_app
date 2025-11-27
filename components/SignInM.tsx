import Image from "next/image";
import React from "react";
import GlassSurface from "./GlassSurface";
import { Navigation2 } from "@deemlol/next-icons";

const SignInM = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden ">
      <div className="absolute z-10 w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-[500px] mb-5">
          <div className="text-8xl font-[800] relative mb-4">
            Signin{" "}
            <Image
              src="/images/star.png"
              alt="hand"
              width={90}
              height={90}
              className="absolute -top-7 -left-7"
            />
          </div>
          <div className="text-md text-black/40">
            Saisissez les idetifiants pour vous connecter.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="email"
                className="px-6 py-2 rounded-full w-[500px] text-md"
                placeholder="Entrer votre email"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="password"
                className="px-6 py-2 rounded-full w-[500px] text-md"
                placeholder="Entrer votre mot de passe"
              />
            </GlassSurface>
          </div>

          <button className="bg-green-500 text-white p-6 rounded-full cursor-pointer hover:bg-green-800 duration-400 mt-4 w-[200px]">
            Se Connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInM;
