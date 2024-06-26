'use client'

import React, { useEffect, useState } from 'react'
import { NavbarItem } from './navbar'

import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent, useOverlayScrollbars } from "overlayscrollbars-react";

import {
  Sheet,
  SheetContent,
} from "@ui/components/sheet"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/tooltip"

import LingsquareSidebar from './lingsquare-sidebar'
import LingsquareNavbar from './lingsquare-navbar'
import { Button, buttonVariants } from '@ui/components/button'
import { ArrowRightCircle, FullscreenIcon, Search } from 'lucide-react'
import { cn } from '@ui/lib/utils'
import { DropdownMenuShortcut } from '@ui/components/dropdown-menu'
import { Input } from '@ui/components/input'
import { BellAlertIcon } from '@heroicons/react/20/solid'
import { UserNav } from './user-nav';
import { useTheme } from 'next-themes';
import { setDisplayCommand } from '@/state/command';
import HeaderIcons from './header-icons';
import Link from 'next/link';
import getUserSession from '@/lib/get-user-session';
import { RxCaretRight, RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import { LuArrowRight } from 'react-icons/lu';
import { useIsMounted } from '@/hooks/use-is-mounted';

function OpenMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
    </svg>
  )
}

function MobileSidebar({ open, close, children }: React.PropsWithChildren<{ open: boolean; close: () => void }>) {
  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent side='sidebar'>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export function SidebarLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const { theme } = useTheme();

  const [initBodyOverlayScrollbars] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        theme: theme === 'dark' ? 'os-theme-light' : 'os-theme-dark',
      },
    },
  });

  useEffect(() => {
    initBodyOverlayScrollbars(document.body);
  }, [theme, initBodyOverlayScrollbars])

  const isMounted = useIsMounted();

  return (
    <OverlayScrollbarsComponent
      defer
    >
      <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 md:pr-1">
        {/* Sidebar on desktop */}
        <div className={cn("fixed inset-y-0 left-0 max-lg:hidden transition-all duration-200 ease-in-out", !collapsed ? 'w-64' : 'w-[66px]', fullscreen && 'w-4', !isMounted() && 'w-64')}>
          <Tooltip >
            <TooltipTrigger asChild className={cn('absolute top-24 -right-3 transition-all duration-75 border hover:scale-110',
              !collapsed && 'rotate-180',
              fullscreen ? 'opacity-0' : 'opacity-100'
            )} >
              <Button variant={'collapse'} size={'collapse'} onClick={() => { setCollapsed((prev) => !prev) }} >
                <RxCaretRight height={26} width={26} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>{isMounted() ? collapsed ? 'Expand Sidebar' : "Collapse Sidebar" : "Toggle Sidebar"}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild className={cn('absolute transition-transform duration-100', fullscreen ? '-right-[10px] bottom-11' : '-right-3 bottom-12', !isMounted() && '-right-3 bottom-11')}>
              <Button className={'hover:scale-110 transition-all border flex'} variant={'collapse'} size={'collapse'} onClick={() => { setFullscreen((prev) => !prev) }} >
                {fullscreen ?
                  <RxExitFullScreen height={26} width={26} />
                  :
                  <RxEnterFullScreen height={26} width={26} />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>{fullscreen ? 'Exit Fullscreen' : "Enter Fullscreen"}</p>
            </TooltipContent>
          </Tooltip>

          <div className={cn("fixed inset-y-0 left-0 max-lg:hidden transition-all duration-200 ease-in-out", !collapsed ? 'w-64' : 'w-[66px]', fullscreen && 'hidden', !isMounted() && 'w-64')}>
            <LingsquareSidebar collapsed={collapsed} />
          </div>
        </div>

        {/* Sidebar on mobile */}
        <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
          <LingsquareSidebar collapsed={collapsed} />
        </MobileSidebar>

        {/* Navbar on mobile */}
        <header className="flex items-center px-4 lg:hidden">
          <div className="py-2.5">
            <NavbarItem onClick={() => setShowSidebar(true)} aria-label="Open navigation">
              <OpenMenuIcon />
            </NavbarItem>
          </div>
          <div className="min-w-0 flex-1"><LingsquareNavbar collapsed={true} /></div>
        </header>

        {/* Content */}
        <main className={cn("flex flex-1 flex-col pb-2 lg:min-w-0 lg:pr-2 transition-all duration-200 ease-in-out", !collapsed ? 'lg:pl-64 ' : 'lg:pl-[66px]', fullscreen && 'lg:pl-2')}>
          <div className={cn('lg:h-14 lg:flex items-center hidden gap-1 mr-1 opacity-100 transition-all duration-75', fullscreen && 'lg:h-2 opacity-0 hidden')}>
            <div className="relative ml-auto flex-1 md:grow-0" onClick={() => setDisplayCommand(true)}>
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="rounded-lg bg-background pl-8 md:w-[260px] cursor-pointer"
              />
              <DropdownMenuShortcut className='mt-0.5 absolute right-4 top-3 '>⌘K</DropdownMenuShortcut>
            </div>
            <HeaderIcons />
          </div>
          <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            <div className="mx-auto max-w-6xl">{children}</div>
          </div>
        </main >
      </div >
    </OverlayScrollbarsComponent >
  )
}

