"use client";

import { usePathname, useRouter } from "next/navigation";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@ui/components/dialog";
import { useModalContext } from "@/components/@modal/ModalProvider";


export function AuthModal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const { lastPathnameBeforeModal } = useModalContext()

    function navigateBack() {
        router.push(lastPathnameBeforeModal)
    }

    return (
        <Dialog defaultOpen onOpenChange={(open) => !open && navigateBack()}>
            <DialogContent className="flex justify-center items-center">
                {children}
            </DialogContent>
        </Dialog >
    );
}
