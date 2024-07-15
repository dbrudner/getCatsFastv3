import CatCard from "@/app/components/cat/catcard";
import { Cat } from "@/lib/core";
import Link from "next/link";

export default async function CatPage() {
  const notFoundCat: Cat = {
    userId: "",
    id: 0,
    title: "The cat you are looking for does not exist.",
    image: "/404.png",
    createdAt: new Date(),
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-sky-300 mb-4">Not Found</h1>
        <CatCard cat={notFoundCat} activeHashTag="" />
        <Link href="/cats">
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
}
