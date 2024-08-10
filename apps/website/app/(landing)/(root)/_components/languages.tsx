import Link from "next/link";
import React from "react";

const LanguageCards = () => {
    return (
        <div className="py-12 px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-8">
                <h2 className="text-base font-semibold leading-7 text-sky-600">Languages</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Languages we currently support
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    We will be expanding our language catalogue every month
                </p>
            </div>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <LanguageCard
                    title="English"
                    subtitle="English"
                    href="#"
                    fromColor='from-red-600'
                    toColor='to-blue-700'
                    viaColor='via-white'
                    gradientStyle='bg-gradient-to-t'
                />
                <LanguageCard
                    title="German"
                    subtitle="German"
                    href="#"
                    fromColor='from-yellow-400'
                    toColor='to-black'
                    viaColor='via-red-600'
                    gradientStyle='bg-gradient-to-t' />
                <LanguageCard
                    title="French"
                    subtitle="French"
                    href="#"
                    toColor='to-red-600'
                    fromColor='from-blue-700'
                    viaColor='via-white'
                    gradientStyle='bg-gradient-to-r' />
                <LanguageCard
                    title="Spanish"
                    subtitle="Spanish"
                    href="#"
                    fromColor='from-red-700'
                    toColor='to-red-700'
                    viaColor='via-yellow-400'
                    gradientStyle='bg-gradient-to-t'
                />
            </div>
        </div>
    );
};

const LanguageCard = ({ title, subtitle, Icon, href, fromColor, toColor, viaColor, gradientStyle }: any) => {
    return (
        <Link
            href={href}
            className="w-full p-4 h-40 rounded border-[1px] border-slate-200 group-hover:border-slate-900 relative overflow-hidden group bg-white"
        >
            <div className={`absolute inset-0 ${gradientStyle} ${fromColor} ${toColor} ${viaColor}  group-hover:opacity-100 transition-opacity duration-500 opacity-60`} />
            <Icon />
            <h3 className="font-semibold bottom-4 absolute text-xl text-black group-hover:text-white group-hover:text-border-red-900 z-10 duration-300">
                {title}
            </h3>
        </Link>
    );
};


export default LanguageCards;