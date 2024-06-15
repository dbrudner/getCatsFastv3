import { CatsTable, db } from "@/lib/drizzle";

export default async function Table() {
  // await db.delete(CatsTable);
  // await seed();

  let cats;
  let startTime = Date.now();
  cats = await db.select().from(CatsTable);

  console.log({ cats });

  const duration = Date.now() - startTime;

  return (
    <div className="flex flex-col gap-y-24 items-center p-4">
      {/* <CatCards cats={cats} /> */}
    </div>
  );
}
