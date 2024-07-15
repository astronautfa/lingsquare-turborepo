import type { Config } from "drizzle-kit";

import { env } from "@lingsquare/env/web/db";

export default {
  dialect: "postgresql",
  schema: "./src/schema",
  out: "./migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["app_*"],
} satisfies Config;
