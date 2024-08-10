'use client'

import React from "react";
import ExpandingArrow from "./expanding-arrow";

export const HighlightBadge = ({ text, dark = true }: { text: string, dark?: boolean }) => {
    return (
        <div
            className={`bg-slate-900 no-underline group mb-8 relative  shadow-2xl shadow-zinc-600 rounded-full p-px text-xs font-semibold leading-6  ${dark ? 'text-white' : 'text-slate-900'} inline-block`}
        >
            <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,120,120,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className={`relative flex space-x-2 items-center z-10 rounded-full ${dark ? 'bg-zinc-800:10' : 'bg-slate-100'} py-0.5 px-4 ring-1 ring-white/10`}>
                <span>{text}</span>
                {dark && <span className="pr-3">
                    <ExpandingArrow />
                </span>}
            </div>
            <span className="absolute -bottom-0 left-[0.5rem] h-px w-[calc(100%-1.25rem)] bg-gradient-to-r from-sky-400/0 via-sky-400/90 to-sky-400/0 transition-opacity duration-300 group-hover:opacity-40"></span>
        </div>
    );
};



