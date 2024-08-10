/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          orange: colors.orange,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment } from 'react'
import {
    CheckIcon, MinusIcon
} from 'lucide-react'
import Link from 'next/link';


const tiers: {
    name: string;
    href: string;
    priceMonthly: number | string;
    description: string;
}[] = [
        { name: 'Free', href: '#', priceMonthly: 0, description: 'Quis suspendisse ut fermentum neque vivamus non tellus.' },
        {
            name: 'Premium',
            href: '#',
            priceMonthly: 6,
            description: 'Quis eleifend a tincidunt pellentesque. A tempor in sed.',
        },
        {
            name: 'Enterprise',
            href: '#',
            priceMonthly: '-',
            description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
        },
    ]
const sections = [
    {
        name: 'Features',
        features: [
            { name: 'Molestie lobortis massa.', tiers: { Basic: true, Essential: true, Premium: true } },
            { name: 'Urna purus felis.', tiers: { Basic: true, Essential: true, Premium: true } },
            { name: 'Tellus pulvinar sit dictum.', tiers: { Essential: true, Premium: true } },
            { name: 'Convallis.', tiers: { Essential: 'Up to 20 users', Premium: 'Up to 50 users' } },
        ],
    },
    {
        name: 'Reporting',
        features: [
            { name: 'Adipiscing.', tiers: { Basic: true, Essential: true, Premium: true } },
            { name: 'Eget risus integer.', tiers: { Essential: true, Premium: true } },
            { name: 'Gravida leo urna velit.', tiers: { Premium: true } },
            { name: 'Elementum ut dapibus mi feugiat cras nisl.', tiers: { Premium: true } },
        ],
    },
    {
        name: 'Support',
        features: [
            { name: 'Sit dignissim.', tiers: { Basic: true, Essential: true, Premium: true } },
            { name: 'Congue at nibh et.', tiers: { Essential: true, Premium: true } },
            { name: 'Volutpat feugiat mattis.', tiers: { Essential: true, Premium: true } },
            { name: 'Tristique pellentesque ornare diam sapien.', tiers: { Premium: true } },
        ],
    },
]
const faqs = [
    {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        id: 2,
        question: 'How do you make holy water?',
        answer:
            'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    {
        id: 3,
        question: 'Why do you never see elephants hiding in trees?',
        answer:
            "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        id: 4,
        question: 'What do you call someone with no body and no nose?',
        answer: 'Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    {
        id: 5,
        question: "Why can't you hear a pterodactyl go to the bathroom?",
        answer:
            'Because the pee is silent. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    {
        id: 6,
        question: 'Why did the invisible man turn down the job offer?',
        answer:
            "He couldn't see himself doing it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
]


export default function PricingPage() {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-10 px-4 pt-28 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center">Pricing</h2>
                <p className='text-md text-slate-700 text-center mt-4'>
                    Clear and intuitive payment plans help us keep <span className='font-bold text-sky-700'>LingSquare</span> as open as possible
                </p>
                {/* Comparison table */}
                <div className="max-w-2xl mx-auto bg-white py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    {/* xs to lg */}
                    <div className="space-y-24 lg:hidden">
                        {tiers.map((tier, index) => (
                            <section key={tier.name}>
                                <div className="px-4 mb-8">
                                    <h2 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h2>
                                    <p className="mt-4">
                                        {tier.priceMonthly !== '-' ?
                                            <>
                                                <span className="text-4xl font-extrabold text-gray-900">${tier.priceMonthly}</span>
                                                <span className="text-base font-medium text-gray-500">/mo</span>
                                            </> :
                                            <span className="text-3xl font-extrabold text-gray-900">Contact us</span>
                                        }
                                    </p>
                                    <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                                    {
                                        tier.name === "Premium" ?
                                            <div className='hover:scale-105 transition-transform'>
                                                <button className="block w-full mt-5 py-2 animate-shimmer items-center justify-center rounded-md border border-sky-800 bg-[linear-gradient(110deg,#0f3f7c,45%,#5a89cc,55%,#0f3f7c)] bg-[length:200%_100%] px-6 text-sm text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                    {tier.name}
                                                </button>
                                            </div> :
                                            <div className='hover:scale-105 transition-transform'>
                                                <button className="block w-full mt-5 py-2 items-center justify-center rounded-md border border-sky-800 bg-[linear-gradient(110deg,#0f3f7c,45%,#0f3f7c,55%,#0f3f7c)] bg-[length:200%_100%] px-6 text-sm text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                    {tier.name}
                                                </button>
                                            </div>
                                    }

                                </div>

                                {sections.map((section) => (
                                    <table key={section.name} className="w-full">
                                        <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                                            {section.name}
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th className="sr-only" scope="col">
                                                    Feature
                                                </th>
                                                <th className="sr-only" scope="col">
                                                    Included
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {section.features.map((feature) => (
                                                <tr key={feature.name} className="border-t border-gray-200">
                                                    <th className="py-5 px-4 text-sm font-normal text-gray-500 text-left" scope="row">
                                                        {feature.name}
                                                    </th>
                                                    <td className="py-5 pr-4">
                                                        {typeof (feature.tiers as any)[tier.name] === 'string' ? (
                                                            <span className="block text-sm text-gray-700 text-right">{(feature.tiers as any)[tier.name]}</span>
                                                        ) : (
                                                            <>
                                                                {(feature.tiers as any)[tier.name] === true ? (
                                                                    <CheckIcon className="ml-auto h-5 w-5 text-green-500" aria-hidden="true" />
                                                                ) : (
                                                                    <MinusIcon className="ml-auto h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                )}

                                                                <span className="sr-only">{(feature.tiers as any)[tier.name] === true ? 'Yes' : 'No'}</span>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ))}

                            </section>
                        ))}
                    </div>

                    {/* lg+ */}
                    <div className="hidden lg:block">
                        <table className="w-full h-px table-fixed">
                            <caption className="sr-only">Pricing plan comparison</caption>
                            <thead>
                                <tr>
                                    <th className="pb-4 pl-6 pr-6 text-sm font-medium text-gray-900 text-left" scope="col">
                                        <span className="sr-only">Feature by</span>
                                        <span>Plans</span>
                                    </th>
                                    {tiers.map((tier) => (
                                        <th
                                            key={tier.name}
                                            className="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left"
                                            scope="col"
                                        >
                                            {tier.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="border-t border-gray-200 divide-y divide-gray-200">
                                <tr>
                                    <th className="py-8 pl-6 pr-6 align-top text-sm font-medium text-gray-900 text-left" scope="row">
                                        Pricing
                                    </th>
                                    {tiers.map((tier) => (
                                        <td key={tier.name} className="h-full py-8 px-6 align-top">
                                            <div className="h-full flex flex-col justify-between">
                                                <div>
                                                    <p>
                                                        {tier.priceMonthly !== '-' ?
                                                            <>
                                                                <span className="text-4xl font-bold text-gray-900">${tier.priceMonthly}</span>
                                                                <span className="text-base font-medium text-gray-500">/mo</span>
                                                            </> :
                                                            <span className="text-3xl font-bold text-gray-900">Contact us</span>
                                                        }
                                                    </p>
                                                    <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                                                </div>
                                                {
                                                    tier.name === "Premium" ?
                                                        <div className='hover:scale-105 transition-transform'>
                                                            <button className="block w-full mt-5 py-2 animate-shimmer items-center justify-center rounded-md border border-sky-800 bg-[linear-gradient(110deg,#0f3f7c,45%,#5a89cc,55%,#0f3f7c)] bg-[length:200%_100%] px-6 text-sm text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                                {tier.name}
                                                            </button>
                                                        </div> :
                                                        <div className='hover:scale-105 transition-transform'>
                                                            <button className="block w-full mt-5 py-2 items-center justify-center rounded-md border border-sky-800 bg-[linear-gradient(110deg,#0f3f7c,45%,#0f3f7c,55%,#0f3f7c)] bg-[length:200%_100%] px-6 text-sm text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                                {tier.name}
                                                            </button>
                                                        </div>
                                                }
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                                {sections.map((section) => (
                                    <Fragment key={section.name}>
                                        <tr>
                                            <th
                                                className="py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left"
                                                colSpan={4}
                                                scope="colgroup"
                                            >
                                                {section.name}
                                            </th>
                                        </tr>
                                        {section.features.map((feature) => (
                                            <tr key={feature.name}>
                                                <th className="py-5 pl-6 pr-6 text-sm font-normal text-gray-500 text-left" scope="row">
                                                    {feature.name}
                                                </th>
                                                {tiers.map((tier) => (
                                                    <td key={tier.name} className="py-5 px-6">
                                                        {typeof (feature.tiers as any)[tier.name] === 'string' ? (
                                                            <span className="block text-sm text-gray-700">{(feature.tiers as any)[tier.name]}</span>
                                                        ) : (
                                                            <>
                                                                {(feature.tiers as any)[tier.name] === true ? (
                                                                    <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                                                                ) : (
                                                                    <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                )}

                                                                <span className="sr-only">
                                                                    {(feature.tiers as any)[tier.name] === true ? 'Included' : 'Not included'} in {tier.name}
                                                                </span>
                                                            </>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    <div className='pt-8 pl-4'>
                        <p className='text-md text-slate-700 mt-5'>
                            <span className='font-bold text-sky-800'>LingSquare</span> free plan is all you need to start learning a new language
                        </p>
                        <p className='text-sm text-slate-500 mt-4'>
                            As most Premium features require us to pay additional fees to third parties to host our app and provide translation services, we have introduced a premium plan for the more serious learners. Contributions from premium users allow us to cover all costs and also help the development of our product. We are dedicated to provide you with the best language learning tool you could leverage in your language acquisition journey.
                        </p>
                    </div>
                </div>
            </div>

            {/* <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">Frequently asked questions</h2>
                    <div className="mt-12">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="space-y-2">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">{faq.question}</dt>
                                    <dd className="text-base text-gray-500">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div> */}

        </div>
    )
}
