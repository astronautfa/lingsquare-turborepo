import { drizzle } from "drizzle-orm/postgres-js";
import postgres = require("postgres");

import { env } from "@lingsquare/env/src/web/server";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

export const conn =
  globalForDb.conn ??
  postgres(env.DATABASE_URL, {
    max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
    onnotice: env.DB_SEEDING ? () => {} : undefined,
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

export const deq = eq;
