import { CatsTable, db } from "@/lib/drizzle";
import { seed } from "@/lib/seed";

async function getCats() {
  // await db.delete(CatsTable);
  await seed();

  let cats;
  let startTime = Date.now();
  try {
    cats = await db.select().from(CatsTable);
  } catch (e: any) {
    if (e.message === `relation "cats" does not exist`) {
      startTime = Date.now();
      cats = await db.select().from(CatsTable);
      return cats;
    } else {
      throw e;
    }
  }
}
