"use server";
import { getCatById } from "@/actions/cat/getCatById";
import { Cat } from "@/lib/drizzle";
import Image from "next/image";

function CatCard({ cat }: { cat: Cat }) {
  console.log({ cat });
  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-3xl font-bold">{cat.title}</h1>
      <Image src={cat.image} width={200} height={200} alt={cat.title} />
    </div>
  );
}

export default async function CatComponent({ id }: { id: string }) {
  const cat = await getCatById(id);

  if (!cat) {
    return <div>Failed to get cat</div>;
  }

  return (
    <div className="flex flex-col gap-y-24 items-center p-4">
      <CatCard cat={cat} />
    </div>
  );
}
