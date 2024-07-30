import {
  index,
  timestamp,
  varchar,
  IndexColumn,
  serial,
} from "drizzle-orm/pg-core";
import { createTable } from "./utils";

export const emailVerificationCodes = createTable(
  "email_verification_codes",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 21 }).unique().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    code: varchar("code", { length: 8 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t: { userId: IndexColumn; email: IndexColumn }) => ({
    userIdx: index("verification_code_user_idx").on(t.userId),
    emailIdx: index("verification_code_email_idx").on(t.email),
  }),
);
