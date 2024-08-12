import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const ExploreRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M15 367c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l18.5-18.5c34.3 27.7 74.9 43.8 116.5 48.3V464H88c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V430.7c49.1-5.3 96.8-26.7 134.4-64.3c81.7-81.7 87.1-211 16.1-298.9L401 49c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L332.5 49.6c-9.4 9.4-9.4 24.6 0 33.9c68.7 68.7 68.7 180.2 0 248.9s-180.2 68.7-248.9 0c-9.4-9.4-24.6-9.4-33.9 0L15 367zm97-159a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm240 0A144 144 0 1 0 64 208a144 144 0 1 0 288 0z" />
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
