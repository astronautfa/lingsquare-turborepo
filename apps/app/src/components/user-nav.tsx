import { logout } from "@/lib/auth/actions"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@ui/components/avatar"
import { Button } from "@ui/components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@ui/components/dropdown-menu"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useSession } from "./auth/session-provider"

export const UserNav = ({ collapsed }: {
    collapsed: Boolean
}) => {

    const { user } = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {collapsed ?
                    <div className="h-[36px] mt-1 cursor-pointer">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/01.png" alt="account" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </div>
                    :
                    <Button variant="nav" className="relative pl-1">
                        <span className="flex min-w-0 items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/01.png" alt="account" />
                                <AvatarFallback>SC</AvatarFallback>
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
                                <p className="text-sm font-medium leading-none">alireza</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user && user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                }
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <Link href={'/settings/billing'} >
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/settings'} >
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Languages</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Get help
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