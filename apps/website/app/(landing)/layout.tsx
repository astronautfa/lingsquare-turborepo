import React from "react";
import dynamic from "next/dynamic";
import BgPattern from "@/components/bgPattern";
import Navbar from "@/components/newLandingNavbar";


const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true,
});

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <BgPattern />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
