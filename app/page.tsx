import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </>
  );
};

export default page;
