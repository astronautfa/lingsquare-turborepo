'use client'

import React, { useContext } from 'react'
import { AnimatePresence } from 'framer-motion';

import {
    DropdownMenuShortcut,
    Input
} from '@ui/components';

import { Search } from 'lucide-react'
import { MenuContext } from 'kmenu';

const SidebarSearch = ({ isCollapsed }: { isCollapsed: boolean }) => {

    const { setOpen } = useContext(MenuContext)

    return (
        <div className='relative mb-2 cursor-pointer select-none' onClick={() => setOpen(1)}>
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                className="rounded-md bg-background pl-8 pr-1"
            />
            {!isCollapsed &&
                <AnimatePresence>
                    <DropdownMenuShortcut className='mt-[1px] absolute right-4 top-3 cursor-pointer'>⌘K</DropdownMenuShortcut>
                </AnimatePresence>
            }
        </div>
    )
}

export default SidebarSearch