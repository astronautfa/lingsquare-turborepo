import { index, timestamp, varchar, IndexColumn } from "drizzle-orm/pg-core";
import { createTable } from "./utils";

export const passwordResetTokens = createTable(
  "password_reset_tokens",
  {
    id: varchar("id", { length: 40 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t: { userId: IndexColumn }) => ({
    userIdx: index("password_token_user_idx").on(t.userId),
  }),
);
