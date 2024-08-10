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

const LandingPricing = () => {
  return (
    <section
      id="pricing"
      className="md:mx-auto flex items-center justify-center pb-20"
    >
      <div className="relative md:py-20 sm:w-11/12 md:w-10/12 lg:w-8/12 xl:7/12 w-12/12 p-3 py-10 md:rounded-xl rounded-none"
      >
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-4xl sm:h-[500px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(14, 110, 233, 0.41) 15.74%,rgba(14, 165, 233, 0.41)  80.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        />
        <div className="relative max-w-screen-2xl mx-auto md:px-8">
          <div className="max-w-xl mx-auto space-y-3 px-6 sm:text-center sm:px-0">
            <h3 className="text-sky-700 font-semibold">Pricing</h3>
            <p className="text-3xl font-semibold sm:text-4xl">
              Just start, <br className="hidden sm:inline lg:hidden" />
              we will support you
            </p>
            <div className="max-w-xl">
              <p>
                We are dedicated to develop tools helping you learn better. Our
                free tier is all you need to get started. We offer a generous
                free plan because we hate paid-ware ourselves.
              </p>
            </div>
          </div>
          <div className="sm:mt-16 justify-center sm:flex">
            {plans.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex-1 flex items-stretch flex-col mt-6 sm:mt-0 sm:rounded-2xl sm:max-w-md px-2 rounded-none ${item.isMostPop
                  && "bg-background bg-gradient-to-t from-slate-900 backdrop-blur-sm to-sky-700/90 via-blue-950/95 border-slate-600/30 from-30% border rounded-xl hover:shadow-2xl hover:shadow-sky-900/50 transition-shadow duration-500"
                  }`}>
                <div className={`p-4 py-8 space-y-4 border-b  ${item.isMostPop ? 'border-gray-400/40' : 'border-gray-700/30'} md:p-8`}>
                  <span className={`${item.isMostPop ? 'text-gray-200' : 'text-black'} font-medium`}>{item.name}</span>
                  <div className={`${item.isMostPop ? 'text-sky-200' : 'text-sky-700 '} text-3xl font-semibold`}>
                    ${item.price}{" "}
                    <span className="text-xl font-normal">/mo</span>
                  </div>
                  <p className={`${item.isMostPop ? 'text-gray-200' : 'text-gray-800 '}`}>{item.desc}</p>
                  <div className="hover:scale-105 transition-transform duration-300">
                    {item.isMostPop ? (
                      <button className="hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-3 py-3 rounded-lg w-full font-semibold text-sm duration-2000 text-white  transition-colors animate-shimmer bg-[linear-gradient(110deg,#134891,45%,#5a89cc,55%,#134891)] bg-[length:200%_100%]">
                        Get Started
                      </button>
                    ) : (
                      <button className="hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-3 py-3 rounded-lg w-full font-semibold text-sm duration-2000 text-white transition-colors bg-[linear-gradient(110deg,#134891,45%,#134891,55%,#134891)] bg-[length:200%_100%]">
                        Get Started
                      </button>
                    )}
                  </div>
                </div>
                <ul className="p-4 py-8 space-y-3 md:p-8">
                  {item.features.map((featureItem, index) => (
                    <li key={index} className={`${item.isMostPop ? "text-gray-100" : "text-black"} flex items-center gap-5`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${item.isMostPop ? "text-sky-100" : ""
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
        </div>
      </div>
    </section >
  );
};

export default LandingPricing;
