"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@ui/components/input";
import { Button, buttonVariants } from "@ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/card";
import { Label } from "@ui/components/label";
import { SubmitButton } from "@ui/molecules/submit-button";
import { sendPasswordResetLink } from "@lingsquare/auth/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Paths } from "@/consts/paths";
import { cn } from "@ui/lib/utils";

export function SendResetEmail({ className, modal }: { className?: string, modal?: boolean }) {
  const [state, formAction] = useFormState(sendPasswordResetLink, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast("A password reset link has been sent to your email.");
      router.push(Paths.Login);
    }
    if (state?.error) {
      toast(state.error, {
        icon: <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />,
      });
    }
  }, [state?.error, state?.success]);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <div className="space-y-2">
            <Label>Your Email</Label>
            <Input
              required
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>
          {state?.error && (
            <div className="mt-4 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <p className="">
                {state?.error}
              </p>
            </div>
          )}
          <div className="space-y-2 mt-10">
            <SubmitButton className="w-full">Reset Password</SubmitButton>
            {!modal && <Button variant="outline" className="w-full" asChild>
              <Link href="/">Cancel</Link>
            </Button>}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Not signed up yet?{" "}
          <Link href={Paths.Signup} className={buttonVariants({ variant: 'ghost' })}>
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
