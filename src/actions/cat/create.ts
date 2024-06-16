"use server";
import { db, CatsTable, Cat } from "@/lib/drizzle";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";

export async function createCat(formData: FormData) {
  const catName = formData.get("catName") ?? "";
  const catImage = formData.get("catImage");
  let redirectPath = "/cats";

  if (catImage instanceof File && typeof catName === "string") {
    try {
      const blob = await put("/cats", catImage, { access: "public" });

      const insertedCat = await db
        .insert(CatsTable)
        .values([
          {
            title: catName,
            image: blob.url,
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
