"use client";

import * as React from "react";
import { Button, Input, type InputProps } from "@ui/components";
import { EyeRegular, EyeSlashRegular } from "../icons";
import { cn } from "@lingsquare/misc/utils"

// TODO : move the show password to the parent element


const PasswordInputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <EyeRegular className="text-muted-foreground h-4 w-4" />
          ) : (
            <EyeSlashRegular className="text-muted-foreground h-4 w-4" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  },
);
PasswordInputComponent.displayName = "PasswordInput";

export const PasswordInput = PasswordInputComponent;

interface PasswordInputWithConfirmProps extends InputProps {
  showPassword: boolean,
  setShowPassword: (showPassword: boolean) => void
}

const PasswordInputWithConfirmComponent = React.forwardRef<HTMLInputElement, PasswordInputWithConfirmProps>(
  ({ className, showPassword, setShowPassword, ...props }, ref) => {

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <EyeRegular className="text-muted-foreground h-4 w-4" />
          ) : (
            <EyeSlashRegular className="text-muted-foreground h-4 w-4" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  },
);
PasswordInputComponent.displayName = "PasswordInput";

export const PasswordInputWithConfirm = PasswordInputWithConfirmComponent;
