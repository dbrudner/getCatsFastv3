"use server";

import { Cat, CatsTable, Like, getCatsFastDb } from "@/lib/core";
import { currentUser } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { and, eq, like } from "drizzle-orm";
import { createUserNotification } from "./user-notification";
import { redirect } from "next/navigation";
import { Likes, getLikes, getUserLikesByCatId } from "./likes";

export async function getCatById(catId: Cat["id"]) {
  try {
    const cat = await getCatsFastDb
      .select()
      .from(CatsTable)
      .where(eq(CatsTable.id, catId));

    return cat[0];
  } catch (e) {
    console.error("Failed to get cat");
    console.error(e);
  }
}

export async function searchCatsByTitle(tag: string) {
  try {
    console.log(tag);
    const cats = await getCatsFastDb
      .select()
      .from(CatsTable)
      .where(like(CatsTable.title, `%${tag}%`));
    return cats;
  } catch (e) {
    console.error("Failed to get cat");
    console.error(e);
  }
}

export async function getCats() {
  try {
    const cats = await getCatsFastDb.select().from(CatsTable);
    return cats;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getCatWithLikes(
  catId: Cat["id"],
  userId: string,
): Promise<{ cat: Cat; likes: Likes }> {
  if (typeof catId !== "number") {
    throw new Error("Invalid cat ID");
  }

  const [likes, cat] = await Promise.all([
    getLikes(catId, userId),
    getCatById(catId),
  ]);

  if (!cat) {
    throw new Error("Cat not found");
  }

  return {
    cat,
    likes,
  };
}

export async function getCatsWithLikes() {
  try {
    const cats = await getCatsFastDb.select().from(CatsTable);
    const userId = (await currentUser())?.id ?? "";
    const catsWithLikes = await Promise.all(
      cats.map(async (cat) => {
        const likes = getLikes(cat.id, userId);
        return {
          cat,
          likes,
        };
      }),
    );

    const catLikesPromises = catsWithLikes.map((cat) => cat.likes);

    const resolvedCatPromises = await Promise.all(catLikesPromises);

    return catsWithLikes.map((cat, index) => {
      return {
        cat: cat.cat,
        likes: resolvedCatPromises[index],
      };
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function createCat(catImage: File, catName: string) {
  if (!(catImage instanceof File)) {
    throw new Error("Invalid cat image");
  }

  if (typeof catName !== "string") {
    throw new Error("Invalid cat name");
  }

  if (catImage instanceof File && typeof catName === "string") {
    try {
      const blobPromise = await put("cats", catImage, { access: "public" });
      const currentUserPromise = currentUser();
      const [blob, resolvedCurrentUser] = await Promise.all([
        blobPromise,
        currentUserPromise,
      ]);

      if (!resolvedCurrentUser) {
        throw new Error("No current user");
      }

      const insertedCat = await getCatsFastDb
        .insert(CatsTable)
        .values([
          {
            title: catName,
            image: blob.url,
            userId: resolvedCurrentUser.id,
          },
        ])
        .returning();

      createUserNotification({
        message: `Created cat ${catName}`,
        createdByUserId: resolvedCurrentUser.id,
        createdForUserId: resolvedCurrentUser.id,
        title: "Cat created",
        redirectAction: `/cat/${insertedCat[0].id}`,
        imageUrl: insertedCat[0].image,
      });

      return insertedCat[0];
    } catch (e) {
      console.error("Failed to insert cat");
      console.error(e);
    }
  }
}

export async function createCatWithFormData(formData: FormData) {
  const catName = formData.get("catName") ?? `untitled-cat-${randomUUID()}`;
  const catImage = formData.get("catImage");

  if (!(catImage instanceof File)) {
    throw new Error("Invalid cat image");
  }

  if (!catName || typeof catName !== "string") {
    throw new Error("Invalid cat name");
  }

  const newCat = await createCat(catImage, catName);

  redirect(`/cat/${newCat?.id}`);
}

export async function deleteCat(catId: number): Promise<void> {
  console.log("Deleting cat with id", catId);

  try {
    const resolvedCurrentUser = await currentUser();

    const resolvedCurrentUserId = resolvedCurrentUser?.id;

    if (!resolvedCurrentUserId) {
      throw new Error("No current user");
    }

    const result = await getCatsFastDb
      .delete(CatsTable)
      .where(
        and(
          eq(CatsTable.id, catId),
          eq(CatsTable.userId, resolvedCurrentUser.id),
        ),
      );

    console.log("Deleted cat", result);
  } catch (e) {
    console.error("Error deleting cat", e);
    throw e;
  }
}
