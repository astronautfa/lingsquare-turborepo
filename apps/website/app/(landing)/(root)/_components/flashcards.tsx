"use client";

import { cn } from "@lingsquare/misc/utils";
import { useEffect, useState } from "react";

const Flashcards = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [animationState, setAnimateState] = useState<
    "idle" | "opening" | "closing"
  >("idle");

  useEffect(() => {
    if (animationState === "closing") {
      const timeOut = setTimeout(() => {
        setActiveCard(null);
        setAnimateState("idle");
      }, 1000);

      return () => clearTimeout(timeOut);
    }
  }, [animationState]);

  return (
    <div className="md:mx-auto flex flex-col items-center justify-center py-10">
      <div className="mx-auto max-w-2xl lg:text-center px-4">
        <h2 className="text-base font-semibold leading-7 text-sky-600">
          Go beyond Flashcards
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Empower your learning with latest Research
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          FSRS is a modern spaced repetition algorithm that makes learning humane by learning your personal memory patterns to schedule your reviews more efficiently
        </p>
      </div>
      <div className="grid w-full">
        <div
          className="grid h-[60vh] 2xl:h-[90vh] grid-cols-2 place-items-center [perspective:800px]"
          onClick={() => {
            setAnimateState("opening");
            setActiveCard("fake-id");
          }}
        >
          <Card className="rotate-[1deg] [grid-area:1/1]" />
          <Card className="-rotate-[1deg] [grid-area:1/1]" />
          <Card
            className="rotate-[1.5deg] [grid-area:1/1]"
            title="You will be amazed"
          />

          <Card
            className={cn(
              "peer-hover/next:card--to-left peer-focus-within/next:card--to-left peer-hover/show:card--to-right peer-focus-within/show:card--to-right [grid-area:1/1]",
              animationState === "opening" && "md:animate-card-visible-md 2xl:animate-card-visible-lg",
              animationState === "closing" && "md:animate-card-hidden-md 2xl:animate-card-hidden-lg"
            )}
            title="Animate so many things with just CSS!"
          />
        </div>

        {activeCard && (
          <div className="content-container relative inset-0 flex justify-center overflow-auto">
            <div
              className={cn(
                "pointer-events-none relative mb-60 w-[90%] rounded-[4.5rem] px-16 py-16 opacity-0",
                animationState === "opening" && "animate-card-details",
                animationState === "closing" && "animate-card-details-hidden"
              )}
            >
              <button
                onClick={() => setAnimateState("closing")}
                className="absolute right-5 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-lg"
              >
                👋
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ className, title }: { className?: string; title?: string }) => (
  <div
    className={cn(
      "pointer-events-none absolute grid aspect-[3/4] w-[65vw] transition-transform duration-1000 [transform-style:preserve-3d] md:w-[30vw] 2xl:w-[20vw]",
      className
    )}
  >
    <div className="pointer-events-none rounded-3xl bg-gray-300 border border-border [grid-area:1/1] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:translateZ(-5px)] md:-mb-[5px] md:-mt-[5px] md:[transform:translateZ(-10px)]" />
    <div className="pointer-events-none absolute flex h-full w-full flex-col items-start rounded-3xl bg-gray-100 p-8 shadow-2xl [grid-area:1/1]"></div>
    <div className="pointer-events-none rounded-3xl bg-gray-100 border-[1px] border-gray-200 [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]" />
  </div>
);

export default Flashcards;
