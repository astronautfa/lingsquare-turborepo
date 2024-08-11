import React from "react";
import { LanguageCard } from "./language-card";
import France from "@/public/France.png"
import England from "@/public/England.jpg"
import Germany from "@/public/Germany.jpg"
import Spain from "@/public/Spain.png"
import Italy from "@/public/Italy.png"

import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('@/components/globe'), {
  ssr: false,
});


const LanguageBar = () => {
  return (
    <div className="px-10 relative">
      <div className="mx-auto max-w-xl lg:text-center mb-8">
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Languages we currently support
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          We are focused on supporting more languages
        </p>
      </div>

      <div className="z-10 mt-[200px] mb-20 max-w-6xl h-50 grid md:grid-cols-5 grid-cols-1 gap-y-10 place-items-center mx-auto p-2">
        <LanguageCard
          title="English"
          image={England}
        />
        <LanguageCard
          title="German"
          image={Germany}
        />
        <LanguageCard
          title="French"
          image={France}
        />
        <LanguageCard
          title="Spanish"
          image={Spain}
        />
        <LanguageCard
          title="Italian"
          image={Italy}
        />
      </div>
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-4xl sm:h-[500px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(14, 110, 233, 0.30) 15.74%,rgba(14, 165, 233, 0.30)  80.49%, rgba(14, 70, 229, 0.4) 115.91%)",
        }}
      />
      <Globe className="top-1 opacity-50 z-5 absolute mt-10 hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
};

export default LanguageBar;
