import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const CatsTable = pgTable(
  "cats",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    image: text("image").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (cats) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(cats.id),
    };
  }
);

export type Cat = InferSelectModel<typeof CatsTable>;
export type NewCat = InferInsertModel<typeof CatsTable>;

export const db = drizzle(sql);
