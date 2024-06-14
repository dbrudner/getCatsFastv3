import { sql } from "@vercel/postgres";
import { db } from "@/lib/drizzle";
import { CatsTable, Cat, NewCat } from "./drizzle";

const newCats: NewCat[] = [
  {
    title: "Cat boy",
    image: "/cat.webp",
  },
  {
    title: "Cat girl",
    image: "/cat.webp",
  },
  {
    title: "Cat them",
    image: "/cat.webp",
  },
];

export async function seed() {
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS cats (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);

  const insertedCats: Cat[] = await db
    .insert(CatsTable)
    .values(newCats)
    .returning();

  return {
    createTable,
    insertedCats,
  };
}
