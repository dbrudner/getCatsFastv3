"use server";

import { getCatsFastDb, likesTable } from "@/lib/core";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function getLikes(catId: number) {
  try {
    const likesPromise = await getCatsFastDb
      .select()
      .from(likesTable)
      .where(eq(likesTable.catId, catId));

    const currentUserPromise = currentUser();

    const [likes, resolvedCurrentUser] = await Promise.all([likesPromise, currentUserPromise]);

    return {
      count: likes.length,
      liked: likes.some((like) => like.userId === resolvedCurrentUser?.id),
    };
  } catch (err) {
    console.error(err);
  }
};

export async function postLike(catId: number, userId: string) {
  try {
    if (!userId) {
      throw new Error("No user ID provided");
    }

    if (!catId) {
      throw new Error("No cat ID provided");
    }

    await getCatsFastDb
      .insert(likesTable)
      .values([
        {
          catId,
          userId,
        },
      ])
      .returning();
  } catch (err) {
    console.error(err);
  }
}

export async function deleteLike(catId: number, userId: string): Promise<void> {
  try {
    const result = await getCatsFastDb
      .delete(likesTable)
      .where(and(
        eq(likesTable.catId, catId),
        eq(likesTable.userId, userId)
      ));

    console.log("Deleted like", result);
  } catch (e) {
    console.error("Error deleting like", e);
    throw e;
  }
}
