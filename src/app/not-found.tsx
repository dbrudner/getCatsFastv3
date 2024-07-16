import CatCard from "@/app/components/cat/catcard";
import { Cat } from "@/lib/core";
import Link from "next/link";

export default async function CatPage() {
  const notFoundCat: Cat = {
    userId: "",
    id: 0,
    title: "The page you are looking for does not exist.",
    image: "/404-cat.webp",
    createdAt: new Date(),
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-orange-300 mb-4">#NotFound</h1>
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
