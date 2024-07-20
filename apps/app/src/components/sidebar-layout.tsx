'use client'

import React, { useEffect, useState } from 'react'
import { NavbarItem } from './navbar'

import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent, useOverlayScrollbars } from "overlayscrollbars-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/tooltip"

import LingsquareSidebar from './lingsquare-sidebar'
import LingsquareNavbar from './lingsquare-navbar'
import { Button } from '@ui/components/button'

import { cn } from '@ui/lib/utils'
import { DropdownMenuShortcut } from '@ui/components/dropdown-menu'
import { useTheme } from 'next-themes';
import HeaderIcons from './header-icons';
import { RxCaretRight, RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import { useIsMounted } from '@/components/hooks/use-is-mounted';
import MobileSidebar from "@ui/molecules/mobile-sidebar"
import TabList from "@ui/molecules/tab-list"

function OpenMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
    </svg>
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
        <div className={cn("fixed inset-y-0 left-0 max-lg:hidden transition-all duration-100 ease-in-out", !collapsed ? 'w-64' : 'w-[66px]', fullscreen && 'w-4', !isMounted() && 'w-64')}>
          <Tooltip >
            <TooltipTrigger asChild className={cn('absolute z-10 top-[180px] transition-all duration-75 border hover:scale-110',
              !collapsed ? 'rotate-180 -right-1' : '-right-3',
              fullscreen ? 'opacity-0' : 'opacity-100'
            )} >
              <Button variant={'collapse'} size={'collapse'} onClick={() => { setCollapsed((prev) => !prev) }} >
                <RxCaretRight className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>{isMounted() ? collapsed ? 'Expand Sidebar' : "Collapse Sidebar" : "Toggle Sidebar"}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild className={cn('absolute z-10 transition-transform duration-100',
              !collapsed ? '-right-1' : '-right-3',
              fullscreen ? '-right-[10px] bottom-[80px]' : 'bottom-[85px]',
              !isMounted() && '-right-1 bottom-[85px]')}>
              <Button className={'hover:scale-110 transition-all border flex'} variant={'collapse'} size={'collapse'} onClick={() => { setFullscreen((prev) => !prev) }} >
                {fullscreen ?
                  <RxExitFullScreen className='size-3.5' />
                  :
                  <RxEnterFullScreen className='size-3' />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>{fullscreen ? 'Exit Fullscreen' : "Enter Fullscreen"}</p>
            </TooltipContent>
          </Tooltip>

          <div className={cn("fixed inset-y-0 left-0 max-lg:hidden transition-all duration-100 ease-in-out", !collapsed ? 'w-64' : 'w-[66px]', fullscreen && 'hidden', !isMounted() && 'w-64')}>
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
        <main className={cn("flex flex-1 flex-col lg:min-w-0 transition-all duration-100 ease-in-out", !collapsed ? 'lg:pl-[250px] ' : 'lg:pl-[66px]', fullscreen ? 'lg:pl-2 lg:pr-0 pb-1' : 'lg:pr-2 pb-2')}>
          <div className={cn('lg:h-12 lg:flex items-center hidden gap-1 mr-1 opacity-100 transition-all duration-75', fullscreen && 'lg:h-1 opacity-0 hidden')}>

            {/* <TabList /> */}

            <div className="ml-auto flex-1 md:grow-0">

            </div>
            <HeaderIcons />
          </div>
          <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            <div className="mx-auto">{children}</div>
          </div>
        </main >
      </div >
    </OverlayScrollbarsComponent >
  )
}

