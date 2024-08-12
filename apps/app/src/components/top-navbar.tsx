import { Button, buttonVariants } from '@ui/components'
import { cn } from "@lingsquare/misc/utils"
import Link from 'next/link'
import React from 'react'
import { UserNav } from './user-nav'
import { BellLight } from '@ui/icons'
import { Paths } from "@lingsquare/misc/constants"
import { User } from 'lucia'
import { useSession } from './auth/session-provider'

const TopNavbar = () => {

    const { session } = useSession();

    if (!session) {
        return (
            <div>
                <Link
                    href={Paths.Login}
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "hidden shadow-sm lg:flex"
                    )}
                >
                    Sign In
                </Link>
            </div>
        );
    } else {
        return (
            <div className='flex gap-0.5'>
                <Button variant={'nav'} size={'icon'} className='justify-center items-center flex'>
                    <BellLight className='w-[18px] h-[18px] opacity-70' />
                </Button>
                <UserNav collapsed={true} />
            </div>
        )
    }
}

export default TopNavbar