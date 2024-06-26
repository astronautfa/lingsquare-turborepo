"use client";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
} from "@ui/components/dialog";
import { useModalContext } from "@/components/modal/modal-provider";


export function RouteInterceptedModal({ children }: { children: React.ReactNode }) {
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