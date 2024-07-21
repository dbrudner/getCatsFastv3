"use server";

import { Cat, getCatsFastDb, likesTable } from "@/lib/core";
import { and, eq } from "drizzle-orm";
import { getCatById } from "./cat";
import { createUserNotification } from "./user-notification";

export type Likes = {
  count: number;
  liked: boolean;
};

export async function getLikes(
  catId: Cat["id"],
  userId: string,
): Promise<Likes> {
  try {
    const likes = await getCatsFastDb
      .select()
      .from(likesTable)
      .where(eq(likesTable.catId, catId));

    console.log({ liked: likes.some((like) => like.userId === userId) });
    return {
      count: likes.length,
      liked: likes.some((like) => like.userId === userId),
    };
  } catch (err) {
    console.error(err);

    return {
      count: 0,
      liked: false,
    };
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
    console.log(catId, userId);

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
