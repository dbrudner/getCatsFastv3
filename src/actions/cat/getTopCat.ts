import { CatsTable, db } from "@/lib/drizzle";
import { eq, sql } from "drizzle-orm";

export async function getTopCat() {
  await db.execute(sql`SELECT top 1 * FROM ${CatsTable}`);
}
