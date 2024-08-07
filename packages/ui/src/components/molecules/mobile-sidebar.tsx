import { Sheet, SheetContent } from "@ui/components";

export function MobileSidebar({ open, close, children }: React.PropsWithChildren<{ open: boolean; close: () => void }>) {
    return (
        <Sheet open={open} onOpenChange={close}>
            <SheetContent side='sidebar'>
                {children}
            </SheetContent>
        </Sheet>
    )
}