import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image"

export const LanguageCard = ({
  image,
  title
}: {
  image: StaticImport,
  title: string
}) => {

  return (
    <div className="p-0.5 bg-transparent aspect-square flex group items-center justify-center relative h-50 w-52">
      <div
        className="group-hover:scale-110 rounded-xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full transition-transform duration-300"
      >
        <div className="pointer-events-none z-20">
          <Image src={image} height={120} width={140} alt={title} className="opacity-70 group-hover:opacity-90 transition-opacity duration-300 rounded h-20" placeholder="blur" />
        </div>
      </div>
    </div>
  );
};
