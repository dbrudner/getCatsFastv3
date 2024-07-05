"use server";

import { getCatsFastDb, likesTable } from "@/lib/core";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { createUserNotification } from "./user-notification";

export async function getLikes(catId: number) {
  try {
    const likesPromise = await getCatsFastDb
      .select()
      .from(likesTable)
      .where(eq(likesTable.catId, catId));

    const currentUserPromise = currentUser();

    const [likes, resolvedCurrentUser] = await Promise.all([
      likesPromise,
      currentUserPromise,
    ]);

    return {
      count: likes.length,
      liked: likes.some((like) => like.userId === resolvedCurrentUser?.id),
    };
  } catch (err) {
    console.error(err);
  }
}

export async function postLike(catId: number, userId: string) {
  try {
    if (!userId) {
      throw new Error("No user ID provided");
    }

    if (!catId) {
      throw new Error("No cat ID provided");
    }

    const insertedCats = await getCatsFastDb
      .insert(likesTable)
      .values([
        {
          catId,
          userId,
        },
      ])
      .returning();

    const insertedCat = insertedCats[0];

    console.log("Inserted like", insertedCat);
    console.log("Creating user notification from cat like");

    await createUserNotification({
      message: "Someone liked your cat!",
      createdByUserId: userId,
      createdForUserId: insertedCat.userId,
      title: "Cat liked",
      redirectAction: `/cat/${catId}`,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function deleteLike(catId: number, userId: string): Promise<void> {
  try {
    const result = await getCatsFastDb
      .delete(likesTable)
      .where(and(eq(likesTable.catId, catId), eq(likesTable.userId, userId)));

    console.log("Deleted like", result);
  } catch (e) {
    console.error("Error deleting like", e);
    throw e;
  }
}
