"use server";

import { Cat, CatsTable, getCatsFastDb } from "@/lib/core";
import { currentUser } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { and, eq, like } from "drizzle-orm";
import { redirect } from "next/navigation";

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
    console.log(tag)
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
  }
  catch (e) {
    console.error(e)
    throw e;
  }
}

export async function createCat(formData: FormData) {
  const catName = formData.get("catName") ?? `untitled-cat-${randomUUID()}`;
  const catImage = formData.get("catImage");

  if (!(catImage instanceof File)) {
    throw new Error("Invalid cat image");
  }

  if (typeof catName !== "string") {
    throw new Error("Invalid cat name");
  }

  let redirectPath = "/cats";

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

      redirectPath = `/cat/${insertedCat[0].id}`;
    } catch (e) {
      console.error("Failed to insert cat");
      console.error(e);
    } finally {
      redirect(redirectPath);
    }
  }

  return null;
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
