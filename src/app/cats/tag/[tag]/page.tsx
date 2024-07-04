"use server";

import { searchCatsByTitle } from "@/actions/cat";
import CatCard from "@/app/components/cat/catcard";

export default async function Page({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const cats = await searchCatsByTitle(tag);

  return <div className="mb-40">
    <h1 className="text-4xl font-bold text-orange-500 mb-4 mt-12">
      #{tag}
    </h1>
    <div className="flex flex-col justify-center items-center gap-y-10">
      {cats?.map((cat) => <CatCard key={cat.id} cat={cat} activeHashTag={tag} />)}
    </div>
  </div>
}
