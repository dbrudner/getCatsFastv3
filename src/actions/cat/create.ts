"use server";
import { db, CatsTable, Cat } from "@/lib/drizzle";
import { put } from "@vercel/blob";

export async function createCat(formData: FormData) {
  const catName = formData.get("catName") ?? "";
  const catImage = formData.get("catImage");

  if (catImage instanceof File && typeof catName === "string") {
    try {
      console.log("Hey?");
      const blob = await put(catName, catImage, { access: "public" });

      const insertedCat = await db
        .insert(CatsTable)
        .values([
          {
            title: catName,
            image: blob.url,
          },
        ])
        .returning();

      return insertedCat;
    } catch (e) {
      console.error("Failed to insert cat");
      console.error(e);
    }
  }
}
