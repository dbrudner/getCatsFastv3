"use server";
import { getCatsWithLikes } from "@/actions/cat";
import { LikeButton } from "@/app/components/cat/like-button";
import DeleteCatButton from "@/app/components/delete-cat-button";
import { Cat } from "@/lib/core";
import {
  ListBulletIcon,
  PlusIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import timeAgo from "../utils/time-ago";
import { currentUser } from "@clerk/nextjs/server";
import CatsView from "../components/cat/cats-view";

export default async function Cats() {
  const catsWithLikes = await getCatsWithLikes();
  const resolvedCurrentUser = await currentUser();

  return (
    <div className="m-auto mt-6">
      <CatsView
        catsWithLikes={catsWithLikes}
        userId={resolvedCurrentUser?.id ?? ""}
      />
    </div>
  );
}
