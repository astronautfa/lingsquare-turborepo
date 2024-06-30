"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { Input } from "@ui/components/input";
import { Button, buttonVariants } from "@ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/card";
import { PasswordInput } from "@ui/molecules/password-input";
import { login } from "@/lib/auth/actions";
import { Label } from "@ui/components/label";
import { SubmitButton } from "@ui/molecules/submit-button"
import { cn } from "@ui/lib/utils";
import { Paths } from "@/consts/paths";
import ExclamationTriangleIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon";

export function Login({ className, modal }: { className?: string, modal?: boolean }) {
  const [state, formAction] = useFormState(login, null);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle>Log In</CardTitle>
        <CardDescription>
          Log in to your account to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
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
            <PasswordInput
              name="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-wrap justify-end">
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={Paths.ResetPassword}>Forgot password?</Link>
            </Button>
          </div>

          {state?.fieldError ? (
            <ul className="space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {Object.values(state.fieldError).map((err) => (
                <li className="gap-2 justify-start ml-1 items-center flex" key={err}>
                  <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />
                  {err}
                </li>
              ))}
            </ul>
          ) : state?.formError ? (
            <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {state?.formError}
            </p>
          ) : null}
          <div className="space-y-2">
            <SubmitButton className="w-full">Log In</SubmitButton>
            {!modal && <Button variant="outline" className="w-full" asChild>
              <Link href="/">Cancel</Link>
            </Button>}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={Paths.Signup} className={buttonVariants({ variant: 'ghost' })}>
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
