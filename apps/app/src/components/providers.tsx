'use client'

import React from 'react'
import { ThemeProvider } from "next-themes";
import {
    TooltipProvider,
} from "@ui/components/tooltip"
import { MenuProvider, Dimensions } from "kmenu";

const dimensions: Dimensions = {
    sectionHeight: 30,
    commandHeight: 50,
    commands: 6,
};

const Providers = ({ children, modal }: { children: React.ReactNode, modal?: React.ReactNode }) => {

    // console.log(modal)
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MenuProvider dimensions={dimensions}>
                <TooltipProvider delayDuration={200}>
                    {children}
                </TooltipProvider>
            </MenuProvider>
        </ThemeProvider>
    )
}

export default Providers
