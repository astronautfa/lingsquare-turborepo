import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env["NEXT_PUBLIC_POSTHOG_KEY"],
    NEXT_PUBLIC_POSTHOG_HOST: process.env["NEXT_PUBLIC_POSTHOG_HOST"],
    NEXT_PUBLIC_SENTRY_DSN: process.env["NEXT_PUBLIC_SENTRY_DSN"],
    NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env["SKIP_ENV_VALIDATION"],
});
