"use client"

import { usePathname } from "next/navigation"
import { Sidebar, SidebarBody, SidebarSection } from "@ui/components"
import SidebarItem from "./sidebar-item"
interface SettingsSidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string,
    icons:
    {
      regular: React.ReactNode,
      selected: React.ReactNode
    }
  }[]
}

export function SettingsSidebarNav({ className, items, ...props }: SettingsSidebarNavProps) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarBody className="flex md:flex-col">
        <SidebarSection id="settings" className="flex md:flex-col">
          {items.map((navItem, index) => (
            <SidebarItem collapsed={false} key={index} href={navItem.href} label={navItem.title} selectedIcon={navItem?.icons.selected} regularIcon={navItem?.icons.regular} settings layoutId='settings' />
          ))}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}
