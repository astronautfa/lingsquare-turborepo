import { index, timestamp, varchar, IndexColumn } from "drizzle-orm/pg-core";
import { createTable } from "./utils";

export const sessions = createTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t: { userId: IndexColumn }) => ({
    userIdx: index("session_user_idx").on(t.userId),
  }),
);
