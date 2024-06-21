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
import { Separator } from "@ui/components/separator"
import { BsGoogle } from "react-icons/bs"

export function RegisterForm() {
    return (
        <Card className="mx-auto max-w-sm lg:w-[400px] border-none">
            <CardHeader>
                <CardTitle className="text-xl">Register</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
