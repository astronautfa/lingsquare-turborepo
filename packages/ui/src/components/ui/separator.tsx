"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@lingsquare/misc/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)

const SeparatorWithText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex-1 h-[0.5px] w-full bg-border"></div>
      <div className="text-sm">{text}</div>
      <div className="flex-1 h-[0.5px] w-full bg-border"></div>
    </div>
  )
}

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator, SeparatorWithText }
