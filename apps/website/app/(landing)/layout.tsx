import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/new-landing-navbar";

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true,
});

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />˝
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
