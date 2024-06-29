"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
// import { ExclamationTriangleIcon } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/card";
import { SubmitButton } from "@ui/molecules/submit-button";
import { PasswordInput } from "@ui/molecules/password-input";
import { Label } from "@ui/components/label";
import { resetPassword } from "@/lib/auth/actions";
import { cn } from "@ui/lib/utils";

export function ResetPassword({ token, className }: { token: string, className?: string }) {
  const [state, formAction] = useFormState(resetPassword, null);

  useEffect(() => {
    if (state?.error) {
      toast(state.error, {
        // icon: <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />,
      });
    }
  }, [state?.error]);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="token" value={token} />
          <div className="space-y-2">
            <Label>New Password</Label>
            <PasswordInput
              name="password"
              required
              autoComplete="new-password"
              placeholder="********"
            />
          </div>
          <SubmitButton className="w-full">Reset Password</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
