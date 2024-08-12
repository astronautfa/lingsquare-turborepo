import { logout } from "@lingsquare/auth/actions"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@ui/components"

import { useSession } from "./auth/session-provider"
import { CreditCardRegular, LanguageRegular, SettingsRegular, UserRegular } from "@ui/icons"

export const UserNav = ({ collapsed }: {
    collapsed: Boolean
}) => {

    const { user } = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {collapsed ?
                    <Button variant="nav" className="justify-center items-center flex relative" size={'icon'}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/01.png" alt="account" />
                            <AvatarFallback>{user?.email.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </Button>
                    :
                    <Button variant="nav" className="justify-center items-center flex relative pl-1" size={'icon'}>
                        <span className="flex min-w-0 items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/01.png" alt="account" />
                                <AvatarFallback>{user?.email.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <AnimatePresence>
                                <motion.span
                                    key="user-nav-span"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.05 }}
                                    exit={{ opacity: 0 }} className="min-w-0 flex items-start flex-col select-none">
                                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">alireza</span>
                                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                        {user && user.email}
                                    </span>
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </Button>
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                {collapsed &&
                    <>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{ }</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user && user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                }
                <DropdownMenuGroup>
                    <Link href={'/settings'} >
                        <DropdownMenuItem>
                            <UserRegular className="w-4 h-4 text-muted-foreground mr-2" />
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/settings/billing'} >
                        <DropdownMenuItem>
                            <CreditCardRegular className="w-4 h-4 text-muted-foreground mr-2" />
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/settings'} >
                        <DropdownMenuItem>
                            <SettingsRegular className="w-4 h-4 text-muted-foreground mr-2" />
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/settings/languages'} >
                        <DropdownMenuItem>
                            <LanguageRegular className="w-4 h-4 text-muted-foreground mr-2" />
                            Languages
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Get help
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Docs
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}