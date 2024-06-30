"use server";

import { searchCatsByTitle } from "@/actions/cat";
import Image from "next/image";

export default async function Page({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const cats = await searchCatsByTitle(tag);

  return <div className="mb-40">
    <h1 className="text-4xl font-bold text-sky-300 mb-4 mt-12">
      #{tag}
    </h1>
    <div className="flex flex-col justify-center items-center gap-y-10">
      {cats?.map((cat) => {
        return <div key={cat.id}>
          <div>
            <Image width={800} height={800} src={cat.image} alt={cat.title} />
          </div>
          <div>
            {cat.title}
          </div>
        </div>
      })}
    </div>
  </div>
}
