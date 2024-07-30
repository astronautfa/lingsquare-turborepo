import {
  index,
  timestamp,
  varchar,
  IndexColumn,
  boolean,
} from "drizzle-orm/pg-core";
import { createTable } from "./utils";

export const users = createTable(
  "users",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    discordId: varchar("discord_id", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 191 }),
    stripePriceId: varchar("stripe_price_id", { length: 191 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 191 }),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
  },
  (t: { email: IndexColumn; discordId: IndexColumn }) => ({
    emailIdx: index("user_email_idx").on(t.email),
    discordIdx: index("user_discord_idx").on(t.discordId),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
