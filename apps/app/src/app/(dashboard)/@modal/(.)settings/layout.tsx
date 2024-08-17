import { Metadata } from "next"

import { siteConfig } from "@lingsquare/misc/constants"
import { SettingsLayoutModal as SettingsLayout } from "@/components/settings-layout"
import { RouteInterceptedModal } from "@/components/modal/route-modal"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s Settings | ${siteConfig.name}`,
  },
  description: "LingSquare settings page",
}

export default function SettingsLayoutModal({ children }: {
  children: React.ReactNode
}) {
  return (
    <RouteInterceptedModal className="p-0 bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950" >
      <div className="space-y-5 w-[370px] sm:w-[600px] md:w-[700px] lg:w-[1000px] h-[600px] sm:h-[700px] lg:h-[800px] lg:bg-zinc-100 mt-2 mb-1">
        <SettingsLayout>
          {children}
        </SettingsLayout>
      </div>
    </RouteInterceptedModal>
  )
}

