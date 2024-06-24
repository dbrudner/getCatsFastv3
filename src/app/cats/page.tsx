"use server";
import { getCats } from "@/actions/cat";
import { getLikes } from "@/actions/likes";
import { LikeButton } from "@/components/cat/like-button";
import DeleteCatButton from "@/components/delete-cat-button";
import { Cat, CatsTable, } from "@/lib/core";
import { createLikesTable } from "@/lib/seed";
import { currentUser } from "@clerk/nextjs/server";
import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function timeAgo(date: Date) {
  const now = new Date();
  //@ts-ignore
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) {
    return seconds <= 1 ? 'a few seconds ago' : `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1 ? 'one day ago' : `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? 'one month ago' : `${months} months ago`;
  }

  const years = Math.floor(days / 365);
  return years === 1 ? 'a year ago' : `${years} years ago`;
}

const CatCard = async ({ cat, userId }: { cat: Cat, userId: string }) => {
  const likes = await getLikes(cat.id);
  const isCatOwner = cat.userId === userId;

  return <div key={cat.id}>
    <div className="flex flex-col relative">

      <p className="text-sm tracking-tighter leading-4 text-slate-400 font-extralight mb-1 text-right">{timeAgo(cat.createdAt)}</p>
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
      <div className="flex justify-between items-start mt-1">
        <div><h2 className="text-md font-bold">{cat.title}</h2></div>
        <div className="flex flex-col items-end">
          <LikeButton catId={cat.id} userId={userId} />
        </div>

      </div>

      {isCatOwner && (
        <DeleteCatButton catId={cat.id} />
      )}
    </div>
  </div>
}

export default async function Cats() {
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
            <CatCard key={cat.id} cat={cat} userId={resolvedCurrentUser?.id ?? ""} />
          ))}
        </div>
      </div>
    </div>
  );
}
