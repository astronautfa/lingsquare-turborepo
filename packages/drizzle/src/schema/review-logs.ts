import { text, varchar, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core"

import { createTable } from "./utils";
import { ratings, states } from "../enums";
import { relations } from "drizzle-orm";
import { cards } from "./card";


export const reviewLogs = createTable("review_logs", {
    id: varchar("id").primaryKey(),
    cardId: varchar("card_id").notNull(),
    grade: text("grade", { enum: ratings }).notNull(),
    state: text("state", { enum: states }).notNull(),

    due: timestamp("due").notNull(),
    stability: doublePrecision("stability").notNull(),
    difficulty: doublePrecision("difficulty").notNull(),
    elapsed_days: integer("elapsed_days").notNull(),
    last_elapsed_days: integer("last_elapsed_days").notNull(),
    scheduled_days: integer("scheduled_days").notNull(),
    review: timestamp("review").notNull(),
    duration: integer("duration").notNull().default(0),
    deleted: boolean("deleted").notNull().default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ReviewLog = typeof reviewLogs.$inferSelect;
export type NewReviewLog = typeof reviewLogs.$inferInsert;


export const reviewLogsRelations = relations(reviewLogs, ({ one }) => ({
    card: one(cards, {
        fields: [reviewLogs.cardId],
        references: [cards.id],
    }),
}));