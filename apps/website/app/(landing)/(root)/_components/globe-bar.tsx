import React from "react";

import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('@/components/globe'), {
    ssr: false,
});


const GlobeBar = () => {
    return (
        <div className="px-10 relative h-[400px]">
            <div className="mx-auto max-w-xl lg:text-center mb-10">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                    <span className="ml-2 bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">LingSquare</span>, language acqusition for the digital citizen
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                    We bring the world together, One phrase at a time
                </p>
            </div>
            <div
                className="absolute inset-0 blur-[118px] max-w-lg h-[600px] mx-auto sm:max-w-4xl sm:h-[500px]"
                style={{
                    background:
                        "linear-gradient(106.89deg, rgba(14, 110, 233, 0.30) 15.74%,rgba(14, 165, 233, 0.30)  80.49%, rgba(14, 70, 229, 0.4) 115.91%)",
                }}
            />
            <Globe className="top-8 opacity-50 z-5 absolute mt-10 hover:opacity-100 transition-opacity duration-1000" />
        </div>
    );
};

export default GlobeBar;
