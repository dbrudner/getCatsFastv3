import { createCat } from "@/actions/cat";
import { getLikes } from "@/actions/likes";
import { Cat } from "@/lib/core";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log("API getting cat likes");

  try {
    const catId = params.id;

    if (typeof catId !== "string") {
      return new Response(JSON.stringify({ message: "Invalid cat ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const catIdInt = parseInt(catId);

    const likes = await getLikes(catIdInt);

    return new Response(JSON.stringify(likes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw e;
  }
}
