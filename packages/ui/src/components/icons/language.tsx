import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const LanguageRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor">
            <path
                d="M256 480C132.3 480 32 379.7 32 256c0-11.8 .9-23.3 2.7-34.6l3 6.7c9.3 21 27.3 37 49.2 43.9l63 19.7c15.5 4.9 26.1 19.2 26.1 35.5v15c0 17 9.6 32.6 24.8 40.2c4.4 2.2 7.2 6.7 7.2 11.6v22.7c0 26.2 21.2 47.4 47.4 47.4c21.8 0 40.7-14.8 46-35.9l4.4-17.6c2.6-10.2 9.2-19 18.3-24.2l11.6-6.6c19.9-11.4 32.2-32.6 32.2-55.6v-8.3c0-17-6.7-33.3-18.7-45.3l-3.9-3.9c-12-12-28.3-18.7-45.3-18.7H251.3c-5 0-9.9-1.2-14.3-3.4l-45.9-22.9c-2.1-1-3.8-2.7-4.8-4.8l-.7-1.4c-2.3-4.6-.4-10.2 4.2-12.5c2.2-1.1 4.8-1.3 7.1-.5l24.2 8.1c15 5 31.5-.7 40.3-13.8c8.6-12.9 7.7-30-2.2-41.9l-17.9-21.5c-2.5-3-2.5-7.4 .1-10.3l20.1-23.5c13.2-15.4 15.3-37.4 5.2-55.1L259.6 32C337.1 33.2 405 73.8 444.3 134.6l-38.2 15.3c-23.6 9.4-35.7 35.6-27.7 59.7l16.9 50.7c5.2 15.6 18 27.4 33.9 31.4L475 303.2C453.3 404.3 363.5 480 256 480zM48 172.7C77.3 99.7 143.8 45.7 224 34.3l14.9 26.1c3.4 5.9 2.7 13.2-1.7 18.4l-20.1 23.5c-12.7 14.8-12.9 36.6-.4 51.6l17.9 21.5c.9 1.1 1 2.6 .2 3.7c-.8 1.2-2.2 1.7-3.6 1.2L207 172.1c-10.4-3.5-21.7-2.7-31.5 2.2c-20.4 10.2-28.7 35-18.5 55.4l.7 1.4c4.1 8.3 10.9 15 19.2 19.2l45.9 22.9c8.9 4.4 18.7 6.8 28.6 6.8h48.8c8.5 0 16.6 3.4 22.6 9.4l3.9 3.9c6 6 9.4 14.1 9.4 22.6v8.3c0 11.5-6.2 22.1-16.1 27.8l-11.6 6.6c-16.7 9.6-28.8 25.5-33.5 44.2l-4.4 17.6c-1.7 6.9-7.9 11.7-15 11.7c-8.5 0-15.4-6.9-15.4-15.4V393.9c0-17-9.6-32.6-24.8-40.2c-4.4-2.2-7.2-6.7-7.2-11.6v-15c0-30.3-19.7-57-48.6-66.1l-63-19.7c-13.2-4.1-23.9-13.7-29.5-26.3L48 172.7zM480 256c0 5.2-.2 10.3-.5 15.4l-42.6-10.6c-5.3-1.3-9.6-5.3-11.3-10.5l-16.9-50.7c-2.7-8 1.4-16.8 9.2-19.9l41.8-16.7c13 28.3 20.2 59.9 20.2 93.1zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
    ),
);

const LanguageSolid = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} >
            <path
                d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
        </svg>
    ),
);

LanguageRegular.displayName = "LanguageRegular";
LanguageSolid.displayName = "LanguageSolid";

export { LanguageRegular, LanguageSolid };
