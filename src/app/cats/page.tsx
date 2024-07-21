"use server";
import { getCatsWithLikes, getTopCatsWithLikes } from "@/actions/cat";
import { currentUser } from "@clerk/nextjs/server";
import CatsView from "../components/cat/cats-view";
import { createLikesTable } from "@/lib/seed";

export default async function Cats() {
  const catsWithLikes = await getTopCatsWithLikes();
  const resolvedCurrentUser = await currentUser();

  return (
    <div className="m-auto mt-6">
      <CatsView
        catsWithLikes={catsWithLikes.rows}
        userId={resolvedCurrentUser?.id ?? ""}
      />
    </div>
  );
}
