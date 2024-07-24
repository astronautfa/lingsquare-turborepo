"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@ui/lib/utils"
import { buttonVariants } from "@ui/components/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string,
    icon: React.ReactNode
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
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent",
            "justify-start p-3 sm:p-4 flex"
          )}
        >
          <span className="hidden sm:block">
            {item.icon}
          </span>
          <span className="text-xs sm:text-sm">
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  )
}
