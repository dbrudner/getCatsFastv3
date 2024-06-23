import { CatsTable, db } from "@/lib/drizzle";

async function getCats() {
  try {
    const cats = await db.select().from(CatsTable);
    return cats;
  } catch (e: any) {
    throw e;
  }
}
