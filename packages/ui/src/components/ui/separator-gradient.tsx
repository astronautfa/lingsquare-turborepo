import { cn } from "@lingsquare/misc/utils";

type SeparatorProps = {
    /**
     * @default ""
     */
    label?: React.ReactNode;
    /**
     * @default false
     */
    gradient?: boolean;
    className?: string;
};
//======================================
export const SeparatorGradient = ({
    label,
    gradient = false,
    className = '',
}: SeparatorProps) => {
    if (label) {
        return (
            <div className="flex items-center w-full">
                <div
                    className={cn(
                        'rounded-full w-full h-[1px]',
                        gradient
                            ? 'bg-gradient-to-r from-transparent to-muted-foreground opacity-40'
                            : 'bg-transparent',
                        className
                    )}
                ></div>
                <div className="text-gray-600 uppercase w-fit dark:text-gray-300 text-nowrap mx-2 text-sm" >
                    {label}
                </div>
                <div
                    className={cn(
                        'rounded-full w-full h-[1px]',
                        gradient
                            ? 'bg-gradient-to-r from-muted-foreground to-transparent opacity-40'
                            : 'bg-transparent',
                        className
                    )}
                ></div>
            </div>
        );
    }
    return (
        <div
            className={cn(
                'rounded-full w-full h-[1px]',
                gradient
                    ? 'bg-gradient-to-r from-transparent via-zinc-500 dark:via-zinc-200 to-transparent dark:from-zinc-800 dark:to-zinc-700'
                    : 'bg-zinc-300 dark:bg-zinc-800',
                className
            )}
        />
    );
};