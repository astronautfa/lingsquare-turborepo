'use client'

import React, { useContext } from 'react'
import { AnimatePresence } from 'framer-motion';

import {
    DropdownMenuShortcut,
    Input,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@ui/components';

import { SearchRegular } from '@ui/icons';
import { MenuContext } from 'kmenu';

const SidebarSearch = ({ isCollapsed }: { isCollapsed: boolean }) => {

    const { setOpen } = useContext(MenuContext)

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className='relative mb-2 cursor-pointer select-none' onClick={() => setOpen(1)}>
                    <SearchRegular className="absolute left-3 top-3 h-4 w-4 text-muted-foreground hover:text-primary" />
                    <Input
                        type="search"
                        placeholder="Search"
                        className="rounded-md bg-background pl-8 pr-1 cursor-pointer"
                    />
                    {!isCollapsed &&
                        <AnimatePresence>
                            <DropdownMenuShortcut className='mt-[1px] absolute right-4 top-3 cursor-pointer'>⌘K</DropdownMenuShortcut>
                        </AnimatePresence>
                    }
                </div>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent>
                <p>Command Menu ⌘K</p>
            </TooltipContent>}
        </Tooltip>

    )
}

export default SidebarSearch