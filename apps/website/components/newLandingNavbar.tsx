"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar";
import { cn } from "@/lib/utils";

import LandingLogo from "../public/LandingLogo.png";

import Image from "next/image";
import { Button } from "@ui/components";
import Link from "next/link";

const features: { title: string; href: string; description: string }[] = [
  {
    title: "Enjoyable Content",
    href: "/",
    description:
      "Language learning is different when you choose your own content",
  },
  {
    title: "Lookup tools",
    href: "/",
    description: "Comprehend words and phrases in context",
  },
  {
    title: "Progress",
    href: "/",
    description: "Track your progress and make learning a habit",
  },
  {
    title: "Flashcards",
    href: "/",
    description: "Save phrases and words to review later",
  },
  {
    title: "Read books",
    href: "/",
    description: "Read your digital library with the help of our tools",
  },
  {
    title: "Social",
    href: "/",
    description: "Learn socially and help others learn your native language",
  },
];

const plans = [
  {
    name: "Free",
    desc: "All the features needed to start learning.",
    price: 0,
    isMostPop: false,
    features: [
      "10 Content Imports",
      "100 Flashcards",
      "10 phrase meaning/day",
      "50mb hosting for audio and text",
    ],
  },
  {
    name: "Premium",
    desc: "Premium features for dedicated learners.",
    price: 6,
    isMostPop: true,
    features: [
      "Unlimited content import",
      "Unlimited flashcards",
      "Unlimited dictionary and phrase translator",
      "Faster native audio recording for your texts",
      "300mb hosting for audio and text",
    ],
  },
];

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50")}>
      <Menu setActive={setActive}>
        <div className="flex space-x-4 justify-center items-center">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Get Started"
          >
            <div className="flex flex-col text-sm">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white">
                <li className="row-span-3">
                  <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    <Image
                      src={LandingLogo}
                      alt="Landing Logo"
                      width={40}
                      height={50}
                      priority
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      LingSquare
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A Language learning club as vast as the digital world
                    </p>
                  </div>
                </li>
                <ListItem href="/" title="Introduction">
                  What is LingSquare and why it was developed
                </ListItem>
                <ListItem href="/" title="How to Use">
                  How to take advantage of the platform
                </ListItem>
                <ListItem href="/#roadmap" title="Roadmap">
                  We are dedicated to develop and ship educational tools
                </ListItem>
              </ul>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Features">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
              {features.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Pricing">
            <div className="flex gap-2 text-sm p-2">
              {plans.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative flex items-stretch flex-col sm:rounded-xl sm:max-w-sm rounded-none ${idx === 1 && "bg-gradient-to-tr from-muted/100 to-muted/50"
                    }`}
                >
                  <div
                    className={`p-4 space-y-2 border-b border-gray-200 ${idx === 1 && "shadow-sm"
                      }`}
                  >
                    <span className="text-gray-800 font-medium">
                      {item.name}
                    </span>
                    <div className="text-sky-700 text-3xl font-semibold">
                      ${item.price}{" "}
                      <span className="text-xl font-normal">/mo</span>
                    </div>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                  <ul className="p-4 space-y-3">
                    {item.features.map((featureItem, idx) => (
                      <li key={idx} className="flex items-center gap-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ${item.isMostPop ? "text-sky-600" : ""
                            }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {featureItem}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MenuItem>
        </div>
        <Link href="https://app.lingsquare.com">
          <Button variant="ghost" className="mr-2" size="default">
            Dashboard
          </Button>
        </Link>
      </Menu>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <div>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </div>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default Navbar;
