"use server";

import { currentUser } from "@clerk/nextjs/server"
import { Cat, getCatsFastDb, likesTable } from "@/lib/core";
import { eq } from "drizzle-orm";

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
