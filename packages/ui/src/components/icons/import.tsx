import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const ImportRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
                d="M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zM216 408V305.9l31 31c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0l-72 72c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l31-31V408c0 13.3 10.7 24 24 24s24-10.7 24-24z" />
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
