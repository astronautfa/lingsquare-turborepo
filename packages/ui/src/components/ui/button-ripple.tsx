// https://ibelick.com/lab/button-ripple-effect
'use client'

import React, { MouseEvent } from "react";

type ButtonRippleEffectProps = {
    variant: "neutral" | "blue" | "green" | "red";
};

const spanCn = {
    neutral: "bg-neutral-100 dark:bg-neutral-600",
    blue: "bg-blue-100",
    green: "bg-green-100",
    red: "bg-red-100",
};

const buttonCn = {
    neutral:
        "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900",
    blue: "bg-blue-600 text-blue-50",
    green: "bg-emerald-600 text-emerald-50",
    red: "bg-red-600 text-red-50",
};

export const ButtonRippleEffect: React.FC<ButtonRippleEffectProps> = ({
    variant,
}) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const x = e.clientX - button.getBoundingClientRect().left;
        const y = e.clientY - button.getBoundingClientRect().top;
        const ripples = document.createElement("span");

        ripples.style.cssText = `
      left: ${x}px; 
      top: ${y}px; 
      position: absolute; 
      transform: translate(-50%, -50%); 
      pointer-events: none; 
      border-radius: 50%; 
      animation: ripple 1.4s linear infinite; 
      transition: 0.5s;`;

        ripples.classList.add(...spanCn[variant].split(" "));

        button.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 1400);
    };

    return (
        <>
            <button
                className={`relative h-8 overflow-hidden rounded-lg px-3 py-0 text-sm leading-8 ${buttonCn[variant]}`}
                onClick={handleClick}
            >
                Go Pro
            </button>
        </>
    );
};
