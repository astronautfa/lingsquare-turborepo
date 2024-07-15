import { pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name: any) => `app_${name}`);
