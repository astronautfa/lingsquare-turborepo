import { Metadata } from "next"

import { SeparatorGradient } from "@ui/components"
import { SettingsSidebarNav } from "@/components/settings-sidebar-nav"

import { BellRegular, BellSolid, CreditCardRegular, CreditCardSolid, DesktopRegular, DesktopSolid, LanguageRegular, LanguageSolid, UserRegular, UserSolid } from "@ui/icons"

import { siteConfig } from "@lingsquare/misc/constants"

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
        icons: { regular: <UserRegular className="mr-4 h-4 w-4" />, selected: <UserSolid className="mr-4 h-4 w-4" /> }
    },
    {
        title: "Languages",
        href: "/settings/languages",
        icons: { regular: <LanguageRegular className="mr-4 h-4 w-4" />, selected: <LanguageSolid className="mr-4 h-4 w-4" /> }
    },
    {
        title: "Display",
        href: "/settings/display",
        icons: { regular: <DesktopRegular className="mr-4 h-4 w-4" />, selected: <DesktopSolid className="mr-4 h-4 w-4" /> }
    },
    {
        title: "Notifications",
        href: "/settings/notifications",
        icons: { regular: <BellRegular className="mr-4 h-4 w-4" />, selected: <BellSolid className="mr-4 h-4 w-4" /> }
    },
    {
        title: "Billing",
        href: "/settings/billing",
        icons: { regular: <CreditCardRegular className="mr-4 h-4 w-4" />, selected: <CreditCardSolid className="mr-4 h-4 w-4" /> }
    }
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="flex-grow">
            <div className="space-y-0.5 p-3">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set your preferences.
                </p>
            </div>
            <SeparatorGradient gradient className="opacity-30 my-2" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0 py-4 px-2">
                <aside className="lg:w-[250px]">
                    <SettingsSidebarNav items={sidebarNavItems} />
                </aside>
                <div className="w-full">{children}</div>
            </div>
        </div>
    )
}
