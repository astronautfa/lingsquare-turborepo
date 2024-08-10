"use client";

import React, { useEffect, useState } from "react";
import { BentoGrid } from "@/components/bento-grid";

import { motion } from "framer-motion";
import Image from "next/image";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import { GiSoundWaves } from "react-icons/gi";

import { useMediaQuery } from "react-responsive";
import { AnimatedTooltip } from "@/components/animated-tooltip";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

import France from "@/public/France.png"
import Germany from "@/public/Germany.jpg"
import Spain from "@/public/Spain.png"
import Italy from "@/public/Italy.png"

type BentoGridInfoType = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header: React.ReactElement;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 hover:bg-gradient-to-b from-slate-100 backdrop-blur-md to-sky-600/10 from-80% rounded-lg group/bento shadow-md h-72 md:h-80 mx-16 md:mx-0 bg-[url('/landing-noise.webp')] hover:shadow-xl hover:shadow-sky-900/10 transition duration-200 shadow-input p-4 border border-slate-200 justify-between flex flex-col space-y-4",
        className
      )}
    >
      {React.cloneElement(header, { title, description, icon })}
    </div>
  );
};

const BentoGridInfo = ({ title, description, icon }: BentoGridInfoType) => {
  return (
    <div className="absolute bottom-3 md:relative pt-1">
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

export function BentoFeaturesGrid() {

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
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100"></div>
);

const SkeletonOne = ({ title, description, icon }: BentoGridInfoType) => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-1  items-center space-x-2 bg-white"
      >
        <Image
          src={Germany}
          height={50}
          width={50}
          alt="flag"
          className="h-6 w-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
        />
        <div className="w-full bg-gray-100 h-4 rounded-full " />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-1 items-center space-x-2 w-3/4 ml-auto bg-white"
      >
        <Image
          src={France}
          height={50}
          width={50}
          alt="flag"
          className="h-6 w-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
        />
        <div className="w-full bg-gray-100 h-4 rounded-full " />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-1 items-center space-x-2 bg-white"
      >
        <Image
          src={Italy}
          height={50}
          width={50}
          alt="flag"
          className="h-6 w-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
        />
        <div className="w-full bg-gray-100 h-4 rounded-full " />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-1 items-center space-x-2 w-3/4 ml-auto bg-white"
      >
        <Image
          src={Spain}
          height={50}
          width={50}
          alt="flag"
          className="h-6 w-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
        />
        <div className="w-full bg-gray-100 h-4 rounded-full " />
      </motion.div>
      <BentoGridInfo title={title} description={description} />
    </motion.div>
  );
};
const SkeletonTwo = ({ title, description, icon }: BentoGridInfoType) => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div initial="initial" animate="animate" whileHover="hover">
      <div className="flex flex-1 w-full mb-4 min-h-[6rem] bg-white p-2 rounded-xl flex-col space-y-2 shadow-sm hover:shadow-md transition-shadow">
        {arr.map((_, i) => (
          <motion.div
            key={"skelenton-two" + i}
            variants={variants}
            style={{
              maxWidth: Math.random() * (100 - 40) + 40 + "%",
            }}
            className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 animate-pulse bg-neutral-200 w-full h-4"
          />
        ))}
      </div>
      <BentoGridInfo title={title} description={description} />
    </motion.div>
  );
};
const SkeletonThree = ({ title, description, icon }: BentoGridInfoType) => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div initial="initial" animate="animate" whileHover="hover">
      <div className="flex flex-1 w-full h-5/6 mb-3 min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2">
        <motion.div
          variants={first}
          className="h-full w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex flex-col items-center justify-center"
        >
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
            Fixez-vous un objectif précis, réaliste et{" "}
            <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
              mesurable
            </span>
          </p>
          <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
            New
          </p>
        </motion.div>
        <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex flex-col items-center justify-center">
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
            Le succès de chaque contrat{" "}
            <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
              repose
            </span>{" "}
            sur une autorité fiable
          </p>
          <p className="border border-orange-500 bg-orange-100 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
            Learning
          </p>
        </motion.div>
        <motion.div
          variants={second}
          className="h-full w-1/3 rounded-2xl bg-white p-4  border border-neutral-200 flex flex-col items-center justify-center"
        >
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
            Une pénalité{" "}
            <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
              dissuasive
            </span>
          </p>
          <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
            Mastered
          </p>
        </motion.div>
      </div>
      <BentoGridInfo title={title} description={description} />
    </motion.div>
  );
};
const SkeletonFour = ({ title, description, icon }: BentoGridInfoType) => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: -30,
      rotate: -8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-8 group"
    >
      <motion.div className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white">
        <p className="text-xs text-neutral-500">
          Le contraire de la dépendance n’est pas la sobriété. Le contraire de
          la dépendance est la connexion.
        </p>
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row group-hover:shadow-sm rounded-full border border-neutral-100 dark:border-white/[0.2] p-1 items-center justify-start space-x-2 w-3/4 ml-auto bg-white"
      >
        <div className="h-6 w-6 rounded-full bg-slate-200 flex-shrink-0 flex justify-center items-center">
          <PlayCircleIcon className="h-5 w-5 fill-sky-100 text-sky-700/90 group-hover:hidden" />
          <PauseCircleIcon className="h-5 w-5 fill-sky-100 text-red-700/80 hidden group-hover:block" />
        </div>
        <p className="text-xs group-hover:text-neutral-700 text-neutral-400 group-hover:animate-pulse flex">
          <GiSoundWaves className="w-8 h-8 rotate-180" />
          <GiSoundWaves className="w-8 h-8" />
          <GiSoundWaves className="w-8 h-8 rotate-180" />
          <GiSoundWaves className="w-8 h-8" />
        </p>
      </motion.div>
      <BentoGridInfo title={title} description={description} />
    </motion.div>
  );
};

