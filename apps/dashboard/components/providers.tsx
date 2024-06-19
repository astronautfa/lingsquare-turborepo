'use client'

import React from 'react'
import { ThemeProvider } from "next-themes";
import {
    TooltipProvider,
} from "@ui/components/tooltip"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider delayDuration={200}>
                {children}
            </TooltipProvider>
        </ThemeProvider>
    )
}

export default Providers
