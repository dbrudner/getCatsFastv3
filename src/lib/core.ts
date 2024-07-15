import { sql } from "@vercel/postgres";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

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

export const catTagTable = pgTable(
  "cat_tags",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    userId: text("userId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (catTags) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(catTags.id),
    };
  },
);

export type CatTag = InferSelectModel<typeof catTagTable>;

export const catTagVoteTable = pgTable("cat_tags", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  catId: integer("catId")
    .notNull()
    .references(() => CatsTable.id),
  userId: text("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CatTagVote = InferSelectModel<typeof catTagVoteTable>;

export const userNotificationTable = pgTable("user_notifications", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  message: text("message").notNull(),
  hasBeenRead: boolean("hasBeenRead").default(false).notNull(),
  title: text("title").notNull(),
  redirectAction: text("redirectAction"),
  createdByUserId: text("createdByUserId").notNull(),
  createdForUserId: text("createdForUserId").notNull(),
  imageUrl: text("imageUrl"),
});

export type UserNotification = InferSelectModel<typeof userNotificationTable>;

export const getCatsFastDb = drizzle(sql);
