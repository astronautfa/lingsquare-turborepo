"use client"

import * as React from "react"

import { dataTableConfig, type DataTableConfig } from "@lingsquare/misc/constants"
import {
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components"

type FeatureFlagValue = DataTableConfig["featureFlags"][number]["value"]

interface DecksTableContextProps {
  featureFlags: FeatureFlagValue[]
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagValue[]>>
}

const DecksTableContext = React.createContext<DecksTableContextProps>({
  featureFlags: [],
  setFeatureFlags: () => { },
})

export function useDecksTable() {
  const context = React.useContext(DecksTableContext)
  if (!context) {
    throw new Error("useDecksTable must be used within a DecksTableProvider")
  }
  return context
}

export function DecksTableProvider({ children }: React.PropsWithChildren) {
  const [featureFlags, setFeatureFlags] = React.useState<FeatureFlagValue[]>([])

  return (
    <DecksTableContext.Provider
      value={{
        featureFlags,
        setFeatureFlags,
      }}
    >
      <div className="w-full overflow-x-auto">
        <ToggleGroup
          type="multiple"
          variant="outline"
          size="sm"
          value={featureFlags}
          onValueChange={(value: FeatureFlagValue[]) => setFeatureFlags(value)}
          className="w-fit"
        >
          {dataTableConfig.featureFlags.map((flag) => (
            <Tooltip key={flag.value} delayDuration={250}>
              <ToggleGroupItem
                value={flag.value}
                className="whitespace-nowrap px-3 text-xs"
                asChild
              >
                <TooltipTrigger>
                  {flag.label}
                </TooltipTrigger>
              </ToggleGroupItem>
              <TooltipContent
                align="start"
                side="bottom"
                sideOffset={6}
                className="flex max-w-60 flex-col space-y-1.5 border bg-background py-2 font-semibold text-foreground"
              >
                <div>{flag.tooltipTitle}</div>
                <div className="text-xs text-muted-foreground">
                  {flag.tooltipDescription}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </ToggleGroup>
      </div>
      {children}
    </DecksTableContext.Provider>
  )
}
