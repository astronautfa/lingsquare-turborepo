import { cn } from "@lingsquare/misc/utils";
import { forwardRef, type SVGProps } from "react";

const NotesRegular = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg ref={ref}
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M128 96c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32V256H368c-26.5 0-48 21.5-48 48v80H160c-17.7 0-32-14.3-32-32V96zM446.2 288c-1.6 4.5-4.2 8.7-7.6 12.1l-74.5 74.5c-3.4 3.4-7.6 6-12.1 7.6V304c0-8.8 7.2-16 16-16h78.2zM96 96V352c0 35.3 28.7 64 64 64H341.5c17 0 33.3-6.7 45.3-18.7l74.5-74.5c12-12 18.7-28.3 18.7-45.3V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zM320 496c0-8.8-7.2-16-16-16H128c-53 0-96-43-96-96l0-240c0-8.8-7.2-16-16-16s-16 7.2-16 16V384c0 70.7 57.3 128 128 128H304c8.8 0 16-7.2 16-16z" />
        </svg>
    ),
);

const NotesSolid = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg
            className={cn(className)}
            fill="currentColor" stroke="currentColor"
            {...props}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M160 32c-35.3 0-64 28.7-64 64V352c0 35.3 28.7 64 64 64H339.2c4.3 0 8.6-.4 12.8-1.3V320c0-17.7 14.3-32 32-32h94.7c.9-4.2 1.3-8.5 1.3-12.8V96c0-35.3-28.7-64-64-64H160zM384 352v45.7V416l96-96H461.7 416 384v32zM296 464H136c-48.6 0-88-39.4-88-88l0-224c0-13.3-10.7-24-24-24s-24 10.7-24 24V376c0 75.1 60.9 136 136 136H296c13.3 0 24-10.7 24-24s-10.7-24-24-24z" />
        </svg>
    ),
);

NotesRegular.displayName = "NotesRegular";
NotesSolid.displayName = "NotesSolid";

export { NotesRegular, NotesSolid };
