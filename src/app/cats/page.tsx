"use server";
import { getCatsWithLikes } from "@/actions/cat";
import { LikeButton } from "@/app/components/cat/like-button";
import DeleteCatButton from "@/app/components/delete-cat-button";
import { Cat } from "@/lib/core";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import timeAgo from "../utils/time-ago";
import { currentUser } from "@clerk/nextjs/server";

const mapCatTitle = (string: string) => {
  if (string[0] === "#" && string.length > 1) {
    return (
      <Link key={string} href={`/cats/tag/${string.slice(1)}`}>
        <span className="text-sky-300 font-bold">{string} </span>
      </Link>
    );
  }
  return (
    <span key={string} className="">
      {string + " "}
    </span>
  );
};

const CatDescriptionWithHashTags = ({ cat }: { cat: Cat }) => {
  console.log({ cat });
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-wrap gap-x-2">
        {cat.title.split(" ").map(mapCatTitle)}
      </div>
    </div>
  );
};

const CatCard = async ({ cat, userId }: { cat: Cat; userId: string }) => {
  const isCatOwner = cat.userId === userId;

  return (
    <div>
      <div className="flex flex-col relative">
        <p className="text-sm tracking-tighter leading-4 text-slate-400 font-extralight mb-1 text-right">
          {timeAgo(cat.createdAt)}
        </p>
        <div>
          <Link href={`/cat/${cat.id}`}>
            <Image src={cat.image} width={1200} height={1200} alt={cat.title} />
          </Link>
        </div>
        <div className="flex justify-between items-start mt-1">
          <CatDescriptionWithHashTags cat={cat} />
          <div className="flex flex-col items-end min-w-24">
            <LikeButton catId={cat.id} userId={userId} className="flex" />
          </div>
        </div>

        {isCatOwner && <DeleteCatButton catId={cat.id} />}
      </div>
    </div>
  );
};

export default async function Cats() {
  const catsWithLikes = await getCatsWithLikes();
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
          {catsWithLikes.map((catWithLike) => (
            <CatCard
              key={catWithLike.cat.id}
              cat={catWithLike.cat}
              userId={resolvedCurrentUser?.id ?? ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
