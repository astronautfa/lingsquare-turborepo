"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import {
  toast,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PasswordInput,
  SubmitButton
} from "@ui/components";
import { resetPassword } from "@lingsquare/auth/actions";
import { cn } from "@lingsquare/misc/utils";
import { ExclamationTriangleRegular } from "@ui/icons";

export function ResetPassword({ token, className }: { token: string, className?: string }) {

  const [state, formAction] = useFormState(resetPassword, null);

  useEffect(() => {
    if (state?.error) {
      toast(state.error, {
        icon: <ExclamationTriangleRegular className="h-5 w-5 text-destructive" />,
      });
    }
  }, [state?.error]);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} >
          <div className="space-y-2 mb-5">
            <input type="hidden" name="token" value={token} />
            <Label>New Password</Label>
            <PasswordInput
              name="password"
              required
              autoComplete="new-password"
              placeholder="Enter your password"
              className="mb-2"
            />
            <Label>Repeat Password</Label>
            <PasswordInput
              name="confirm-password"
              required
              autoComplete="confirm-password"
              placeholder="Repeat your password"
            />
            {state?.error && (
              <div className="mt-4 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive flex items-center gap-2">
                <ExclamationTriangleRegular className="w-5 h-5" />
                <p className="">
                  {state?.error}
                </p>
              </div>
            )}
          </div>
          <SubmitButton className="w-full">Reset Password</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
