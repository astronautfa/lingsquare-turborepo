"use client";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@ui/components";
import { useModalContext } from "@/components/modal/modal-provider";
import { cn } from "@lingsquare/misc/utils";


export function RouteInterceptedModal({ className, children }: { className?: string, children: React.ReactNode }) {
    const router = useRouter();

    const { lastPathnameBeforeModal } = useModalContext()

    function navigateBack() {
        router.push(lastPathnameBeforeModal as any)
    }

    return (
        <Dialog defaultOpen onOpenChange={(open) => !open && navigateBack()}>
            <DialogTitle></DialogTitle>
            <DialogContent className={cn('flex justify-center items-center max-w-fit', className)}>
                {children}
            </DialogContent>
        </Dialog >
    );
}