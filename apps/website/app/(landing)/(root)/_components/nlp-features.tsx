
import React from "react";
import Image from "next/image";
import nlpLong from "@/public/nlp-long.png";
import nlpShort from "@/public/nlp-short.png";

const NlpFeatures = () => {

  return (
    <div className="md:mx-auto flex flex-col items-center justify-center py-40">
      <div className="mx-auto max-w-2xl lg:text-center px-4 pb-10">
        <h2 className="text-base font-semibold leading-7 text-sky-600">
          Linguistic features
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Understand the relation between words
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Go beyond mere translations and understand how each word contributes
          to the overall sentence.
        </p>
      </div>
      <div className="hidden lg:block">
        <Image
          placeholder='blur'
          src={nlpLong}
          alt="NLP Features"
          height={600}
          width={900}
        />
      </div>
      <div className="block lg:hidden">
        <Image
          placeholder='blur'
          src={nlpShort}
          alt="NLP Features"
          height={300}
          width={500}
        />
      </div>
    </div>
  );
};

export default NlpFeatures;
