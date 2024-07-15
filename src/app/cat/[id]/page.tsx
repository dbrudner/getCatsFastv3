import Link from "next/link";
import Cat from "./cat";
import { Button } from "@mui/material";
import { LikeButton } from "@/app/components/cat/like-button";
import { currentUser } from "@clerk/nextjs/server";
import CatCard from "@/app/components/cat/catcard";
import { getCatById } from "@/actions/cat";

export default async function CatPage({ params }: { params: { id: string } }) {
  const catId = Number(params.id);
  const [cat, resolvedCurrentUser] = await Promise.all([
    getCatById(catId),
    currentUser(),
  ]);

  return (
    <div className="flex flex-col justify-center">
      <div className="min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-sky-300 mb-4">{cat?.title}</h1>
        {cat && <CatCard cat={{ ...cat, title: "" }} activeHashTag="" />}
        <LikeButton
          className="flex"
          catId={catId}
          userId={resolvedCurrentUser?.id ?? ""}
        />
      </div>
    </div>
  );
}
