"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import {
  Label,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  REGEXP_ONLY_DIGITS,
  SubmitButton
} from "@ui/components";

import { toast } from "sonner";
import {
  logout,
  verifyEmail,
  resendVerificationEmail as resendEmail,
} from "@lingsquare/auth/actions";
import type { User } from "lucia";
import { ExclamationTriangleRegular } from "@ui/icons";
import { cn } from "@lingsquare/misc/utils";

export const VerifyCode = ({ className, user }: { className: string, user: User }) => {
  const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, null);
  const [resendState, resendAction] = useFormState(resendEmail, null);
  const codeFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resendState?.success) {
      toast("Email sent!");
    }
    if (resendState?.error) {
      toast(resendState.error, {
        icon: <ExclamationTriangleRegular className="h-5 w-5 text-destructive" />,
      });
    }
  }, [resendState?.error, resendState?.success]);

  useEffect(() => {
    if (verifyEmailState?.error) {
      toast(verifyEmailState.error, {
        icon: <ExclamationTriangleRegular className="h-5 w-5 text-destructive" />,
      });
    }
  }, [verifyEmailState?.error]);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          Verification code was sent to <strong>{user.email}</strong> Check
          your spam folder if you can't find the email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <form ref={codeFormRef} action={verifyEmailAction}>
            <Label htmlFor="code">Verification code</Label>

            <div className="w-full flex justify-center items-center mt-3">
              <InputOTP maxLength={8} pattern={REGEXP_ONLY_DIGITS} id="code" name="code" required >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="mt-4">
              {verifyEmailState?.error && (
                <div className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive flex items-center gap-2">
                  <ExclamationTriangleRegular />
                  <p className="">
                    {verifyEmailState?.error}
                  </p>
                </div>
              )}

              {resendState?.error && (
                <div className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive flex items-center gap-2">
                  <ExclamationTriangleRegular />
                  <p className="">
                    {resendState?.error}
                  </p>
                </div>
              )}
            </div>


            <SubmitButton className="mt-4 w-full">Verify</SubmitButton>
          </form>
          <form action={resendAction}>
            <SubmitButton className="w-full" variant="secondary">
              Resend Code
            </SubmitButton>
          </form>
          <div className="w-full flex justify-center items-center">
            <span className="text-sm">Want to use another Email?</span>
            <form action={logout}>
              <SubmitButton variant="ghost" className="font-normal ml-2">
                Log out now
              </SubmitButton>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
