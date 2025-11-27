import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SignUpM from "@/components/SignUpM";
import React from "react";

const signup = () => {
  return (
    <div className="relative">
      <Navbar />
      <SignUpM />
      <Footer />
    </div>
  );
};

export default signup;
