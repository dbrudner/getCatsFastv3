"use client";
import { deleteCat } from "@/actions/cat";
import { TrashIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export default function DeleteCatButton({ catId }: { catId: number }) {
  const router = useRouter();

  return (
    <IconButton
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        console.log("Hey");
        await deleteCat(catId);
        router.refresh();
      }}
      sx={{
        position: "absolute",
      }}
      className="text-white rounded p-2 absolute top-6 right-6 border-2"
    >
      <TrashIcon className="h-12 w-12" />
    </IconButton>
  );
}
