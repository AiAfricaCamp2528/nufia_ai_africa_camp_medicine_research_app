import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SignInM from "@/components/SignInM";
import React from "react";

const signin = () => {
  return (
    <div className="relative">
      <Navbar />
      <SignInM />
      <Footer />
    </div>
  );
};

export default signin;
