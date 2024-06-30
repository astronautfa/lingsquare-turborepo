"use client";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/card";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
// import { ExclamationTriangleIcon } from "@/components/icons";
import {
  logout,
  verifyEmail,
  resendVerificationEmail as resendEmail,
} from "@/lib/auth/actions";
import { SubmitButton } from "@ui/molecules/submit-button";
import { User } from "lucia";

export const VerifyCode = ({ user }: { user: User }) => {
  const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, null);
  const [resendState, resendAction] = useFormState(resendEmail, null);
  const codeFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resendState?.success) {
      toast("Email sent!");
    }
    if (resendState?.error) {
      toast(resendState.error, {
        // icon: <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />,
      });
    }
  }, [resendState?.error, resendState?.success]);

  useEffect(() => {
    if (verifyEmailState?.error) {
      toast(verifyEmailState.error, {
        // icon: <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />,
      });
    }
  }, [verifyEmailState?.error]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          Verification code was sent to <strong>{user.email}</strong>. Check
          your spam folder if you can't find the email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <form ref={codeFormRef} action={verifyEmailAction}>
            <Label htmlFor="code">Verification code</Label>
            <Input className="mt-2" type="text" id="code" name="code" required />
            <SubmitButton className="mt-4 w-full">Verify</SubmitButton>
          </form>
          <form action={resendAction}>
            <SubmitButton className="w-full" variant="secondary">
              Resend Code
            </SubmitButton>
          </form>
          <form action={logout}>
            <SubmitButton variant="link" className="p-0 font-normal">
              want to use another email? Log out now.
            </SubmitButton>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
