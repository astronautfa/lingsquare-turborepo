"use client"

import * as React from "react"

import { cn } from "@ui/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/select"
import { Separator } from "@ui/components/separator"
import { Button } from "@ui/components/button"
import { PlusIcon } from "@heroicons/react/20/solid"

interface AccountSwitcherProps {
  isCollapsed: boolean
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
}

export function AccountSwitcher({
  isCollapsed,
  accounts,
}: AccountSwitcherProps) {
  const [selectedAccount, setSelectedAccount] = React.useState<string | undefined>(
    accounts[0] ? accounts[0].email : undefined
  )
  const [openSelect, setOpenSelect] = React.useState<boolean>(false);

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount} onOpenChange={setOpenSelect} open={openSelect}>
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
          {accounts.find((account) => account.email === selectedAccount)?.icon}
          <span className={cn("ml-2", isCollapsed && "lg:hidden")}>
            {
              accounts.find((account) => account.email === selectedAccount)
                ?.label
            }
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.email} value={account.email}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {account.icon}
              {account.email}
            </div>
          </SelectItem>
        ))}
        <Separator className="my-1" />
        <Button variant={'nav'} size={'sm'} className="w-full flex justify-items-start pl-2.5">
          <PlusIcon width={18} height={18} className="mr-2.5" />
          <span>
            Add a new language
          </span>
        </Button>
      </SelectContent>
    </Select>
  )
}
