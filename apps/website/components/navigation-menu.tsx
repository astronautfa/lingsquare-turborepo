"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@ui/components"
import Image from "next/image"

import LandingLogo from "../public/LandingLogo.png";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Enjoyable Content",
        href: "/",
        description:
            "Language learning is different when you choose your own content",
    },
    {
        title: "Lookup tools",
        href: "/",
        description:
            "Comprehend words and phrases in context",
    },
    {
        title: "Progress",
        href: "/",
        description:
            "Track your progress and make learning a habit",
    },
    {
        title: "Flashcards",
        href: "/",
        description: "Save phrases and words to review later",
    },
    {
        title: "Read books",
        href: "/",
        description:
            "Read your digital library with the help of our tools",
    },
    {
        title: "Social",
        href: "/",
        description:
            "Learn socially and help others learn your native language",
    },
]

export function NavigationMenuDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] mt-80 bg-white">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <Image
                                            src={LandingLogo}
                                            alt="Landing Logo"
                                            width={40}
                                            height={50}
                                            priority
                                        />
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            LingSquare
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            A Language learning club as vast as the digital world
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/" title="Introduction">
                                What is LingSquare and why it was developed
                            </ListItem>
                            <ListItem href="/" title="How to Use">
                                How to take advantage of the platform
                            </ListItem>
                            <ListItem href="/" title="Roadmap">
                                We are dedicated to develop and ship educational tools
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] mt-80 bg-white">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/pricing" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Pricing
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
