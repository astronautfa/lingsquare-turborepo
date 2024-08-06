"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

import {
  Button,
  buttonVariants,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  HidableSidebarLabel
} from "@ui/components";

import { cn } from "@lingsquare/misc/utils";
import { useIsMounted } from "@/components/hooks/use-is-mounted";

export function ModeToggle({ collapsed }: { collapsed: boolean }) {
  const { setTheme, theme } = useTheme();
  const isMounted = useIsMounted();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn(buttonVariants({ variant: "nav" }), 'pl-2.5 bg-transparent text-primary h-9 transition-all duration-250', collapsed && 'rounded-full')}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <div className='w-5 relative mb-5'>
            <SunIcon className="absolute w-[1.3rem] text-zinc-400 h-[1.3rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
            <MoonIcon className="absolute w-[1.3rem] text-zinc-500 h-[1.3rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
          </div>
          <div className="ml-3">
            <HidableSidebarLabel collapsed={collapsed}>
              {isMounted() ? theme === "dark" ? "Light Mode" : "Dark Mode" : "Switch Mode"}
            </HidableSidebarLabel>
          </div>
          <span className="sr-only">Switch Theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">{isMounted() ? theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode" : "Switch Mode"}</TooltipContent>
    </Tooltip>
  );
}
