import { Metadata } from "next"

import { siteConfig } from "@lingsquare/misc/constants"
import SettingsLayout from "@/components/settings-layout"

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
    <div className="space-y-5 w-[300px] sm:w-[500px] md:w-[700px] lg:w-[1000px] h-[600px] sm:h-[700px] lg:h-[800px] flex flex-col">
      <SettingsLayout>
        {children}
      </SettingsLayout>
    </div>
  )
}

