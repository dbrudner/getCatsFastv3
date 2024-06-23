"use server";
import { getCats } from "@/actions/cat";
import { getLikes } from "@/actions/likes";
import DeleteCatButton from "@/components/delete-cat-button";
import { Cat, CatsTable, } from "@/lib/core";
import { createLikesTable } from "@/lib/seed";
import { currentUser } from "@clerk/nextjs/server";
import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const CatCard = async ({ cat, isCatOwner }: { cat: Cat, isCatOwner: boolean; }) => {
  const likes = await getLikes(cat.id);

  return <div key={cat.id}>
    <div className="flex flex-col gap-y-2 relative">
      <div className="border-2 border-sky-300 rounded p-4 cursor-pointer">
        <Link href={`/cat/${cat.id}`}>
          <Image
            src={cat.image}
            width={1200}
            height={1200}
            alt={cat.title}
          />
        </Link>
      </div>
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl font-bold">{cat.title}</h1></div>
        <div className="flex flex-col items-end">
          <IconButton>
            <HandThumbUpIcon className="w-6 h-6" />
          </IconButton>
          <p className="text-sm font-semibold">{likes?.count} Likes</p>
        </div>

      </div>

      {isCatOwner && (
        <DeleteCatButton catId={cat.id} />
      )}
    </div>
  </div>
}

export default async function Cats() {
  await createLikesTable();
  const cats = await getCats();
  const resolvedCurrentUser = await currentUser();

  return (
    <div className="m-auto">
      <div className="flex justify-between items-center mt-12 mb-4">
        <h1 className="text-4xl font-bold text-white">
          The <span className="text-sky-300 text-6xl">Cats</span>
        </h1>
        <Link href="/cat/new">
          <Button
            variant="outlined"
            size="large"
            startIcon={<PlusIcon className="w-8 h-8" />}
          >
            Add Cat
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-y-24 items-center mb-48">
        <div className="flex flex-col max-w-full gap-y-10">
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} isCatOwner={cat.userId === resolvedCurrentUser?.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
