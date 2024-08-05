import { text, varchar, boolean, timestamp, json } from "drizzle-orm/pg-core"
import { createTable } from "./utils";
import { cards } from "./card";
import { relations } from "drizzle-orm";

export const cardContents = createTable("card_contents", {
    id: varchar("id").primaryKey(),
    cardId: varchar("card_id")
        .notNull()
        .references(() => cards.id, { onDelete: "cascade" }),

    question: text("question").notNull().default(''),
    answer: text("answer").notNull().default(''),
    source: text("source").notNull().default(''),
    sourceId: varchar("source_id"),
    extend: json("extend"),
    deleted: boolean("deleted").notNull().default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CardContent = typeof cardContents.$inferSelect;
export type NewCardContent = typeof cardContents.$inferInsert;

export const cardContentsRelations = relations(cardContents, ({ one }) => ({
    card: one(cards, {
        fields: [cardContents.cardId],
        references: [cards.id],
    }),
}));