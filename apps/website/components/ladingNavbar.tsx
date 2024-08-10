"use client";

import {
  Button
} from "@ui/components"
import Link from "next/link";
// import { NavLinks } from "./navlinks";
import { NavigationMenuDemo } from "./navigation-menu";

const LandingNavbar = () => {

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="h-[56px] fixed inset-y-0 w-full z-10" aria-label="Global">
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
          <div className="flex lg:flex-1">
            <Link href="/" className="m-2 p-1.5">
              <span className="font-semibold text-sky-800">LingSquare</span>
            </Link>
          </div>
          <div className="hidden sm:flex">
            <NavigationMenuDemo />
          </div>

          {/* <div className="hidden lg:flex lg:gap-x-12">
            <NavLinks layoutId="HeaderNavLinks" />
          </div> */}

          <div className="flex flex-1 justify-end">
            <Link href="https://app.lingsquare.com">
              <Button variant="outline" className="mr-2" size="default">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
