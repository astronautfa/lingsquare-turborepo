"use client";

import React, { useEffect, useState } from "react";
import { BentoGrid } from "@/components/bento-grid";

import { AnimatedTooltip } from "@/components/animated-tooltip";

import { useInView } from "react-intersection-observer";

import { FeaturesBentoSix } from "./features-bento-six";
import { FeaturesBentoOne } from "./features-bento-one";
import { FeaturesBentoTwo } from "./features-bento-two";
import { FeaturesBentoThree } from "./features-bento-three";
import { FeaturesBentoFour } from "./features-bento-four";
import { FeaturesBentoFive } from "./features-bento-five";
import { BentoGridItem } from "./bento-grid-item";
import { cn } from "@lingsquare/misc/utils";
import { BentoGridInfo, BentoGridInfoType } from "./bento-grid-info";

export default function BentoFeaturesGrid() {

  const [bentoRef, inView] = useInView();
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (inView) {
      setLoading(true)
    }
  }, [inView])

  return (
    <>
      <div className="mx-auto max-w-md text-center sm:max-w-xl py-14" ref={bentoRef}>
        <h2 className="font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl sm:leading-tight">
          <span className="bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            Powerful
          </span>{" "}
          features for language immersion
        </h2>
        <p className="mt-5  sm:text-lg">
          We have built a suit of tools that would be your companion throughout
          your language leanring journey
        </p>
      </div>
      {loading &&
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] backdrop-blur-sm">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
            //   icon={item.icon}
            />
          ))}
        </BentoGrid>
      }
    </>
  );
}

const people = [
  {
    id: 1,
    name: "Inner French",
    image: "/innerFrench.jpg",
  },
  {
    id: 2,
    name: "Francais Authentique",
    image: "/francaisAuthentique.jpg",
  },
  {
    id: 3,
    name: "French Mornings with Elise",
    image: "/frenchMornings.jpg",
  },
  {
    id: 4,
    name: "Piece Of French",
    image: "/pieceOfFrench.jpg",
  },
  {
    id: 5,
    name: "Learn French with Alexa",
    image: "/learnFrenchAlexa.jpg",
  },
];

const SkeletonSeven = ({ title, description, icon }: BentoGridInfoType) => {
  return (
    <>
      <div className="flex flex-row items-center justify-center h-full w-full">
        <AnimatedTooltip items={people} />
      </div>

      <div>
        <BentoGridInfo title={title} description={description} />
      </div>
    </>
  );
};

const items = [
  {
    title: "Multiple profiles",
    description: (
      <span className="text-sm">
        Built with polyglots in mind, you could choose different language
        profiles and immerse yourself in your target languages
      </span>
    ),
    header: <FeaturesBentoOne />,
    className: "md:col-span-1",
  },
  {
    title: "Powerful Context Aware Lookup",
    description: (
      <span className="text-sm">
        Select any word or phrase and get instant translation based on the
        context
      </span>
    ),
    header: <FeaturesBentoTwo />,
    className: "md:col-span-1",
  },
  {
    title: "Optimum Review Strategy",
    description: (
      <span className="text-sm">
        Save the words you want to learn and leave everything else to us.
        Levaraging the latest FSRS algorithm
      </span>
    ),
    header: <FeaturesBentoFive />,
    className: "md:col-span-1",
  },
  {
    title: "Seamless Flashcards",
    description: (
      <span className="text-sm">
        Create Flashcards while reading and listening to your content. The
        context will be automatically linked to your cards for furthur
        exploration
      </span>
    ),
    header: <FeaturesBentoThree />,
    className: "md:col-span-2",
  },
  {
    title: "Listen to your text",
    description: (
      <span className="text-sm">
        With the help of the most advanced text to speech AI systems listen to
        your selected text
      </span>
    ),
    header: <FeaturesBentoFour />,
    className: "md:col-span-1",
    // // icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Follow your favourites",
    description: (
      <span className="text-sm">
        Get through the clutter and magnitude of available content and only
        follow those you like
      </span>
    ),
    header: <SkeletonSeven />,
    className: "md:col-span-1",
  },
  {
    title: "Powerful Extension",
    description: (
      <span className="text-sm">
        With our chrome extension the internet will become your language
        learning library. You could create a learning habit out of your internet
        surfing.
      </span>
    ),
    header: <FeaturesBentoSix />,
    className: "md:col-span-2",
  },
];
