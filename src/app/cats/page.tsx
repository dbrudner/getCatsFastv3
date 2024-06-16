import { db, CatsTable, Cat } from "@/lib/drizzle";
import { seed } from "@/lib/seed";
import Image from "next/image";
import Link from "next/link";

function CatCard({ cat }: { cat: Cat }) {
  return (
    <Link href={`/cat/${cat.id}`}>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl">{cat.title}</h2>
        <Image src={cat.image} alt={cat.title} width={400} height={300} />
      </div>
    </Link>
  );
}

function CatCards({ cats }: { cats: Cat[] }) {
  return (
    <div className="flex flex-col gap-y-40">
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
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
    <div className="flex flex-col gap-y-24 items-center p-4">
      <CatCards cats={cats} />
    </div>
  );
}
