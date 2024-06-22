"use server";

import { CatsTable, db } from "@/lib/drizzle";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function deleteCat(catId: number): Promise<void> {
  console.log("Deleting cat with id", catId);

  try {
    const resolvedCurrentUser = await currentUser();

    const resolvedCurrentUserId = resolvedCurrentUser?.id;

    if (!resolvedCurrentUserId) {
      throw new Error("No current user");
    }

    const result = await db
      .delete(CatsTable)
      .where(and(
        eq(CatsTable.id, catId),
        eq(CatsTable.userId, resolvedCurrentUser.id)
      ));

    console.log("Deleted cat", result);
  } catch (e) {
    console.error("Error deleting cat", e);
    throw e;
  }
}
