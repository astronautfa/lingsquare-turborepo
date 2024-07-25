import { cn } from "@ui/lib/utils"
import { LayoutGroup } from "framer-motion"
import { useId } from "react"

export function Navbar({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
    return <nav {...props} className={cn(className, 'flex flex-1 items-center gap-4 py-2.5')} />
}

export function NavbarDivider({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div aria-hidden="true" {...props} className={cn(className, 'h-6 w-px bg-zinc-950/10 dark:bg-white/10')} />
}

export function NavbarSection({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    let id = useId()

    return (
        <LayoutGroup id={id}>
            <div {...props} className={cn(className, 'flex items-center gap-2')} />
        </LayoutGroup>
    )
}

export function NavbarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div aria-hidden="true" {...props} className={cn(className, 'ml-4 flex-1')} />
}

export function NavbarLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
    return <span {...props} className={cn(className, 'truncate')} />
}
