"use server";

import { CatsTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export async function deleteCat(catId: number): Promise<void> {
  db.delete(CatsTable).where(eq(CatsTable.id, catId));
}
