"use server";
import DeleteCatButton from "@/components/deleteCatButton";
import { Cat, CatsTable, db } from "@/lib/drizzle";
import { seed } from "@/lib/seed";
import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export default async function Cats() {
  //  await db.delete(CatsTable);
  //  await seed();
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
            <div key={cat.id}>
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

                {cat.userId === resolvedCurrentUser?.id && (
                  <DeleteCatButton catId={cat.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
