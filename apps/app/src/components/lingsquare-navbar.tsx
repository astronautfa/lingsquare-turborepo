import React from 'react'

import { NavbarItem } from '@/components/navbar'
import { Navbar, NavbarSpacer, NavbarSection } from "@ui/components"
import { UserNav } from './user-nav'

import { ExploreRegular, BooksRegular } from '@ui/icons'

const LingsquareNavbar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Navbar className=''>
      {/* <NavbarSpacer /> */}
      <NavbarSection>
        <NavbarItem href={"/search" as any} aria-label="Search">
          <ExploreRegular />
        </NavbarItem>
        <NavbarItem href="/library" aria-label="Library">
          <BooksRegular />
        </NavbarItem>
        <UserNav collapsed={collapsed} />
      </NavbarSection>
    </Navbar>
  )
}

export default LingsquareNavbar
