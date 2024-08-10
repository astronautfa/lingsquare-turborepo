"use client";

import { formatDate } from "@/lib/utils";
import { allPosts } from "@/.contentlayer/generated";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Link from "next/link";

const variants = {
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      delay: index * 0.2 + 0.2,
      duration: 1,
    },
  }),
  hidden: { opacity: 0 },
};

export default function Changelog() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="space-y-5 pt-5 md:space-y-10 mb-32" id="roadmap">
      <div className="mx-auto max-w-md text-center sm:max-w-xl">
        <h2 className="font-display text-4xl font-bold text-black">
          We ship{" "}
          <span className="bg-gradient-to-br from-sky-600 to-sky-400 bg-clip-text pr-2 italic text-transparent">
            Fast
          </span>
        </h2>
        <p className="mt-5 text-gray-600 sm:text-lg">
          We are dedicated to provide you with the best possible tool
        </p>
      </div>
      <ul className="max-w-2xl md:translate-x-28 sm:pl-12 pl-4 md:pl-0 pt-8 mx-auto ">
        {[...allPosts]
          // .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
          .slice(0, 6)
          .map((post, index) => (
            <motion.li
              key={post.slug}
              custom={5 - index}
              initial="hidden"
              variants={variants}
              animate={controls}
              className="text-black"
            >
              <DesktopChangelogEntry post={post} />
              <MobileChangelogEntry post={post} />
            </motion.li>
          ))}
      </ul>
      <motion.div
        custom={7}
        initial="hidden"
        variants={variants}
        animate={controls}
        ref={ref}
      >
        <Link
          href="https://lingsquare.canny.io/"
          className="mx-auto block max-w-fit rounded-full border border-sky-700 bg-sky-800 px-4 py-1.5 text-sm text-white hover:bg-white hover:text-sky-900 transition-colors duration-300"
        >
          View Roadmap
        </Link>
      </motion.div>
    </section>
  );
}

const DesktopChangelogEntry = ({ post }: any) => (
  <div
    // href={`/${post.type === "BlogPost" ? "blog" : "changelog"}/${post.slug}`}
    className="group hidden grid-cols-9 items-center md:grid"
  >
    <dl className="col-span-2">
      <dt className="sr-only">Published on</dt>
      <dd className="text-base font-medium transition-colors group-hover:text-gray-700">
        {formatDate(post.date)}
      </dd>
    </dl>
    <div className="col-span-7 flex items-center">
      <div className="relative ml-4">
        <div className="h-16 border-l border-gray-400 pr-8" />
        <div className="absolute -left-1 top-[1.6875rem] h-2.5 w-2.5 rounded-full bg-gray-500 transition-colors group-hover:bg-gray-700" />
      </div>
      <h3 className="text-2xl font-medium tracking-tight transition-colors">
        {post.title}
      </h3>
    </div>
  </div>
);

const MobileChangelogEntry = ({ post }: any) => (
  <div
    // href={`/${post.type === "BlogPost" ? "blog" : "changelog"}/${post.slug}`}
    className="flex items-center space-x-4 rounded-lg active:bg-gray-100 md:hidden mx-5 sm:mx-10"
  >
    <div className="relative">
      <div className="h-16 border-l border-gray-400" />
      <div className="absolute -left-1 top-5 h-2.5 w-2.5 rounded-full bg-gray-500" />
    </div>
    <div>
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-sm font-medium ">{formatDate(post.date)}</dd>
      </dl>
      <h3 className="sm:text-lg text-base font-medium tracking-tight ">
        {post.title}
      </h3>
    </div>
  </div>
);
