import React from 'react'

import { NavbarItem } from '@/components/navbar'
import { Navbar, NavbarSpacer, NavbarSection } from "@ui/molecules/navbar"
import { UserNav } from './user-nav'

import {
  MagnifyingGlassIcon,
  BookOpenIcon,
} from '@heroicons/react/20/solid'

const LingsquareNavbar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Navbar className=''>
      {/* <NavbarSpacer /> */}
      <NavbarSection>
        <NavbarItem href="/search" aria-label="Search">
          <MagnifyingGlassIcon />
        </NavbarItem>
        <NavbarItem href="/library" aria-label="Library">
          <BookOpenIcon />
        </NavbarItem>
        <UserNav collapsed={collapsed} />
      </NavbarSection>
    </Navbar>
  )
}

export default LingsquareNavbar
