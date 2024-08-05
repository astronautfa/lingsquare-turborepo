import { pgEnum } from "drizzle-orm/pg-core";

export const states = ["New", "Learning", "Review", "Relearning"] as const;
export type State = (typeof states)[number];

export const ratings = ["Manual", "Again", "Hard", "Good", "Easy"] as const;
export type Rating = (typeof ratings)[number];

export const roleEnums = pgEnum("role", ["admin", "user", "creator"] as const);