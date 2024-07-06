"use server";

import { getCatsFastDb, likesTable } from "@/lib/core";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { createUserNotification } from "./user-notification";
import { getCatById } from "./cat";

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

    const likedCat = await getCatById(catId);

    if (!likedCat) {
      throw new Error("Cat not found");
    }

    const insertedLikes = await getCatsFastDb
      .insert(likesTable)
      .values([
        {
          catId,
          userId,
        },
      ])
      .returning();

    console.log("Inserted like");
    console.log("Creating user notification from cat like");

    createUserNotification({
      message: "Someone liked your cat!",
      createdByUserId: userId,
      createdForUserId: likedCat.userId,
      title: "Cat liked",
      redirectAction: `/cat/${catId}`,
      imageUrl: likedCat.image,
    });

    return insertedLikes[0];
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
