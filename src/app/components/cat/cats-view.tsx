"use client";
import Masonry from "@mui/lab/Masonry";
import timeAgo from "@/app/utils/time-ago";
import { Cat } from "@/lib/core";
import { ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { ToggleButtonGroup, ToggleButton, Link } from "@mui/material";
import DeleteCatButton from "../delete-cat-button";
import { LikeButton } from "./like-button";
import Image from "next/image";
import { useState } from "react";

const CatDescriptionWithHashTags = ({ cat }: { cat: Cat }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-wrap gap-x-1 font-bold text-xl">
        {cat.title.split(" ").map(mapCatTitle)}
      </div>
    </div>
  );
};

const mapCatTitle = (string: string) => {
  if (string[0] === "#" && string.length > 1) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        key={string}
        href={`/cats/tag/${string.slice(1)}`}
      >
        <span className="text-sky-300 font-bold text-xl">{string} </span>
      </Link>
    );
  }
  return (
    <span key={string} className="">
      {string}
    </span>
  );
};

type Props = { catsWithLikes: any[]; userId: string };

const CatCard = ({ cat, userId }: { cat: Cat; userId: string }) => {
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

export default function CatsView({ catsWithLikes, userId }: Props) {
  const [view, setView] = useState<"list" | "grid">("list");

  const catsListView = (
    <div className="flex flex-col gap-y-24 items-center mb-48">
      <div className="flex flex-col max-w-full gap-y-10">
        {catsWithLikes.map((catWithLike) => (
          <CatCard
            key={catWithLike.cat.id}
            cat={catWithLike.cat}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );

  const catsGridView = (
    <div className="mt-5">
      <Masonry columns={3}>
        {catsWithLikes.map((catWithLike) => (
          <Link href={`/cat/${catWithLike.cat.id}`} key={catWithLike.cat.id}>
            <Image
              height={600}
              width={600}
              alt={catWithLike.cat.title}
              src={catWithLike.cat.image}
              key={catWithLike.cat.id}
            />
          </Link>
        ))}
      </Masonry>
    </div>
  );

  return (
    <div>
      <ToggleButtonGroup size="large" value={view}>
        <ToggleButton value="list" onChange={() => setView("list")}>
          <ListBulletIcon className="h-4 w-4" />
        </ToggleButton>
        <ToggleButton value="grid" onChange={() => setView("grid")}>
          <TableCellsIcon className="h-4 w-4" />
        </ToggleButton>
      </ToggleButtonGroup>
      {view === "list" ? catsListView : catsGridView}
    </div>
  );
}
