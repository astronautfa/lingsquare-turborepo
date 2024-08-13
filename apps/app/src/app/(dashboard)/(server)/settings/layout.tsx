import { Metadata } from "next"

import SettingsLayout from "@/components/settings-layout"

import { siteConfig } from "@lingsquare/misc/constants"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s Settings | ${siteConfig.name}`,
  },
  description: "LingSquare settings page",
}

export default function SettingsLayoutPage(
  { children }:
    {
      children:
      React.ReactNode
    }
) {
  return (
    <div className="space-y-5">
      <SettingsLayout>
        {children}
      </SettingsLayout>
    </div>
  )
}
