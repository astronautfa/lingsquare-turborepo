"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  PasswordInputWithConfirm,
  SeparatorGradient,
  SubmitButton
} from "@ui/components";
import { signup } from "@lingsquare/auth/actions";
import { cn } from "@lingsquare/misc/utils";
import { Paths } from "@lingsquare/misc/constants"
import { useState } from "react";
import { AppleIcon, ExclamationTriangleRegular, GoogleIcon } from "@ui/icons";

// TODO : Repeat password error

export function Signup({ className }: { className?: string }) {
  const [state, formAction] = useFormState(signup, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to enjoy the full experience</CardDescription>
      </CardHeader>
      <CardContent>

        <form action={formAction} className="space-y-3">
          <div className="space-y-2">
            <Link
              href={"/api/login/google" as any}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "w-full",
              )}
            >
              <GoogleIcon className="mr-3 h-4 w-4 stroke-white" />
              Sign up with Google
            </Link>
            <Link
              href={"/api/login/apple" as any}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "w-full",
              )}
            >
              <AppleIcon className="mr-3 h-5 w-5 stroke-white" />
              Sign up with Apple
            </Link>
          </div>
          <SeparatorGradient label={'or'} gradient />
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              required
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <PasswordInputWithConfirm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              name="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <PasswordInputWithConfirm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              name="confirm-password"
              required
              autoComplete="confirm-password"
              placeholder="Repeat your password"
            />
          </div>

          {state?.fieldError ? (
            <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-3 text-[0.8rem] font-medium text-destructive">
              {Object.values(state.fieldError).map((err) => (
                <li className="gap-2 items-center flex ml-1" key={err}>
                  <ExclamationTriangleRegular className="h-5 w-5 text-destructive" />
                  {err}
                </li>
              ))}
            </ul>
          ) : state?.formError && (
            <div className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive flex items-center gap-2">
              <ExclamationTriangleRegular className="w-5 h-5" />
              <p className="">
                {state?.formError}
              </p>
            </div>
          )}

          <div className="space-y-2 pt-2">
            <SubmitButton className="w-full">Sign Up</SubmitButton>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Cancel</Link>
            </Button>
          </div>

        </form>
        <div className="text-center text-sm mt-4">
          <h1>
            Already have account?{" "}
            <Link
              href={Paths.Login}
              className={buttonVariants({ variant: 'ghost' })}
            >
              Login
            </Link>
          </h1>
        </div>
      </CardContent>
    </Card >
  );
}
