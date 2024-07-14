import { Likes, getLikes } from "@/actions/likes";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Likes | { message: string }>,
) {
  const catId = req.query.id;

  if (typeof catId !== "string") {
    res.status(400).json({ message: "Invalid cat ID" });
    return;
  }

  const catIdInt = parseInt(catId);

  const catLikes = await getLikes(catIdInt);

  return res.status(200).json(catLikes);
}
