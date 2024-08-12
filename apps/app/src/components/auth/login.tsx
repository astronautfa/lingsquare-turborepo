"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import {
  Input,
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  PasswordInput,
  SubmitButton
} from "@ui/components";
import { login } from "@lingsquare/auth/actions"
import { cn } from "@lingsquare/misc/utils";
import { Paths } from "@lingsquare/misc/constants"
import { ExclamationTriangleRegular } from "@ui/icons";

// TODO : add login with google

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
