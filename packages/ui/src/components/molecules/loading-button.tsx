"use client";

import { forwardRef } from "react";
import { Spinner, Button, type ButtonProps } from "@ui/components";

import { cn } from "@lingsquare/misc/utils"
export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading = false, className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        disabled={props.disabled ? props.disabled : loading}
        className={cn(className, "relative")}
      >
        {loading ? (
          <div className="absolute inset-0 grid place-items-center">
            <Spinner className="h-4 w-4" />
          </div>
        ) :
          <span className={cn(loading ? "opacity-0" : "flex gap-2 items-center")}>{children}</span>
        }
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
