"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Button, buttonVariants } from "@ui/components/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { toast } from "sonner";
import { createClient } from "@lingsquare/supabase/client/client"
import { cn } from "@ui/lib/utils"
import Link from "next/link";
import { LoginSchema } from "@/lib/validations";
import SocialAuth from "./social-form";
import { SeparatorWithText } from "@ui/components/separator";

export default function LoginForm() {
    const queryString =
        typeof window !== "undefined" ? window?.location.search : "";
    const urlParams = new URLSearchParams(queryString);

    // Get the value of the 'next' parameter
    const next = urlParams.get("next");

    return (
        <div className="w-full sm:w-[26rem] bg-background sm:p-5 dark:border-zinc-800 rounded-md">
            <div className="p-1 space-y-5">
                <div className="text-center space-y-3 py-3">
                    <h1 className="">Login to <span className="font-bold text-blue-900">LingSquare</span></h1>
                    <p className="text-sm">
                        Welcome back! Please sign in to continue
                    </p>
                </div>
                <SocialAuth redirectTo={next || "/"} />
                <SeparatorWithText text="or" />
                <SignInForm redirectTo={next || "/"} />
            </div>
        </div>
    );
}

export function SignInForm({ redirectTo }: { redirectTo: string }) {
    const [passwordReveal, setPasswordReveal] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof LoginSchema>) {
        const supabase = createClient();
        if (!isPending) {
            startTransition(async () => {
                const { error } = await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                });
                if (error) {
                    toast.error(error.message);
                } else {
                    router.push(redirectTo);
                }
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@gmail.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                Password
                            </FormLabel>
                            <FormControl>
                                <div className=" relative">
                                    <Input
                                        type={
                                            passwordReveal ? "text" : "password"
                                        }
                                        {...field}
                                    />
                                    <div
                                        className="absolute right-2 top-[30%] cursor-pointer group"
                                        onClick={() =>
                                            setPasswordReveal(!passwordReveal)
                                        }
                                    >
                                        {passwordReveal ? (
                                            <FaRegEye className=" transition-all" />
                                        ) : (
                                            <FaRegEyeSlash className=" transition-all" />
                                        )}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <div className="pt-5">
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        <AiOutlineLoading3Quarters
                            className={cn(
                                "pr-1",
                                !isPending ? "hidden" : "block animate-spin"
                            )}
                        />
                        Continue
                    </Button>
                </div>
            </form>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className={buttonVariants({ variant: 'ghost' })}>
                    Register
                </Link>
            </div>
        </Form>
    );
}
