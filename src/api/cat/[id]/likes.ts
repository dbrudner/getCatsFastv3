import { createCat } from "@/actions/cat";
import { Cat } from "@/lib/core";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cat | { message: string }>,
) {
  console.log("API getting cat likes");

  try {
    const catTitle = req.body.title;

    if (!catTitle) {
      res.status(400).json({ message: "Invalid cat title" });
      return;
    }

    const catImage = req.body.image;

    if (!catImage) {
      res.status(400).json({ message: "Invalid cat image" });
      return;
    }

    const cat = await createCat(catImage, catTitle);

    if (!cat) {
      return res.status(400).json({ message: "Failed to create cat" });
    }

    res.status(200).json(cat);
  } catch (e) {
    throw e;
  }
}
