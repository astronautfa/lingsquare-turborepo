import { text, varchar, integer, boolean, timestamp, doublePrecision, primaryKey } from "drizzle-orm/pg-core"

import { createTable } from "./utils";
import { states } from "../enums";
import { relations } from "drizzle-orm";
import { reviewLogs } from "./review-logs";
import { users } from "./user";
import { decks } from "./decks";

export const cards = createTable("cards", {
    id: varchar("id").primaryKey(),
    due: timestamp("due").defaultNow().notNull(),
    stability: doublePrecision("stability").notNull(),
    difficulty: doublePrecision("difficulty").notNull(),
    elapsed_days: integer("elapsed_days").notNull(),
    scheduled_days: integer("scheduled_days").notNull(),
    reps: integer("reps").notNull(),
    lapses: integer("lapses").notNull(),
    state: text("state", { enum: states }).notNull(),
    last_review: timestamp("last_review"),
    suspended: timestamp("suspended").defaultNow().notNull(),
    userId: text("user_id").notNull(),
    deleted: boolean("deleted").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Benchmark performance to check if we should use indexes for difficulty and due columns
export type Card = typeof cards.$inferSelect;
export type NewCard = typeof cards.$inferInsert;


export const cardsToDecks = createTable(
    "cards_to_decks",
    {
        cardId: text("card_id").notNull(),
        deckId: text("deck_id").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.cardId, t.deckId] }),
    }),
);

export const cardsToDecksRelations = relations(cardsToDecks, ({ one }) => ({
    card: one(cards, {
        fields: [cardsToDecks.cardId],
        references: [cards.id],
    }),
    deck: one(decks, {
        fields: [cardsToDecks.deckId],
        references: [decks.id],
    }),
}));

export type CardsToDecks = typeof cardsToDecks.$inferSelect;
export type NewCardsToDecks = typeof cardsToDecks.$inferInsert;


export const cardsRelations = relations(cards, ({ one, many }) => ({
    reviewLogs: many(reviewLogs),
    cardsToDecks: many(cardsToDecks),
    users: one(users, {
        fields: [cards.userId],
        references: [users.id],
    }),
}));
