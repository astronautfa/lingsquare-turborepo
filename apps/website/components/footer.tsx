import { NavLinks } from "./navlinks";
import Image from "next/image";
import LandingLogo from "@/public/LandingLogo.png";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-slate-50/100 select-none backdrop-blur-md shadow-inner ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:justify-between items-center justify-center pb-6 pt-12 sm:flex-row sm:items-center sm:py-10">
          <div className="flex items-center text-gray-900">
            <Image src={LandingLogo} width={38} height={38} alt="LingSquare" />
            <div className="ml-4">
              <p className="text-base font-semibold">Lingsquare</p>
              <p className="mt-1 text-sm">
                A language club as vast as the internet
              </p>
            </div>
          </div>
          <nav className="flex justify-end gap-4">
            <NavLinks layoutId="FooterNavLinks" />
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-center border-t border-gray-200 pb-8 pt-2 sm:justify-end sm:pt-8">
          <p className="mt-6 text-xs text-gray-500 sm:mt-0 mr-1">
            Copyright 2023.
          </p>
          <p className="mt-2 text-xs text-gray-500 sm:mt-0">
            All rights reserved for AVANVISION PTY LTD &copy;
          </p>
        </div>
      </div>
    </footer>
  );
}
