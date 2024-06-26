"use client";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
} from "@ui/components/dialog";
import { useModalContext } from "@/components/modal/modal-provider";
import { cn } from "@ui/lib/utils";


export function RouteInterceptedModal({ className, children }: { className?: string, children: React.ReactNode }) {
    const router = useRouter();

    const { lastPathnameBeforeModal } = useModalContext()

    function navigateBack() {
        router.push(lastPathnameBeforeModal)
    }

    return (
        <Dialog defaultOpen onOpenChange={(open) => !open && navigateBack()}>
            <DialogContent className={cn(className, 'flex justify-center items-center')}>
                {children}
            </DialogContent>
        </Dialog >
    );
}