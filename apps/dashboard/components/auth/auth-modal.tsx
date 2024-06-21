"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
} from "@ui/components/dialog";

import { Button } from "@ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/card"
import { Input } from "@ui/components/input"
import { Label } from "@ui/components/label"
import { BsGoogle } from "react-icons/bs"
import { Separator } from "@ui/components/separator"
import Link from "next/link";
import { useToggle } from "@/hooks/use-toggle";

export function AuthModal() {
  const router = useRouter();

  function navigateBack() {
    router.back();
  }

  const [loginFormDisplay, toggle] = useToggle()

  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && navigateBack()}>
      <DialogContent className="sm:max-w-[420px]">
        <Card className="mx-auto max-w-sm lg:w-[400px] border-none">
          <CardHeader>
            {loginFormDisplay ?
              <>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </> :
              <>
                <CardTitle className="text-xl">Register</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </>
            }
          </CardHeader>
          <CardContent>
            {loginFormDisplay ? <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Separator />
              <Button variant="outline" className="w-full">
                <BsGoogle className="mr-2" />
                Login with Google
              </Button>
            </div>
              :
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                <Separator />
                <Button variant="outline" className="w-full">
                  <BsGoogle className="mr-2" />
                  Register with Google
                </Button>
              </div>
            }
            {
              loginFormDisplay ?
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Button variant={'ghost'} onClick={toggle} >
                    Register
                  </Button>
                </div> :
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Button variant={'ghost'} onClick={toggle} >
                    Login
                  </Button>
                </div>
            }
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
