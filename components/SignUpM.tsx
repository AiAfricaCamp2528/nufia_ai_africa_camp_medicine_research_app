import Image from "next/image";
import React from "react";
import GlassSurface from "./GlassSurface";
import { Navigation2 } from "@deemlol/next-icons";

const SignUpM = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden ">
      <div className="absolute z-10 w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-[850px] mb-5">
          <div className="text-8xl font-[800] relative mb-4">
            Signup{" "}
            <Image
              src="/images/hand.png"
              alt="hand"
              width={80}
              height={80}
              className="absolute -top-7 -left-7"
            />
          </div>
          <div className="text-md text-black/40">
            Soumettez ses informations en tant que pharmacie pour créer un
            compte.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-md text-black/40 mb-3 ml-2">
            Informations Générales
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Nom de la pharmacie"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Ville"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Quartier"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Adresse"
              />
            </GlassSurface>
          </div>
          <div className="text-md text-black/40 mb-3 ml-2">
            Identifiants de Connexion
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Téléphone"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Email"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Mot de passe"
              />
            </GlassSurface>
          </div>
          <div className="text-md text-black/40 mb-3 ml-2">Responsable</div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Nom du responsable"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                className="px-6 py-2 rounded-full w-[400px] text-md"
                placeholder="Téléphone du responsable"
              />
            </GlassSurface>
          </div>
          <div className="text-md text-black/40 mb-3 ml-2">
            Garde & Ordonance
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <div className="w-full text-md text-black/40 flex items-center">
                <div className="mb-3 text-nowrap mr-6 mt-2">
                  Service de garde
                </div>
                <div className="w-full grid grid-cols-2 gap-2 text-black/60">
                  <div className="">
                    <input
                      type="radio"
                      name="garde"
                      id="garder"
                      value={"oui"}
                      width={40}
                      height={40}
                    />{" "}
                    Oui
                  </div>
                  <div className="">
                    <input
                      type="radio"
                      name="garde"
                      id="garder"
                      value={"non"}
                    />{" "}
                    Non
                  </div>
                </div>
              </div>
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <div className="w-full text-md text-black/40 flex items-center">
                <div className="mb-3 text-nowrap mr-6 mt-2">
                  Médicaments sous ordonance
                </div>
                <div className="w-full grid grid-cols-2 gap-2 text-black/60">
                  <div className="">
                    <input
                      type="radio"
                      name="garde"
                      id="garder"
                      value={"oui"}
                      width={40}
                      height={40}
                    />{" "}
                    Oui
                  </div>
                  <div className="">
                    <input
                      type="radio"
                      name="garde"
                      id="garder"
                      value={"non"}
                    />{" "}
                    Non
                  </div>
                </div>
              </div>
            </GlassSurface>
          </div>

          <div className="text-md text-black/40 mb-3 ml-2 flex items-center mt-2">
            <input type="checkbox" name="condition" id="condition" className="mr-2"/> J’accepte les conditions d’utilisation
          </div>

            <button className="bg-green-500 text-white p-6 rounded-full cursor-pointer hover:bg-green-800 duration-400 mt-4 w-[300px]">
                S’inscrire
            </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpM;
