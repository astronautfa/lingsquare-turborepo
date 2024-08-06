import { cn } from "@lingsquare/misc/utils";

import { Loader2Icon } from "lucide-react";

export const Spinner = ({ className }: { className?: string }) => {
  return <Loader2Icon className={cn("animate-spin", className)} />;
};
