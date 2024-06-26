import { sql } from "@vercel/postgres";
import { CatsTable, Cat, NewCat, getCatsFastDb } from "./core";

const newCats: NewCat[] = [
  {
    title: "Cat boy",
    image: "/cat.webp",
    userId: "1",
  },
  {
    title: "Cat girl",
    image: "/cat.webp",
    userId: "1",
  },
  {
    title: "Cat them",
    image: "/cat.webp",
    userId: "1",
  },
];

export async function createCatsTable() {
  return await sql.query(`
      DROP TABLE IF EXISTS cats;
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
  const insertedCats: Cat[] = await
    getCatsFastDb.insert(CatsTable)
      .values(newCats)
      .returning();

  return {
    insertedCats,
  };
}

export async function createLikesTable() {
  return await sql.query(`
      DROP TABLE IF EXISTS likes;
      CREATE TABLE likes (
        id SERIAL PRIMARY KEY,
        "userId" VARCHAR(255) NOT NULL,
        "catId" VARCHAR(255) NOT NULL
      );
  `);
}

