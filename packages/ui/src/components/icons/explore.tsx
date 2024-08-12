import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const ExploreRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M28.7 348.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l10-10C99 394.1 145.1 412.1 192 415.4V480H80c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H224V415.4c51.9-3.7 102.7-25.4 142.4-65c83.7-83.7 87.3-217.1 10.9-305.1l10-10c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L343.8 33.6c-6.2 6.2-6.2 16.4 0 22.6c75 75 75 196.5 0 271.5s-196.5 75-271.5 0c-6.2-6.2-16.4-6.2-22.6 0L28.7 348.7zM80 192a128 128 0 1 1 256 0A128 128 0 1 1 80 192zm288 0A160 160 0 1 0 48 192a160 160 0 1 0 320 0z" />
        </svg>
    ),
);

const ExploreSolid = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M15 367c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l18.5-18.5c34.3 27.7 74.9 43.8 116.5 48.3V464H88c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V430.7c49.1-5.3 96.8-26.7 134.4-64.3c81.7-81.7 87.1-211 16.1-298.9L401 49c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L332.5 49.6c-9.4 9.4-9.4 24.6 0 33.9c68.7 68.7 68.7 180.2 0 248.9s-180.2 68.7-248.9 0c-9.4-9.4-24.6-9.4-33.9 0L15 367zm193-15a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
    ),
);

ExploreRegular.displayName = "ExploreRegular";
ExploreSolid.displayName = "ExploreSolid";

export { ExploreRegular, ExploreSolid };
