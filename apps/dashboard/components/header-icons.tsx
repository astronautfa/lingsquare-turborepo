import { Button, buttonVariants } from '@ui/components/button'
import { cn } from '@ui/lib/utils'
import Link from 'next/link'
import React from 'react'
import { UserNav } from './user-nav'
import { BellAlertIcon } from '@heroicons/react/20/solid'
import { useSession } from '@supabase/auth-helpers-react'

const HeaderIcons = () => {
    const session = useSession()

    if (!session) {
        return (
            <div>
                <Link
                    href="/login"
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
            <div className='flex gap-2'>
                <Button variant={'ghost'} size={'icon'}>
                    <BellAlertIcon className='w-[18px] h-[18px] opacity-70' />
                </Button>
                <UserNav collapsed={true} />
            </div>
        )
    }
}

export default HeaderIcons