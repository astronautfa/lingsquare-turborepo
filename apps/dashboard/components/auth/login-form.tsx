import Link from "next/link"

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

export function LoginForm() {
    return (
        <Card className="mx-auto max-w-sm lg:w-[400px] border-none">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
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
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register">
                        Register
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
