"use client";

import { Cat } from "@/lib/core";
import CatCard from "./catcard";

type Props = {
  catsWithLikes: { cat: Cat; likes: any }[];
  userId: string;
};

export default function CatList({ catsWithLikes, userId }: Props) {
  console.log({ catsWithLikes, userId });

  return (
    <div className="flex flex-col gap-y-24 items-center mb-48">
      <div className="flex flex-col max-w-full gap-y-10">
        {catsWithLikes.map((catWithLike) => (
          <CatCard
            key={catWithLike.cat.id}
            cat={catWithLike.cat}
            activeHashTag=""
          />
        ))}
      </div>
    </div>
  );
}
