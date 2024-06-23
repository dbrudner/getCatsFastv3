"use server";
import { getCats } from "@/actions/cat";
import DeleteCatButton from "@/components/deleteCatButton";
import { Cat, CatsTable, db } from "@/lib/drizzle";
import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const CatCard = ({ cat, isCatOwner }: { cat: Cat, isCatOwner: boolean; }) => {
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

      <h1 className="text-3xl font-bold">{cat.title}</h1>

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
            <CatCard cat={cat} isCatOwner={cat.userId === resolvedCurrentUser?.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
