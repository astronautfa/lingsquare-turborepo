import {
  index,
  timestamp,
  varchar,
  IndexColumn,
  serial,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createTable } from "./utils";

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example: { name: IndexColumn }) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
