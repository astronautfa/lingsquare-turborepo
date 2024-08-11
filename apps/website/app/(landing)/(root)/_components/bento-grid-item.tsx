import { cn } from "@lingsquare/misc/utils"
import React from "react";

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header: React.ReactElement;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 hover:bg-gradient-to-b from-slate-100 backdrop-blur-md to-sky-600/10 from-80% rounded-lg group/bento shadow-md h-80 mx-16 md:mx-0 bg-[url('/landing-noise.webp')] hover:shadow-xl hover:shadow-sky-900/10 transition duration-200 shadow-input p-4 border border-slate-200 justify-between flex flex-col space-y-4",
                className
            )}
        >
            {React.cloneElement(header, { title, description, icon })}
        </div>
    );
};