const SkeletonFive = ({ title, description, icon }: BentoGridInfoType) => {
  const variants = {
    initial: {
      pathLength: 0,
      pathOffset: 0,
    },
    animate: {
      pathLength: 1,
      pathOffset: 0,
    },
  };

  const variants2 = {
    initial: {
      pathLength: 1,
      pathOffset: 0,
    },
    animate: {
      pathLength: 1,
      pathOffset: 1,
    },
  };

  const isBigScreen = useMediaQuery({ query: "(min-width: 700px)" });

  return (
    <motion.div initial="initial" whileHover="animate">
      <motion.div className="h-1/3 mb-2">
        {isBigScreen ? (
          <motion.svg
            width="full"
            height="full"
            viewBox="140 170 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-gradient-to-b from-white to-muted/100 rounded-xl shadow-sm hover:shadow-md"
          >
            <motion.path
              d="M 123.172 322.272 C 111.509 160.953 313.658 198.598 348.144 190.101"
              stroke="#c8c8c8"
              strokeWidth="2"
              strokeLinecap="square"
              transition={{ duration: 4 }}
              variants={variants2}
              className="animate-pulse"
            />
            <motion.path
              d="M 123.172 322.272 C 111.509 160.953 313.658 198.598 348.144 190.101"
              stroke="#0364a1"
              strokeWidth="2.8"
              strokeLinecap="square"
              transition={{ duration: 4 }}
              variants={variants}
            />
            <motion.path
              d="M 122.047 182.227 L 127.672 270.529 L 128.234 182.227 C 133.05 231.607 140.608 261.39 138.358 238.47 L 136.67 182.79 C 140.153 205.277 158.824 232.094 158.043 223.285 L 158.605 183.914 C 162.934 199.614 196.668 208.369 200.787 203.037 L 200.225 185.039 L 347.582 190.101"
              stroke="#006cbe"
              strokeWidth="2.8"
              strokeLinecap="square"
              transition={{ duration: 3 }}
              variants={variants}
            />
            <motion.path
              d="M 122.047 182.227 L 127.672 270.529 L 128.234 182.227 C 133.05 231.607 140.608 261.39 138.358 238.47 L 136.67 182.79 C 140.153 205.277 158.824 232.094 158.043 223.285 L 158.605 183.914 C 162.934 199.614 196.668 208.369 200.787 203.037 L 200.225 185.039 L 347.582 190.101"
              stroke="#d8e8e8"
              strokeWidth="2"
              strokeLinecap="square"
              transition={{ duration: 3 }}
              variants={variants2}
              className="animate-pulse"
            />
          </motion.svg>
        ) : (
          <motion.svg
            width="full"
            height="full"
            viewBox="110 100 250 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-gradient-to-b from-white to-muted/100 rounded-xl shadow-sm hover:shadow-md"
          >
            <motion.path
              d="M 123.172 322.272 C 111.509 160.953 313.658 198.598 348.144 190.101"
              stroke="#c8c8c8"
              strokeWidth="2"
              strokeLinecap="square"
              transition={{ duration: 4 }}
              variants={variants2}
              className="animate-pulse"
            />
            <motion.path
              d="M 123.172 322.272 C 111.509 160.953 313.658 198.598 348.144 190.101"
              stroke="#0364a1"
              strokeWidth="2.8"
              strokeLinecap="square"
              transition={{ duration: 4 }}
              variants={variants}
            />
            <motion.path
              d="M 122.047 182.227 L 127.672 270.529 L 128.234 182.227 C 133.05 231.607 140.608 261.39 138.358 238.47 L 136.67 182.79 C 140.153 205.277 158.824 232.094 158.043 223.285 L 158.605 183.914 C 162.934 199.614 196.668 208.369 200.787 203.037 L 200.225 185.039 L 347.582 190.101"
              stroke="#006cbe"
              strokeWidth="2.8"
              strokeLinecap="square"
              transition={{ duration: 3 }}
              variants={variants}
            />
            <motion.path
              d="M 122.047 182.227 L 127.672 270.529 L 128.234 182.227 C 133.05 231.607 140.608 261.39 138.358 238.47 L 136.67 182.79 C 140.153 205.277 158.824 232.094 158.043 223.285 L 158.605 183.914 C 162.934 199.614 196.668 208.369 200.787 203.037 L 200.225 185.039 L 347.582 190.101"
              stroke="#d8e8e8"
              strokeWidth="2"
              strokeLinecap="square"
              transition={{ duration: 3 }}
              variants={variants2}
              className="animate-pulse"
            />
          </motion.svg>
        )}
      </motion.div>
      <BentoGridInfo title={title} description={description} />
    </motion.div>
  );
};

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
    header: <SkeletonOne />,
    className: "md:col-span-1",
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Powerful Context Aware Lookup",
    description: (
      <span className="text-sm">
        Select any word or phrase and get instant translation based on the
        context
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Optimum Review Strategy",
    description: (
      <span className="text-sm">
        Save the words you want to learn and leave everything else to us.
        Levaraging the latest FSRS algorithm
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    // // icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
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
    header: <SkeletonThree />,
    className: "md:col-span-2",
    // // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Listen to your text",
    description: (
      <span className="text-sm">
        With the help of the most advanced text to speech AI systems listen to
        your selected text
      </span>
    ),
    header: <SkeletonFour />,
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
    // // icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
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
    header: <SkeletonThree />,
    className: "md:col-span-2",
    // // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
