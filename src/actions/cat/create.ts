"use server";
import { db, CatsTable, Cat } from "@/lib/drizzle";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export async function createCat(formData: FormData) {
  const catName = formData.get("catName") ?? `untitled-cat-${randomUUID()}`;
  const catImage = formData.get("catImage");

  let redirectPath = "/cats";

  if (catImage instanceof File && typeof catName === "string") {
    try {
      const blob = await put("cats", catImage, { access: "public" });
      const resolvedCurrentUser = await currentUser();
      if (!resolvedCurrentUser?.id) {
        throw new Error("No current user or userId");
      }
      const insertedCat = await db
        .insert(CatsTable)
        .values([
          {
            title: catName,
            image: blob.url,
            userId: resolvedCurrentUser?.id,
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
