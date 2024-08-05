import { text, varchar, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm";
import { createTable } from "./utils";
import { users } from "./user";
import { cardsToDecks } from "./card";

export const decks = createTable("decks", {
    id: varchar("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull().default(''),
    deleted: boolean("deleted").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    userId: varchar("user_id").notNull(),
});

export type Deck = typeof decks.$inferSelect;
export type NewDeck = typeof decks.$inferInsert;

export const decksRelations = relations(decks, ({ one, many }) => ({
    cardsToDecks: many(cardsToDecks),
    users: one(users, {
        fields: [decks.userId],
        references: [users.id],
    }),
}));