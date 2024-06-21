"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
} from "@ui/components/dialog";

export function AuthModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function navigateBack() {
    router.back();
  }

  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && navigateBack()}>
      <DialogContent className="sm:max-w-[430px] p-2">
        {children}
      </DialogContent>
    </Dialog>
  );
}
