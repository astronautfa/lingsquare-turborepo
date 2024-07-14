"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { LoadingButton } from "./loading-button";
import type { ButtonProps } from "../ui/button";

// TODO : fix useform state

const SubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { pending } = useFormStatus();
    return (
      <LoadingButton
        ref={ref}
        {...props}
        loading={pending}
        className={className}
      >
        {children}
      </LoadingButton>
    );
  },
);
SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
