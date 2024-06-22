"use client";
import { deleteCat } from "@/actions/cat/delete";
import { useRouter } from "next/navigation";

export default function DeleteCatButton({ catId }: { catId: number }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        console.log("Hey");
        await deleteCat(catId);
        router.refresh();
      }}
      className="bg-red-500 text-white rounded p-2 absolute top-2 right-2"
    >
      Delete Cat
    </button>
  );
}
