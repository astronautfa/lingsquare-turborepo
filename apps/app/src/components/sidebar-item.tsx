'use client'

import { motion } from 'framer-motion'
import { default as React } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants, ButtonProps } from "@ui/components/button"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@ui/components/tooltip"
import HidableSidebarLabel from '@ui/molecules/hidable-sidebar-label'

import { cn } from '@ui/lib/utils'

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
)

export const SidebarItem = React.forwardRef(function SidebarItem(
    {
        collapsed,
        label,
        className,
        children,
        ...props
    }: { collapsed: boolean, label: string, className?: string; children: React.ReactNode } & (
        | Omit<ButtonProps, 'className'>
        | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'type' | 'className'>
    ),
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const pathname = usePathname()
    return (
        <span className={cn(className, 'relative')}>
            {'href' in props && props.href.toString().split('/')[1] === pathname.split('/')[1] &&
                <motion.span
                    transition={{
                        layout: {
                            duration: 0.2,
                            ease: 'easeOut',
                        },
                    }}
                    layoutId="indicator"
                    className="absolute inset-y-2 -left-3 w-0.5 rounded-full bg-zinc-950 dark:bg-white"
                />
            }
            <Tooltip>
                <TooltipTrigger className='w-full'>
                    {'href' in props ? (
                        <Link href={props.href} >
                            <div
                                className={cn(classes, buttonVariants({ variant: "nav", size: 'sm' }), 'pl-[10px]')}
                                data-current={props.href.toString().split('/')[1] === pathname.split('/')[1] ? 'true' : undefined}
                                ref={ref}
                            >
                                {children}
                                <HidableSidebarLabel collapsed={collapsed}>
                                    {label}
                                </HidableSidebarLabel>
                            </div>
                        </Link>
                    ) : (
                        <div
                            className={cn(classes, buttonVariants({ variant: "nav", size: 'sm' }), 'pl-[10px]')}
                            data-current={undefined}
                            ref={ref}
                        >
                            {children}
                            <HidableSidebarLabel collapsed={collapsed}>
                                {label}
                            </HidableSidebarLabel>
                        </div>
                    )}
                </TooltipTrigger>
                {collapsed &&
                    <TooltipContent side='right'>
                        <p>{label}</p>
                    </TooltipContent>
                }
            </Tooltip>
        </span>
    )
})
