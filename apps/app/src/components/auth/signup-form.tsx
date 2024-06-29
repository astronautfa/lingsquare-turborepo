"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	REGEXP_ONLY_DIGITS,
} from "@ui/components/input-otp";
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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@ui/components/tooltip";
import { useState, useTransition } from "react";
import { cn } from "@ui/lib/utils";
import { registerWithEmailAndPassword, verifyOtp } from "@/actions/auth";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { RegisterSchema } from "@/lib/validators/auth";
import { InfoIcon } from "lucide-react";

export default function SignUp({ redirectTo, setLoginDisplay }: { redirectTo: string, setLoginDisplay?: (value: boolean) => void }) {
	const queryString =
		typeof window !== "undefined" ? window.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	const verify = urlParams.get("verify");
	const existEmail = urlParams.get("email");

	const [passwordReveal, setPasswordReveal] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(verify === "true");
	const [verifyStatus, setVerifyStatus] = useState<string>("");
	const [isPending, startTransition] = useTransition();
	const [isSendAgain, startSendAgain] = useTransition();
	const pathname = usePathname();
	const router = useRouter();
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			"confirm-pass": "",
		},
	});

	const postEmail = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		};
		// Send the POST request
		const res = await fetch("/api/signup", requestOptions);
		return await res.json();
	};

	const sendVerifyEmail = async (data: z.infer<typeof RegisterSchema>) => {
		const json = await postEmail({
			email: data.email,
			password: data.password,
		});
		if (!json.error) {
			router.replace(
				(pathname || "/") +
				"?verify=true&email=" +
				form.getValues("email")
			);
			setIsConfirmed(true);
		} else {
			if (json.error.code) {
				toast.error(json.error.code);
			} else if (json.error.message) {
				toast.error(json.error.message);
			}
		}
	};

	const inputOptClass = cn({
		" border-green-500": verifyStatus === "success",
		" border-red-500": verifyStatus === "failed",
	});

	function onSubmit(data: z.infer<typeof RegisterSchema>) {
		if (!isPending) {
			startTransition(async () => {
				// await sendVerifyEmail(data);
				const result = await registerWithEmailAndPassword({
					data,
					emailRedirectTo: `${location.origin}/auth/callback`,
				});
				const { error } = JSON.parse(result);
				if (error?.message) {
					toast.error(error.message);
					console.log('Error message', error.message);
					form.reset({ password: '', "confirm-pass": '' });
					return;
				}

				toast.success('registered successfully');

				setLoginDisplay && setLoginDisplay(true)
			});
		}
	}

	return (
		<div className="whitespace-nowrap p-1 space-x-5 overflow-hidden items-center align-top">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn(
						`space-y-3 inline-block w-full transform transition-all`,
						{
							"-translate-x-[110%]": isConfirmed,
						}
					)}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className=" font-semibold  test-sm">
									Email Address
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
								<FormLabel className="text-sm font-semibold flex items-center gap-2">
									Password
									<Tooltip>
										<TooltipTrigger asChild>
											<InfoIcon className="h-4 w-4 text-muted-foreground hover:text-inherit transition-colors duration-200" />
										</TooltipTrigger>
										<TooltipContent side="top" className="w-64 text-wrap"><p>Password must be at least 8 characters long & contain lowercase, uppercase, numbers and special characters</p></TooltipContent>
									</Tooltip>
								</FormLabel>
								<FormControl>
									<div className=" relative">
										<Input
											type={
												passwordReveal
													? "text"
													: "password"
											}
											{...field}
										/>
										<div
											className="absolute right-2 top-[30%] cursor-pointer group"
											onClick={() =>
												setPasswordReveal(
													!passwordReveal
												)
											}
										>
											{passwordReveal ? (
												<FaRegEye className=" group-hover:scale-105 transition-all" />
											) : (
												<FaRegEyeSlash className=" group-hover:scale-105 transition-all" />
											)}
										</div>
									</div>
								</FormControl>

								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirm-pass"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold">
									Confirm Password
								</FormLabel>
								<FormControl>
									<div className=" relative">
										<Input
											type={
												passwordReveal
													? "text"
													: "password"
											}
											{...field}
										/>
										<div
											className="absolute right-2 top-[30%] cursor-pointer group"
											onClick={() =>
												setPasswordReveal(
													!passwordReveal
												)
											}
										>
											{passwordReveal ? (
												<FaRegEye className=" group-hover:scale-105 transition-all" />
											) : (
												<FaRegEyeSlash className=" group-hover:scale-105 transition-all" />
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
			{/* verify email */}
			<div
				className={cn(
					`w-full inline-block h-80 text-wrap align-top transform transition-all space-y-3`,
					isConfirmed ? "-translate-x-[105%]" : "translate-x-0"
				)}
			>
				<div className="flex h-full items-center justify-center flex-col space-y-5">
					<h1 className="text-xl font-semibold text-center">
						Email Verification
					</h1>
					<p className="text-center text-sm">
						{" A verification code has been sent to "}
						<span className="font-bold">
							{verify === "true"
								? existEmail
								: form.getValues("email")}
						</span>
					</p>

					<InputOTP
						pattern={REGEXP_ONLY_DIGITS}
						id="input-otp"
						maxLength={6}
						onChange={async (value: string) => {
							if (value.length === 6) {
								document.getElementById("input-otp")?.blur();
								const res = await verifyOtp({
									email: form.getValues("email"),
									otp: value,
									type: "email",
								});
								const { error } = JSON.parse(res);
								if (error) {
									setVerifyStatus("failed");
								} else {
									setVerifyStatus("success");
									router.push(redirectTo);
								}
							}
						}}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} className={inputOptClass} />
							<InputOTPSlot index={1} className={inputOptClass} />
							<InputOTPSlot index={2} className={inputOptClass} />
							<InputOTPSlot index={3} className={inputOptClass} />
							<InputOTPSlot
								index={4}
								className={inputOptClass}
							/>
							<InputOTPSlot
								index={5}
								className={inputOptClass}
							/>
						</InputOTPGroup>
					</InputOTP>
					<div className="text-sm flex gap-2 items-center">
						<p>{"Didn't work?"} </p>
						<div
							className={buttonVariants({ variant: 'ghost', size: "sm" })}
							onClick={async () => {
								if (!isSendAgain) {
									startSendAgain(async () => {
										if (!form.getValues("password")) {
											const json = await postEmail({
												email: form.getValues("email"),
												password:
													form.getValues("password"),
											});

											if (json.error) {
												toast.error(
													"Fail to resend email"
												);
											} else {
												toast.success(
													"Please check your email."
												);
											}
										} else {
											router.replace(
												pathname || "/register"
											);
											form.setValue(
												"email",
												existEmail || ""
											);
											form.setValue("password", "");
											setIsConfirmed(false);
										}
									});
								}
							}}
						>
							<AiOutlineLoading3Quarters
								className={`${!isSendAgain
									? "hidden"
									: "block animate-spin"
									}`}
							/>
							Send me another code
						</div>
					</div>
					<Button
						type="submit"
						variant='outline'
						className="w-full"
						onClick={async () => {
							setIsConfirmed(false);
						}}
					>
						Change Email
					</Button>
				</div>
			</div>
		</div>
	);
}
