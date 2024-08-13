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
        <>
            <div className="space-y-0.5 p-3 pb-0">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set your preferences.
                </p>
            </div>
            <SeparatorGradient />
            <div className="px-2 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 overflow-y-auto">
                <aside className="lg:w-1/5">
                    <SettingsSidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </>
    )
}
