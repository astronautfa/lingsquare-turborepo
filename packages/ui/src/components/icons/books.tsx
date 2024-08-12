import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const BooksRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M0 88C0 39.4 39.4 0 88 0H392c30.9 0 56 25.1 56 56V344c0 22.3-13.1 41.6-32 50.6V464h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H80c-44.2 0-80-35.8-80-80c0-2.7 .1-5.4 .4-8H0V88zM80 400c-17.7 0-32 14.3-32 32s14.3 32 32 32H368V400H80zM48 358.7c9.8-4.3 20.6-6.7 32-6.7H392c4.4 0 8-3.6 8-8V56c0-4.4-3.6-8-8-8H352V206.7c0 13.4-15.5 20.9-26 12.5L272 176l-54 43.2c-10.5 8.4-26 .9-26-12.5V48H88C65.9 48 48 65.9 48 88V358.7z" />
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
