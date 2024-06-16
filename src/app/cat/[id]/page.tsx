import Link from "next/link";
import Cat from "./cat";
import { Button } from "@mui/material";

export default function CatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-y-24 items-center justify-center p-4 min-h-screen">
      <Cat id={params.id} />
      <Link href="/cats">
        <Button>Back to cats</Button>
      </Link>
    </div>
  );
}
