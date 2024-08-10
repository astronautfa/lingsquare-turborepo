import Link from "next/link";
import LandingLogo from "../../../../public/LandingLogo.png";
import Image from "next/image";
import ExpandingArrow from "@/components/expanding-arrow";
import { HighlightBadge } from "@/components/highlight-badge";
import dynamic from 'next/dynamic';

const MouseIndicator = dynamic(() => import('./mouse-indicator'), {
  ssr: false,
});

const LandingHero = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate sm:pt-20 pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#646698] to-[#1973ce] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="py-32 lg:pb-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <HighlightBadge text='We are launching soon' />
              <div className="flex">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Learn a language at
                  <span className="ml-2 bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">LingSquare</span>
                </h1>
                <Image
                  src={LandingLogo}
                  alt="Landing Logo"
                  width={80}
                  height={100}
                  priority
                />
              </div>
              <p className="mt-10 text-lg leading-8 text-gray-600 text-center">
                LingSquare helps you learn a language by watching and reading
                the content you enjoy from the web. Immerse yourself in your
                target language and learn from the web.
              </p>

              <div className="mt-16 flex items-center justify-center gap-x-6">
                <Link
                  href="https://app.lingsquare.com"
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <button className="inline-flex py-2 animate-shimmer items-center justify-center rounded-md border border-sky-800 bg-[linear-gradient(110deg,#0f3f7c,45%,#5a89cc,55%,#0f3f7c)] bg-[length:200%_100%] px-6 text-sm text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    Get Started
                  </button>
                </Link>
                <Link
                  href={`/`}
                  className="group flex items-center justify-between rounded-lg px-3.5 py-2.5 gap-6 transition-colors hover:bg-sky-100 active:bg-sky-200 sm:px-4"
                >
                  <p className="text-sm font-medium text-gray-600 group-hover:text-sky-700">
                    Learn more
                  </p>
                  <ExpandingArrow className="-ml-4 h-4 w-4 text-gray-500 group-hover:text-sky-700" />
                </Link>
              </div>
            </div>
            <div className="mt-20 sm:mt-24 flex items-center justify-center">
              < MouseIndicator />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7073b7] to-[#358ae0] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
