import { Metadata } from "next"

import { Separator } from "@ui/components/separator"
import { SidebarNav } from "./_components/sidebar-nav"

import {
  CreditCard,
  User,
} from "lucide-react"

import { ComputerDesktopIcon, BellIcon, LanguageIcon } from "@heroicons/react/20/solid"
import { siteConfig } from "@/consts/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s Settings | ${siteConfig.name}`,
  },
  description: "LingSquare settings page",
}

const sidebarNavItems = [
  {
    title: "Personal",
    href: "/settings",
    icon: <User className="mr-4 h-5 w-5" />
  },
  {
    title: "Languages",
    href: "/settings/languages",
    icon: <LanguageIcon className="mr-4 h-5 w-5" />
  },
  {
    title: "Display",
    href: "/settings/display",
    icon: <ComputerDesktopIcon className="mr-4 h-5 w-5" />
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: <BellIcon className="mr-4 h-5 w-5" />
  },
  {
    title: "Billing",
    href: "/settings/billing",
    icon: <CreditCard className="mr-4 h-5 w-5" />
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set your preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 overflow-y-auto">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}
