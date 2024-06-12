"use server";
export async function createCat(formData: FormData) {
  const catName = formData.get("catName");
  const catImage = formData.get("catImage");

  // upload catImage to s3

  // save to db
}
