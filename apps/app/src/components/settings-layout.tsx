import { Metadata } from "next"

import { ScrollArea, SeparatorGradient } from "@ui/components"
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

export function SettingsLayout({ children }: SettingsLayoutProps) {
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



export function SettingsLayoutModal({ children }: SettingsLayoutProps) {
    return (
        <div className="relative isolate flex w-full h-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
            <aside style={{ width: "250px" }} className={'inset-y-0 left-0 max-lg:hidden transition-all duration-100 ease-in-out'}>
                <SettingsSidebarNav items={sidebarNavItems} />
            </aside>
            <main className={'flex flex-1 flex-col lg:min-w-0 transition-all duration-100 ease-in-out lg:pr-2 pb-1'}>
                <ScrollArea className="settings-modal-content grow p-3 lg:rounded-lg lg:bg-white lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
                    <div className="mx-auto p-3">
                        {children}
                    </div>
                </ScrollArea>
            </main >
        </div>
    )
}