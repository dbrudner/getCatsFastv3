"use server";

import { CatsTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export async function deleteCat(catId: number): Promise<void> {
  console.log("Deleting cat with id", catId);
  try {
    const deletedCat = await db
      .delete(CatsTable)
      .where(eq(CatsTable.id, catId));
    console.log("Deleted cat", deletedCat);
  } catch (e) {
    console.error("Error deleting cat", e);
    throw e;
  }
}
