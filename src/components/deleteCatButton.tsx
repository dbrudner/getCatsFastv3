"use client";
import { deleteCat } from "@/actions/cat/delete";
import { CatsTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export default function DeleteCatButton({ catId }: { catId: number }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        deleteCat(catId);
      }}
      className="bg-red-500 text-white rounded p-2 absolute top-2 right-2"
    >
      Delete Cat
    </button>
  );
}
