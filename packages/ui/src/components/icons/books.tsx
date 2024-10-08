import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const BooksRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M0 64C0 28.7 28.7 0 64 0H176 336h64c26.5 0 48 21.5 48 48V368c0 20.9-13.4 38.7-32 45.3V480h16c8.8 0 16 7.2 16 16s-7.2 16-16 16H64c-35.3 0-64-28.7-64-64l0 0L0 64zM320 32H192V206.7l54-43.2c5.8-4.7 14.1-4.7 20 0l54 43.2V32zM160 32H64C46.3 32 32 46.3 32 64l0 328.6c9.4-5.4 20.3-8.6 32-8.6H400c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16H352V240c0 6.2-3.5 11.8-9.1 14.4s-12.1 1.9-16.9-1.9l-70-56-70 56c-4.8 3.8-11.4 4.6-16.9 1.9s-9.1-8.3-9.1-14.4V32zM64 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H384V416H64z" />
        </svg>
    ),
);

const BooksSolid = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props}
            ref={ref}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M0 96C0 43 43 0 96 0h96V190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5V0h32 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32z" />
        </svg>
    ),
);

BooksRegular.displayName = "BooksRegular";
BooksSolid.displayName = "BooksSolid";

export { BooksRegular, BooksSolid };
