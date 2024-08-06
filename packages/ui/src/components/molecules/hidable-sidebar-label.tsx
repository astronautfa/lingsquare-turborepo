import { cn } from "@lingsquare/misc/utils"

export function SidebarLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
    return <p {...props} className={cn(className, 'truncate text-[13px]')} />
}

export const HidableSidebarLabel = ({ collapsed, children }: { collapsed: Boolean, children: React.ReactNode }) => {
    return (
        <SidebarLabel className={cn({
            'transition-opacity duration-200': true,
            'lg:opacity-0 delay-0': collapsed,
            'lg:opacity-100 delay-50': !collapsed,
        })}>
            {children}
        </SidebarLabel>
    )
}