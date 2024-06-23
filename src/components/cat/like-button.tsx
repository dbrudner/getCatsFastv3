"use client";

import { deleteLike, getLikes, postLike } from "@/actions/likes";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import classNames from "classnames";

type LikeButtonProps = {
  catId: number;
  userId: string;
};

const useGetLikesQuery = (catId: number) => {
  return useQuery({
    queryKey: ["likes", { catId }],
    queryFn: async () => {
      const likes = await getLikes(
        catId
      );

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

const useDeleteLikeMutation = (catId: number, userId: string, onSuccess: () => void) => {
  return useMutation({
    mutationFn: async () => {
      return await deleteLike(catId, userId)
    },
    onSuccess
  })
}

export function LikeButton({ catId, userId }: LikeButtonProps) {
  const { data: likes, refetch, isLoading, isFetching } = useGetLikesQuery(catId);

  const postLikeMutation = usePostLikeMutation(catId, userId, () => {
    refetch();
  });

  const deleteLikeMutation = useDeleteLikeMutation(catId, userId, () => {
    refetch();
  });

  const onClick = () => {
    if (likes?.liked) {
      deleteLikeMutation.mutate();
    } else {
      postLikeMutation.mutate();
    }
  }

  const iconClassName = useMemo(() => {
    const shouldShowSkyColor = (likes?.liked && !isFetching) || postLikeMutation.isPending || (isFetching && !likes?.liked)
    return classNames("w-5 h-5 transition-colors duration-300",
      shouldShowSkyColor ? "text-sky-300" : "text-slate-600",
      {
        invisible: isLoading
      }
    )
  }, [likes?.liked, postLikeMutation.isPending, isFetching, isLoading])

  const likesClassName = classNames("text-sm font-semibold")
  const likesCountClassName = classNames(
    " transition-opacity duration-300", {
    invisible: isLoading,
  },
    isFetching || postLikeMutation.isPending ? "opacity-0" : "opacity-100"
  )

  return (
    <div className="flex flex-col justify-end gap-y-2 items-end">
      <div>
        <IconButton disabled={postLikeMutation.isPending || isFetching} onMouseDown={() => onClick()} disableRipple>
          <HandThumbUpIcon className={iconClassName} />
        </IconButton>
      </div>
      <p className={likesClassName}>
        <span className={likesCountClassName}>{likes?.count}</span> Likes
      </p>
    </div>
  );
}


