"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@lingsquare/misc/utils"
import { buttonVariants } from "@ui/components"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string,
    icons:
    {
      regular: React.ReactNode,
      selected: React.ReactNode
    }
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-1 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted text-primary"
              : "hover:bg-muted",
            "justify-start p-3 sm:p-4 flex"
          )}
        >
          <span className="hidden sm:block text-muted-foreground">
            {pathname === item.href ? item.icons.selected : item.icons.regular}
          </span>
          <span className="text-xs sm:text-sm font-normal">
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  )
}
