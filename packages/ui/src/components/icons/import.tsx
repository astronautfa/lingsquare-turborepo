import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const ImportRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
                d="M320 480H64c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32H192V144c0 26.5 21.5 48 48 48H352V448c0 17.7-14.3 32-32 32zM240 160c-8.8 0-16-7.2-16-16V32.5c2.8 .7 5.4 2.1 7.4 4.2L347.3 152.6c2.1 2.1 3.5 4.6 4.2 7.4H240zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V163.9c0-12.7-5.1-24.9-14.1-33.9L254.1 14.1c-9-9-21.2-14.1-33.9-14.1H64zM208 278.6l52.7 52.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-80-80c-6.2-6.2-16.4-6.2-22.6 0l-80 80c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L176 278.6V400c0 8.8 7.2 16 16 16s16-7.2 16-16V278.6z" />
        </svg>
    ),
);

const ImportSolid = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512">
            <path
                d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />
        </svg>
    ),
);

ImportRegular.displayName = "ImportRegular";
ImportSolid.displayName = "ImportSolid";

export { ImportRegular, ImportSolid };