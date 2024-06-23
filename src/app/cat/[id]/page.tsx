import Link from "next/link";
import Cat from "./cat";
import { Button } from "@mui/material";

export default function CatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-y-24 items-center justify-center min-h-screen m-auto">
      <Cat id={Number(params.id)} />
      <Link href="/cats" style={{ width: "100%" }}>
        <Button variant="contained" fullWidth>
          Back to cats
        </Button>
      </Link>
    </div>
  );
}
