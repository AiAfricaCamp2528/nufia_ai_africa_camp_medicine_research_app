"use client";
import React from "react";
import DotGrid from "./DotGrid";
import GlassSurface from "./GlassSurface";
import { Navigation2 } from "@deemlol/next-icons";
import Orb from "./Orb";
import LightRays from "./LightRays";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {

  const popularSearches = [
    { name: "Paracétamol", searches: 500 },
    { name: "Foliron", searches: 194 },
    { name: "Ca-C1000", searches: 98 },
  ];

  const router = useRouter();

  const handleMedicineSearchingNavigation = () => {
    router.push('/home');
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute z-10 w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-[750px] mb-3">
          <div className="text-8xl font-[800] relative">
            Médiloc{" "}
            <Image
              src="/images/star.png"
              alt="hand"
              width={80}
              height={80}
              className="absolute -top-10 -left-10"
            />
          </div>
          <div className="text-md max-w-[400px] text-black/40">
            Faites des recherches de vos médicaments afin de ne pas vous
            déplacer pour rien.
          </div>
        </div>
        <GlassSurface borderRadius={400} className="!w-auto">
          <input
            type="text"
            className="px-6 py-4 mr-2 rounded-full w-[700px] text-xl"
            placeholder="Quel médicament recherchez-vous ?"
          />
          <button onClick={() => handleMedicineSearchingNavigation()} className="bg-green-600 text-white p-4 rounded-full cursor-pointer hover:bg-green-800 duration-400">
            <Navigation2
              size={24}
              color="#FFFFFF"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>
        </GlassSurface>
        <div className="mt-16 w-[750px]">
          <div className="text-sm text-black/40 underline mb-3">
            Les plus recherchés
          </div>
          <div className="w-full grid grid-cols-3 gap-4">
            {
              popularSearches.map((item, index) => (
                <div key={index} className="h-50 group cursor-pointer">
                  <div className="h-30 w-full rounded-md bg-black/10 overflow-hidden group-hover:scale-105 duration-300">
                  <Image src="" alt="image"/></div>
                  <div className="h-20 pt-2">
                    <div className="">{item.name}</div>
                    <div className="text-sm text-black/30">{item.searches} recherches</div>
                    </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {/* <div
        className="absolute -z-10 bg-black"
        style={{ width: "120%", height: "120vh" }}
      >
        <DotGrid
          dotSize={2}
          gap={20}
          baseColor="#9c9c9cff"
          activeColor="#000000ff"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div> */}
      {/* <div className="absolute -z-10 bg-black !flex !items-center" style={{ width: "100%", height: "100%", position: "absolute", top: 0 }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div> */}
    </div>
  );
};

export default Hero;
