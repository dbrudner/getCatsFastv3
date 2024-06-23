import { sql } from "@vercel/postgres";
import { db } from "@/lib/drizzle";
import { CatsTable, Cat, NewCat } from "./drizzle";

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
  const insertedCats: Cat[] = await db
    .insert(CatsTable)
    .values(newCats)
    .returning();

  return {
    insertedCats,
  };
}
