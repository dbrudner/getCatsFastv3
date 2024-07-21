import { sql } from "@vercel/postgres";
import { CatsTable, Cat, NewCat, getCatsFastDb } from "./core";

const newCats: NewCat[] = [];

export async function createCatsTable() {
  return await sql.query(`
      CREATE TABLE cats (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        "userId" VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);
}

export async function seedCatsTable() {
  const insertedCats: Cat[] = await getCatsFastDb
    .insert(CatsTable)
    .values(newCats)
    .returning();

  return {
    insertedCats,
  };
}

export async function createLikesTable() {
  return await sql.query(`
      CREATE TABLE likes (
        id SERIAL PRIMARY KEY,
        "userId" VARCHAR(255) NOT NULL,
        "catId" INTEGER NOT NULL REFERENCES cats(id),
        UNIQUE("userId", "catId")
      );
  `);
}

export async function createCatTagsTable() {
  return await sql.query(`
      CREATE TABLE cat_tags (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        "userId" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);
}

export async function createCatTagVoteTable() {
  return await sql.query(`
      CREATE TABLE cat_tag_votes (
        id SERIAL PRIMARY KEY,
        "userId" VARCHAR(255) NOT NULL,
        "catTagId" VARCHAR(255) NOT NULL,
        "catId" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);
}

export async function createUserNotificationsTable() {
  return await sql.query(`
      CREATE TABLE user_notifications (
        id SERIAL PRIMARY KEY,
        "createdByUserId" VARCHAR(255) NOT NULL,
        "createdForUserId" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "message" VARCHAR(255) NOT NULL,
        "hasBeenRead" BOOLEAN DEFAULT FALSE,
        "redirectAction" VARCHAR(255),
        "title" VARCHAR(255) NOT NULL,
        "imageUrl" VARCHAR(255)
      );
  `);
}
