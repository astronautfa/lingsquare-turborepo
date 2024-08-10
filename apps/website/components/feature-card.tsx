"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { HighlightBadge } from "./highlight-badge";
import Link from "next/link";

function CardPattern({ mouseX, mouseY }: any) {
  let maskImage = useMotionTemplate`radial-gradient(190px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-100 to-sky-600/70 opacity-0 transition duration-600 group-hover:opacity-100"
        style={style}
      />
    </div>
  );
}

export default function FeatureCard({
  href,
  name,
  description,
  icon,
  pattern,
  planned,
}: {
  href: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  planned: boolean;
  pattern: {
    y: number;
    squares: [number, number][];
  };
}) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      key={href}
      onMouseMove={onMouseMove}
      className="group relative flex bg-white rounded-2xl transition-shadow hover:shadow-xl duration-400 hover:shadow-sky-700/10 bg-[url('/landing-noise.webp')]"
    >
      <CardPattern {...pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-200 group-hover:ring-gray-900/10" />
      <div className="absolute inset-5 flex flex-col items-end">
        {planned && <HighlightBadge text="Planned" dark={false} />}
        {name === "Request Features" && (
          <div className="cursor-pointer z-10">
            <Link
              href="https://lingsquare.canny.io/"
              className="mx-auto block max-w-fit rounded-full border border-sky-700 bg-sky-800 px-4 py-1.5 text-xs text-white hover:bg-slate-200 hover:text-sky-950 font-semibold transition-colors duration-300"
            >
              View Roadmap
            </Link>
          </div>
        )}
      </div>
      <div className="relative rounded-2xl p-6 pt-6">
        {icon}
        <h3 className="mt-4 font-semibold leading-7 text-gray-700 group-hover:text-sky-900">
          {/* <Link href={href}> */}
          <span className="absolute inset-0 rounded-2xl " />
          {name}
          {/* </Link> */}
        </h3>
        <p className="mt-1 text-sm text-gray-600 group-hover:text-sky-950 ">
          {description}
        </p>
      </div>
    </div>
  );
}
