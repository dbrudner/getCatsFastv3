import CatCard from "@/components/catcard";
import { db, CatsTable, Cat } from "@/lib/drizzle";
import { seed } from "@/lib/seed";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function CatCards({ cats }: { cats: Cat[] }) {
  return (
    <div className="flex flex-col gap-y-10">
      {cats.map((cat) => (
        <Link key={cat.id} href={`/cat/${cat.id}`}>
          <CatCard cat={cat} />
        </Link>
      ))}
    </div>
  );
}

export default async function Table() {
  // await db.delete(CatsTable);
  // await seed();

  let cats;
  let startTime = Date.now();
  try {
    cats = await db.select().from(CatsTable);
  } catch (e: any) {
    if (e.message === `relation "cats" does not exist`) {
      startTime = Date.now();
      cats = await db.select().from(CatsTable);
      console.log({ cats });
    } else {
      throw e;
    }
  }

  const duration = Date.now() - startTime;

  return (
    <div className="max-w-screen-md m-auto">
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
      <div className="flex flex-col gap-y-24 items-center">
        <CatCards cats={cats} />
      </div>
    </div>
  );
}
