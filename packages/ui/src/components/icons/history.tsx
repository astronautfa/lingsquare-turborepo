import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const HistoryRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M32 132V48c0-8.8-7.2-16-16-16S0 39.2 0 48V176c0 8.8 7.2 16 16 16H144c8.8 0 16-7.2 16-16s-7.2-16-16-16H53.6C89.5 84.3 166.7 32 256 32c123.7 0 224 100.3 224 224s-100.3 224-224 224c-73.3 0-138.3-35.2-179.2-89.6c-5.3-7.1-15.3-8.5-22.4-3.2s-8.5 15.3-3.2 22.4C97.9 471.8 172.2 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C159.6 0 75.7 53.3 32 132zm224-4c-8.8 0-16 7.2-16 16V256c0 4.2 1.7 8.3 4.7 11.3l80 80c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L272 249.4V144c0-8.8-7.2-16-16-16z" />
        </svg>
    ),
);

const HistorySolid = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
        </svg>
    ),
);

HistoryRegular.displayName = "HistoryRegular";
HistorySolid.displayName = "HistorySolid";

export { HistoryRegular, HistorySolid };
