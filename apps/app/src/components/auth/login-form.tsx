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
import { LoginSchema } from "@/lib/validators/auth";
import SocialAuth from "./social-form";
import { SeparatorWithText } from "@ui/components/separator";
import { loginWithEmailAndPassword } from "@/actions/auth";
import { revalidatePath } from "next/cache";

export default function LoginForm() {
    const queryString =
        typeof window !== "undefined" ? window?.location.search : "";
    const urlParams = new URLSearchParams(queryString);

    // Get the value of the 'next' parameter
    const next = urlParams.get("next");

    return (
        <div className="w-full sm:w-[26rem] bg-background dark:lg:bg-zinc-900 dark:border-zinc-800 rounded-md">
            <div className="space-y-5">
                <div className="text-center space-y-1 py-3">
                    <h2 className="text-xl font-bold tracking-tight">Login</h2>
                    <p className="text-muted-foreground">
                        Welcome back!
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
        // const supabase = createClient();
        if (!isPending) {
            // startTransition(async () => {
            //     const { error } = await supabase.auth.signInWithPassword({
            //         email: data.email,
            //         password: data.password,
            //     });
            //     if (error) {
            //         toast.error(error.message);
            //     } else {
            //         router.push(redirectTo);
            //     }
            // });
            startTransition(async () => {
                const result = await loginWithEmailAndPassword(data);

                const { error } = JSON.parse(result);
                if (error?.message) {
                    toast.error(error.message);
                    console.log('Error message', error.message);
                    form.reset({ password: '' });
                    return;
                }

                toast.success('successfully logged in');
                router.push('/')
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
                                "mr-2",
                                !isPending ? "hidden" : "block animate-spin"
                            )}
                        />
                        Continue
                    </Button>
                </div>
            </form>

        </Form>
    );
}
