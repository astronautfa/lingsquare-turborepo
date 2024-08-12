import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const DesktopRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
                d="M512 48H64c-8.8 0-16 7.2-16 16V256H528V64c0-8.8-7.2-16-16-16zm64 208v48 48c0 35.3-28.7 64-64 64H364.3l8 48H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H352 224 152c-13.3 0-24-10.7-24-24s10.7-24 24-24h51.7l8-48H64c-35.3 0-64-28.7-64-64V304 256 64C0 28.7 28.7 0 64 0H512c35.3 0 64 28.7 64 64V256zM48 304v48c0 8.8 7.2 16 16 16H239.5c.3 0 .6 0 .8 0h95.2c.3 0 .6 0 .8 0H512c8.8 0 16-7.2 16-16V304H48zM252.3 464h71.3l-8-48H260.3l-8 48z" />
        </svg>
    ),
);

const DesktopSolid = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
                d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z" />
        </svg>
    ),
);

DesktopRegular.displayName = "DesktopRegular";
DesktopSolid.displayName = "DesktopSolid";

export { DesktopRegular, DesktopSolid };
