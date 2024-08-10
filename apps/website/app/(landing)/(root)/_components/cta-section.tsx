export default function LandingCTASection() {
    return (
        <div className="isolate overflow-hidden bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 pb-20 mb-10 pt-24 sm:pt-32 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h2 className="tracking-tight text-gray-900 ">
                        <span className="block text-md text-sky-500">With your commitment and our dedication, we are</span>
                        <span className="block mt-1 text-xl md:text-2xl text-white">Redefining learning at <span className="font-semibold text-3xl md:text-4xl">LingSquare</span></span>
                    </h2>
                    <div className="relative mt-6">
                        <p className="mx-auto max-w-7xl text-lg leading-8 text-white/80">
                            We are constantly developing and shipping tools to help you learn in the age of internet.
                        </p>
                        <p className="mx-auto max-w-7xl text-lg leading-8 text-white/80">
                            How would our learning change if we had a classroom as big as the internet and a personal tutor accessible at all times?
                        </p>
                        <svg
                            viewBox="0 0 1208 1024"
                            className="absolute -top-5 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-6 md:-top-10 lg:-top-6 xl:top-0"
                        >
                            <circle cx={704} cy={612} r={1000} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" />
                            <defs>
                                <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                                    <stop stopColor="#646698" />
                                    <stop offset={2} stopColor="#1973ce" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
