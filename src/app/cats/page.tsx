"use server";
import { Cat, CatsTable, db } from "@/lib/drizzle";
import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function deleteCat(formData: FormData) {
  const catId = formData.get("catId");
  if (typeof catId !== "number") {
    throw new Error("Invalid catId", { catId });
  }
  await db.delete(CatsTable).where(eq(CatsTable.id, catId));
}

export async function DeleteCatButton({ catId }: { catId: number }) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await deleteCat(formData);
    router.refresh();
  };

  return (
    <form action={(e) => handleSubmit(e)}>
      <input type="hidden" name="catId" value={catId} />
      <button
        type="submit"
        className="bg-red-500 text-white rounded p-2 absolute top-2 right-2"
      >
        Delete Cat
      </button>
    </form>
  );
}

export async function CatCard({
  cat,
  isCatOwner,
}: {
  cat: Cat;
  isCatOwner: boolean;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="border-2 border-sky-300 rounded p-4 cursor-pointer relative">
        <Image src={cat.image} width={1200} height={1200} alt={cat.title} />
      </div>
      <h1 className="text-3xl font-bold">{cat.title}</h1>
      {isCatOwner && <DeleteCatButton catId={cat.id} />}
    </div>
  );
}

async function deleteCat(formData: FormData) {
  "use server";
  try {
    const catId = formData.get("catId");
    console.log({ catId });
    if (!catId) return;
    const result = await db.delete(CatsTable).where(eq(CatsTable.id, catId));
    console.log({ result });
  } catch (e) {
    console.error(e);
  }
}

export default async function Table() {
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

  console.log({ cats });

  const duration = Date.now() - startTime;

  const resolvedCurrentUser = await currentUser();

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
        <div className="flex flex-col max-w-full gap-y-10">
          {cats.map((cat) => (
            <div key={cat.id}>
              <div className="flex flex-col gap-y-2">
                <Link href={`/cat/${cat.id}`}>
                  <div className="border-2 border-sky-300 rounded p-4 cursor-pointer relative">
                    <Image
                      src={cat.image}
                      width={1200}
                      height={1200}
                      alt={cat.title}
                    />
                  </div>
                  <h1 className="text-3xl font-bold">{cat.title}</h1>
                </Link>

                {cat.userId === resolvedCurrentUser?.id && (
                  <form action={deleteCat}>
                    <input type="hidden" name="catId" value={cat.id} />
                    <button
                      type="submit"
                      className="bg-red-500 text-white rounded p-2 absolute top-2 right-2"
                    >
                      Delete Cat
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
