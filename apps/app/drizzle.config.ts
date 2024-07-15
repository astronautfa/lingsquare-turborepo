import { type Config } from "drizzle-kit";

import { env } from "@lingsquare/env/web/db";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["app_*"],
} satisfies Config;
