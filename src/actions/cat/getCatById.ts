import { CatsTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export async function getCatById(catId: any) {
  await db.select().from(CatsTable).where(eq(CatsTable.id, catId));
}
