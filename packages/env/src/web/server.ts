import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { sharedEnv } from "../shared";
import { env as dbEnv } from "./db";

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

export const env = createEnv({
  extends: [sharedEnv, dbEnv],
  shared: {
    PORT: z.coerce.number().default(3000),
  },
  server: {
    DB_MIGRATING: stringBoolean,
    DB_SEEDING: stringBoolean,
    DATABASE_URL: z.string().url(),
    SMTP_HOST: z.string().trim().min(1),
    SMTP_PORT: z.number().int().min(1),
    SMTP_USER: z.string().trim().min(1),
    SMTP_PASSWORD: z.string().trim().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  runtimeEnv: {
    PORT: process.env["PORT"],
    DB_MIGRATING: process.env.DB_MIGRATING,
    DB_SEEDING: process.env.DB_SEEDING,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: parseInt(process.env.SMTP_PORT ?? ""),
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env["SKIP_ENV_VALIDATION"],
});
