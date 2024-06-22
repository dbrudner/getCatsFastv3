"use server";
import { getCatById } from "@/actions/cat/getCatById";
import { Cat } from "@/lib/drizzle";
import Image from "next/image";
import { useState } from "react";

function CatCard({ cat }: { cat: Cat }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="border-2 border-sky-300 rounded p-4 cursor-pointer">
        <Image src={cat.image} width={700} height={700} alt={cat.title} />
      </div>
      <h1 className="text-3xl font-bold">{cat.title}</h1>
    </div>
  );
}

export default async function CatComponent({ id }: { id: string }) {
  const cat = await getCatById(id);

  if (!cat) {
    return <div>Failed to get cat</div>;
  }

  return (
    <div>
      <CatCard cat={cat} />
    </div>
  );
}
