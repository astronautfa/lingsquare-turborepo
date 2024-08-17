'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    buttonVariants,
    ButtonProps,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@ui/components";

import { HidableSidebarLabel } from '@ui/components';
import { cn } from "@lingsquare/misc/utils";

const classes = cn(
    // Base
    'flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/3 font-normal text-zinc-950 sm:py-2 sm:text-sm/5',
    // Leading icon/icon-only
    'data-[slot=icon]:*:size-5 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-zinc-500 sm:data-[slot=icon]:*:size-5',
    // Trailing icon (down chevron or similar)
    'data-[slot=icon]:last:*:ml-auto data-[slot=icon]:last:*:size-5 sm:data-[slot=icon]:last:*:size-4',
    // Avatar
    'data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6',
    // Hover
    'data-[hover]:bg-primary/90 data-[slot=icon]:*:data-[hover]:fill-zinc-950',
    // Active
    'data-[active]:bg-zinc-950/5 data-[slot=icon]:*:data-[active]:fill-zinc-950',
    // Current
    'data-[slot=icon]:*:data-[current]:fill-zinc-950',
    // Dark mode
    'dark:text-white dark:data-[slot=icon]:*:fill-zinc-400',
    'dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[hover]:fill-white',
    'dark:data-[active]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white',
    'dark:data-[slot=icon]:*:data-[current]:fill-white'
);
interface SidebarItemProps {
    collapsed: boolean;
    href: string;
    label: string;
    selectedIcon: React.ReactNode;
    regularIcon: React.ReactNode;
    children?: React.ReactNode;
    settings?: boolean
    layoutId: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    collapsed,
    href,
    label,
    selectedIcon,
    regularIcon,
    children,
    settings = false,
    layoutId

}) => {
    const pathname = usePathname(); // Correct way to retrieve pathname
    const ref = React.useRef<HTMLDivElement>(null);

    var selected

    if (!settings) {
        selected = href.toString().split('/')[1] === pathname.split('/')[1]
    } else {
        selected = href === pathname
    }

    return (
        <span className="relative">
            {selected && (
                <motion.span
                    transition={{
                        layout: {
                            duration: 0.2,
                            ease: 'easeOut',
                        },
                    }}
                    layoutId={layoutId}
                    className="absolute inset-y-2 -left-3 w-0.5 rounded-full bg-zinc-950 dark:bg-white"
                />
            )}
            <Tooltip>
                <TooltipTrigger className='w-full'>
                    <Link href={href as any}>
                        <div
                            className={cn(classes, buttonVariants({
                                variant: "nav", size: 'sm'
                            }), 'pl-[10px]')}
                            data-current={selected ? 'true' : undefined}
                            ref={ref}
                        >
                            <div className={'text-muted-foreground'}>
                                {selected ? selectedIcon : regularIcon}
                            </div>
                            {children}
                            <HidableSidebarLabel collapsed={collapsed}>
                                {label}
                            </HidableSidebarLabel>
                        </div>
                    </Link>
                </TooltipTrigger>
                {collapsed && (
                    <TooltipContent side='right'>
                        <p>{label}</p>
                    </TooltipContent>
                )}
            </Tooltip>
        </span>
    );
};

export default SidebarItem;
