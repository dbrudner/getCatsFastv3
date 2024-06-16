import { Cat } from "@/lib/drizzle";
import Image from "next/image";
import { useState } from "react";

export default function CatCard({ cat }: { cat: Cat }) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="border-2 border-sky-300 rounded p-4 cursor-pointer">
        <Image src={cat.image} width={1200} height={1200} alt={cat.title} />
      </div>
      <h1 className="text-3xl font-bold">{cat.title}</h1>
    </div>
  );
}
