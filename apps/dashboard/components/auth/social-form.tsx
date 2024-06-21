"use client";

import React from "react";
import { Button } from "@ui/components/button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";
import { createClient } from "@lingsquare/supabase/client/client"

export default function SocialAuth({ redirectTo }: { redirectTo: string }) {
	const loginWithProvider = async (provider: "github" | "google") => {
		const supbase = createClient();
		await supbase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo:
					window.location.origin +
					`/auth/callback?next=` +
					redirectTo,
			},
		});
	};

	return (
		<div className="w-full flex gap-2">
			<Button
				className="w-full flex items-center gap-2"
				variant="outline"
				onClick={() => loginWithProvider("google")}
			>
				<FcGoogle />
				Google
			</Button>
			<Button
				className="w-full flex items-center gap-2"
				variant="outline"
				onClick={() => loginWithProvider("github")}
			>
				<IoLogoGithub />
				Github
			</Button>
		</div>
	);
}
