import {
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { queryObjects } from "v8";

export const CatsTable = pgTable(
  "cats",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    image: text("image").notNull(),
    userId: text("userId").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (cats) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(cats.id),
    };
  },
);

export type Cat = InferSelectModel<typeof CatsTable>;
export type NewCat = InferInsertModel<typeof CatsTable>;

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.id),
    };
  },
);

export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;

export const likesTable = pgTable(
  "likes",
  {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull(),
    catId: integer("catId").notNull(),
  },
  (likes) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(likes.id),
    };
  },
);

export type Like = InferSelectModel<typeof likesTable>;
export type NewLike = InferInsertModel<typeof likesTable>;

export const getCatsFastDb = drizzle(sql);
