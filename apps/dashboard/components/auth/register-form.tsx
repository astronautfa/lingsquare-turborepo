"use client";

import React from "react";
import SignUp from "./signup-form";
import SocialAuth from "./social-form";
import { SeparatorWithText } from "@ui/components/separator";

export default function RegisterForm() {
	const queryString =
		typeof window !== "undefined" ? window?.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	// Get the value of the 'next' parameter
	const next = urlParams.get("next");
	const verify = urlParams.get("verify");

	return (
		<div className="w-full sm:w-[26rem] sm:p-5 bg-background dark:border-zinc-800 rounded-md">
			<div className="p-1 space-y-5">
				<div className="text-center space-y-3">
					<h1 className="font-bold">Create Account</h1>
					<p className="text-sm">
						Welcome! Please fill in the details to get started.
					</p>
				</div>
				<SocialAuth redirectTo={next || "/"} />
				<SeparatorWithText text="or" />
			</div>
			<SignUp redirectTo={next || "/"} />
		</div>
	);
}
