"use client";

import Link from "next/link";
import { Book, BookMarked, Brain, CircleDashed, Sticker, UserCheck } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "ui/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";

const featureList = [
  {
    feature_key: "analytics",
    title: "Content that you enjoy",
    icon: <Sticker className="h-5 w-5" />,
    description:
      "LingSquare helps you learn language by learning through the content you enjoy. We make digital contnet accessible for language learning through our suit of tools",
    cta: (
      <Link
        href="/stats/github"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        View demo
      </Link>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/analytics.mp4",
    // thumbnail: "/_static/features/analytics.png",
  },
  {
    feature_key: "domains",
    title: "Powerfool lookup tools",
    icon: <BookMarked className="h-5 w-5" />,
    description:
      "The select to translate feature helps you translate and understand words and phrases in the context of your content.",
    cta: (
      <a
        href="/help/article/how-to-add-custom-domain"
        target="_blank"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        Learn more
      </a>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/custom-domain.mp4",
  },
  {
    feature_key: "link",
    title: "Seamless Flashcards",
    icon: <Brain className="h-5 w-5 " />,
    description:
      "Add your unknown words as a flashcard and review them based on scientifically approved algorithms.",
    cta: "View demo", //custom cta
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/link.mp4",
  },
  {
    feature_key: "social",
    title: "Track your Progress",
    icon: <CircleDashed className="h-5 w-5" />,
    description:
      "We value your overall progress and consistency over your streak counts. Learning requires delibrate practice and we help you keep track of your sessions with LingSquare",
    cta: (
      <a
        href="/help/article/how-to-create-link#custom-social-media-cards"
        target="_blank"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        Learn more
      </a>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/og.mp4",
  },
  {
    feature_key: "qr",
    title: "Learn Socially",
    icon: <UserCheck className="h-5 w-5 " />,
    description:
      "Get audio for your desired text by native speakers and help others learn your language.",
    cta: "View demo", //custom cta
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/qr.mp4",
  },
  {
    feature_key: "team",
    title: "Dedicated Ebook Reader",
    icon: <Book className="h-5 w-5 " />,
    description:
      "With LingSquare you could read your local Epub files using our lookup tools. Premium users get to upload their material on their private library to get access on different devices",
    cta: (
      <a
        href="/help/article/how-to-invite-teammates"
        target="_blank"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        Learn more
      </a>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/team.mp4",
  },
];

export default function NewFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div id="features" className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
      <div className="pb-14 pt-20">
        <div className="mx-auto max-w-md text-center sm:max-w-xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl sm:leading-tight">
            <span className="bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
              Powerful
            </span>{" "}
            features for{" "}
            language immersion
          </h2>
          <p className="mt-5  sm:text-lg">
            We have built a suit of tools that would be your companion through your language leanring journey
          </p>
        </div>
        <div className="my-10 h-[840px] w-full overflow-hidden rounded-xl border border-gray-200 bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur lg:h-[630px]">
          <div className="grid grid-cols-1 gap-10 p-5 lg:grid-cols-3">
            <Accordion
              type="single"
              defaultValue="analytics"
              onValueChange={(e) => {
                setActiveFeature(featureList.findIndex(({ feature_key }) => feature_key === e));
              }}
            >
              {featureList.map(({ feature_key, title, icon, description, cta }, index) => (
                <AccordionItem key={feature_key} value={feature_key}>
                  <AccordionTrigger>
                    <div className="flex items-center space-x-3 p-3 py-2.5">
                      {index === activeFeature ?
                        <span className="text-sky-700">
                          {icon}
                        </span> :
                        <span className="text-gray-600">
                          {icon}
                        </span>
                      }
                      <h3 className={`text-base font-semibold ${index != activeFeature ? 'text-gray-600' : 'text-sky-700'}`}>
                        {title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="p-3 mb-4 text-sm text-gray-500">
                      {description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {featureList.map((feature, index) => {
                  if (index === activeFeature) {
                    return (
                      <motion.div
                        key={index}
                        initial={{
                          y: 10,
                          opacity: 0,
                        }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                          y: -10,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.15,
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="relative min-h-[600px] w-full overflow-hidden whitespace-nowrap rounded-2xl bg-white shadow-2xl lg:mt-10 lg:w-[800px]"
                      >
                        {/* <video
                          autoPlay
                          muted
                          loop
                          width={800}
                          height={600}
                          poster={feature.thumbnail}
                        >
                          <source src={feature.demo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video> */}
                      </motion.div>
                    );
                  }
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
