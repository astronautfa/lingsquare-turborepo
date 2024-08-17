'use client'

import { default as React } from 'react'
import { LayoutGroup } from 'framer-motion'
import { cn } from "@lingsquare/misc/utils"

export function Sidebar({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
  return <nav {...props} className={cn(className, 'flex h-full flex-col')} />
}

export function SidebarHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col border-b border-zinc-950/5 p-3 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5',
        className,
      )}
    />
  )
}

export function SidebarBody({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-1 flex-col overflow-y-auto p-3 [&>[data-slot=section]+[data-slot=section]]:mt-8',
        className
      )}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col border-t border-zinc-950/5 p-3 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5',
        className,
      )}
    />
  )
}

export function SidebarSection({ className, id, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <LayoutGroup id={id}>
      <div {...props} data-slot="section" className={cn(className, 'flex flex-col')} />
    </LayoutGroup>
  )
}

export function SidebarDivider({ className, ...props }: React.ComponentPropsWithoutRef<'hr'>) {
  return <hr {...props} className={cn(className, 'my-4 border-t border-zinc-950/5 lg:-mx-4 dark:border-white/5')} />
}

export function SidebarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div aria-hidden="true" {...props} className={cn(className, 'mt-8 flex-1')} />
}

export function SidebarHeading({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3 {...props} className={cn(className, 'mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400')} />
  )
}

// TODO : find better style for the sidebar collapse button
// TODO : completely remove headleass ui
// TODO : fix animation of account switcher

// TODO : add ripple effect to buttons
// https://www.npmjs.com/package/tailwindcss-ripple
// https://codepen.io/vituja1/pen/oNWzNwq

// TODO : Create notification component

// TODO : add breadcrumb

// TODO : add known language

// TODO : fix background colors not consistent
// TODO : add not defined page

// TODO : add support component
// TODO : open sidebar and close tooltip

// TODO : fullscreen application button
// TODO : fix mode animation

// TODO : explore cmdk with generative ui
// TODO : add the player

// TODO : sort out login

// TODO : interface language
// TODO : language settings

// TODO : check how to dub.co modals are managed

// TODO : explore zustand vs valtio
// TODO : Forgot password should be added

// TODO : Intercepting routes should be fixed
// TODO : 
