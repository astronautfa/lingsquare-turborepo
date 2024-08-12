"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@lingsquare/misc/utils";

const navLinks = [
  { label: "Features", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Legal", href: "/legal" },
];

export const NavLinks = ({ layoutId }: { layoutId: string }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const pathname = usePathname();

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="flex py-10">
        {(layoutId === "HeaderNavLinks" ? navLinks.slice(0, 4) : navLinks).map(
          ({ label, href }, idx) => (
            <Link
              href={href}
              key={label}
              className="relative group  block p-2 h-full w-full text-sm"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <>
                    <motion.span
                      className="absolute inset-0  bg-slate-100/[0.8] block rounded-xl"
                      layoutId={layoutId} // required for the background to follow
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  </>
                )}
              </AnimatePresence>
              <span
                className={cn(
                  (pathname !== "/" && pathname === href) ||
                    pathname?.startsWith(`${href}/`)
                    ? " text-sky-800 font-semibold"
                    : "text-slate-500",
                  "relative z-10 cursor-pointer hover:text-slate-700 py-5 transition duration-200"
                )}
              >
                <span>{label}</span>
                {pathname !== "/" &&
                  pathname === href &&
                  layoutId === "HeaderNavLinks" && (
                    <span className="absolute inset-x-0 -bottom-px pt-0.5 h-px bg-gradient-to-r from-sky-700/0 via-sky-700/40 to-sky-700/0 dark:from-sky-400/0 dark:via-sky-400/40 dark:to-sky-400/0" />
                  )}
              </span>
            </Link>
          )
        )}
      </div>
    </div>
  );
};
