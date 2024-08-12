import React from "react";
import { LanguageCard } from "./language-card";
import France from "@/public/France.png"
import England from "@/public/England.jpg"
import Germany from "@/public/Germany.jpg"
import Spain from "@/public/Spain.png"
import Italy from "@/public/Italy.png"

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

      <div className="z-10 mt-5 mb-20 max-w-6xl h-50 grid md:grid-cols-5 grid-cols-1 gap-y-10 place-items-center mx-auto p-2">
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
    </div>
  );
};

export default LanguageBar;
