"use client"

import * as React from "react"

import { cn } from "@lingsquare/misc/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components"
import { PlusRegular } from "@ui/icons"
interface AccountSwitcherProps {
  isCollapsed: boolean
  learningLanguages: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  speakingLanguages: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
}

export function AccountSwitcher({
  isCollapsed,
  learningLanguages,
  speakingLanguages
}: AccountSwitcherProps) {
  const [selectedAccount, setSelectedAccount] = React.useState<string | undefined>(
    learningLanguages[0] ? learningLanguages[0].label : undefined
  )
  const [openSelect, setOpenSelect] = React.useState<boolean>(false);

  return (
    <Tooltip>
      <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount} onOpenChange={setOpenSelect} open={openSelect}>
        <TooltipTrigger asChild>
          <SelectTrigger
            className={cn(
              "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 mb-2",
              isCollapsed &&
              "lg:flex lg:h-10 lg:w-[42px] lg:shrink-0 lg:items-center lg:justify-center lg:p-0 lg:[&>span]:w-auto lg:[&>svg]:hidden"
            )}
            aria-label="Select account"
            open={openSelect}
          >
            <SelectValue placeholder="Select an account">
              {learningLanguages.find((learningLanguage) => learningLanguage.label === selectedAccount)?.icon}
              <span className={cn("ml-2", isCollapsed && "lg:hidden")}>
                {
                  learningLanguages.find((learningLanguage) => learningLanguage.label === selectedAccount)
                    ?.label
                }
              </span>
            </SelectValue>
          </SelectTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch Account</p>
        </TooltipContent>
        <SelectContent>
          {learningLanguages.map((learningLanguage) => (
            <SelectItem key={learningLanguage.label} value={learningLanguage.label}>
              <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                {learningLanguage.icon}
                {learningLanguage.label}
              </div>
            </SelectItem>
          ))}
          <Separator className="my-1" />
          {speakingLanguages.map((speakingLanguage) => (
            <div key={speakingLanguage.label} className="relative flex w-full select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {speakingLanguage && speakingLanguage.icon}
              <span>
                {speakingLanguage && speakingLanguage.label}
              </span>
            </div>))}
          <Separator className="my-1" />
          <Button variant={'nav'} size={'sm'} className="w-full flex justify-items-start pl-2.5 font-normal text-muted-foreground hover:text-primary">
            <PlusRegular width={18} height={18} className="mr-2.5" />
            <span>
              Add a new language
            </span>
          </Button>
        </SelectContent>
      </Select>
    </Tooltip>
  )
}
