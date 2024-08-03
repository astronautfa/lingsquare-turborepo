import { type Config } from "drizzle-kit";

import { env } from "@lingsquare/env/web/db";

console.log(env)

export default {
  schema: "./src/schema",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["app_*"],
} satisfies Config;
