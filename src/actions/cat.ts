"use server";

import { db, CatsTable, Cat } from "@/lib/drizzle";
import { currentUser } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { eq, sql, and } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getCatById(catId: Cat["id"]) {
  try {
    const cat = await db
      .select()
      .from(CatsTable)
      .where(eq(CatsTable.id, catId));

    return cat[0];
  } catch (e) {
    console.error("Failed to get cat");
    console.error(e);
  }
}

export async function getTopCat() {
  return await db.execute(sql`SELECT top 1 * FROM ${CatsTable}`);
}

export async function getCats() {
  try {
    const cats = await db.select().from(CatsTable);
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
      const insertedCat = await db
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
