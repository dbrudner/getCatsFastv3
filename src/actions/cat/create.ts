"use server";
import { db, CatsTable, Cat } from "@/lib/drizzle";
import { currentUser } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

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
