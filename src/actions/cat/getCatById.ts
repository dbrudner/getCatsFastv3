"use server";
import { CatsTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export async function getCatById(catId: any) {
  try {
    const cat = await db
      .select()
      .from(CatsTable)
      .where(eq(CatsTable.id, catId));

    return cat[0];
  } catch (e) {
    console.error("Failed to get cat");
    console.error(e);
  }
}
