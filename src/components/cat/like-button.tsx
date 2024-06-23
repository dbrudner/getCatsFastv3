"use client";

import { getLikes, postLike } from "@/actions/likes";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import classNames from "classnames";

type LikeButtonProps = {
  catId: number;
  userId: string;
};

const useGetLikesQuery = (catId: number) => {
  return useQuery({
    queryKey: ["likes", { catId }],
    queryFn: async () => {
      console.log(catId);
      const likes = await getLikes(
        catId
      );
      console.log(likes)
      return likes;
    },
  });
}

const usePostLikeMutation = (catId: number, userId: string, onSuccess: () => void) => {
  return useMutation({
    mutationFn: async () => {
      return await postLike(catId, userId)
    },
    onSuccess
  })
}

export function LikeButton({ catId, userId }: LikeButtonProps) {
  const { data: likes, refetch } = useGetLikesQuery(catId);

  const postLikeMutation = usePostLikeMutation(catId, userId, () => {
    console.log("Refetching")
    refetch();
  });

  const iconClassName = classNames("w-5 h-5", {
    "text-sky-300": likes?.liked,
  });


  return (
    <div className="flex flex-col justify-end gap-y-2 items-end">
      <div>
        <IconButton onClick={() => postLikeMutation.mutate()}>
          <HandThumbUpIcon className={iconClassName} />
        </IconButton>
      </div>
      <p className="text-sm font-semibold">
        {likes?.count} Likes

      </p>
    </div>
  );
}

