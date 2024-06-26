"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { PasswordInput } from "@ui/molecules/password-input";
import { Button, buttonVariants } from "@ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/card";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { signup } from "@/lib/auth/actions";
import { SubmitButton } from "@ui/molecules/submit-button";
import { cn } from "@ui/lib/utils";
import { Paths } from "@/consts/paths";
import ExclamationTriangleIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon";

// TODO : Repeat password error

export function Signup({ className, modal }: { className?: string, modal?: boolean }) {
  const [state, formAction] = useFormState(signup, null);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to enjoy the full experience</CardDescription>
      </CardHeader>
      <CardContent>

        <form action={formAction} className="space-y-4">
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
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <PasswordInput
              name="confirm-pass"
              required
              autoComplete="confirm-password"
              placeholder="Repeat your password"
            />
          </div>

          {state?.fieldError ? (
            <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-3 text-[0.8rem] font-medium text-destructive">
              {Object.values(state.fieldError).map((err) => (
                <li className="gap-2 items-center flex ml-1" key={err}>
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
            <SubmitButton className="w-full">Sign Up</SubmitButton>
            {!modal && <Button variant="outline" className="w-full" asChild>
              <Link href="/">Cancel</Link>
            </Button>}
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
