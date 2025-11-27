import React from "react";
import GlassSurface from "./GlassSurface";
import { Navigation2 } from "@deemlol/next-icons";

const search = () => {
  const loadSearchResults = () => {
    // Logic to load search results goes here
  };


  return (
    <div className="pt-8 flex flex-col items-center">
      <GlassSurface borderRadius={400} className="!w-auto">
        <input
          type="text"
          className="px-6 py-4 mr-2 rounded-full w-[700px] text-xl"
          placeholder="Quel médicament recherchez-vous ?"
        />
        <button
          onClick={() => loadSearchResults()}
          className="bg-green-600 text-white p-4 rounded-full cursor-pointer hover:bg-green-800 duration-400"
        >
          <Navigation2
            size={24}
            color="#FFFFFF"
            style={{ transform: "rotate(90deg)" }}
          />
        </button>
      </GlassSurface>
    </div>
  );
};

export default search;
