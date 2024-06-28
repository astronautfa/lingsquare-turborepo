"use client";

import React from "react";
import SignUp from "./signup-form";
import SocialAuth from "./social-form";
import { SeparatorWithText } from "@ui/components/separator";

export default function RegisterForm({ setLoginDisplay }: { setLoginDisplay?: (value: boolean) => void }) {
	const queryString =
		typeof window !== "undefined" ? window?.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	// Get the value of the 'next' parameter
	const next = urlParams.get("next");
	const verify = urlParams.get("verify");

	return (
		<div className="w-full sm:w-[26rem] bg-background dark:border-zinc-800 dark:lg:bg-zinc-900 rounded-md">
			<div className="p-1 space-y-5">
				<div className="text-center space-y-1 py-3">
					<h2 className="text-xl font-bold tracking-tight">Register</h2>
					<p className="text-muted-foreground">
						Register to enjoy the full experience
					</p>
				</div>
				<SocialAuth redirectTo={next || "/"} />
				<SeparatorWithText text="or" />
			</div>
			<SignUp redirectTo={next || "/"} setLoginDisplay={setLoginDisplay} />
		</div>
	);
}
