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

const SeparatorGradient = ({ className, text }: { text?: string, className?: string }) => {
  return (
    <div className={cn("relative flex justify-center", className)}>
      <div
        className="absolute inset-x-0 top-1/2 h-[0.5px] -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-muted-foreground to-transparent opacity-30"
      />
      {text && <span className="relative z-10 bg-white px-6">{text}</span>}
    </div>
  )
}

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator, SeparatorWithText, SeparatorGradient }
