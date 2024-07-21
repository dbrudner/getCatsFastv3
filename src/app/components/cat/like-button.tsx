"use client";

import { deleteLike, getLikes, postLike } from "@/actions/likes";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { SignedIn } from "@clerk/nextjs";

type LikeButtonProps = {
  catId: number;
  userId: string;
  className: string;
  initialLikes?: {
    liked?: boolean;
    count?: number;
  };
};

const useGetLikesQuery = (catId: number, userId: string, enabled: boolean) => {
  return useQuery({
    enabled,
    queryKey: ["likes", { catId }],
    queryFn: async () => {
      console.log("Get cat likles query fn");
      const likes = await getLikes(catId, userId ?? "");

      return likes;
    },
  });
};

const usePostLikeMutation = (
  catId: number,
  userId: string,
  onSuccess: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return await postLike(catId, userId);
    },
    onSuccess,
  });
};

const useDeleteLikeMutation = (
  catId: number,
  userId: string,
  onSuccess: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return await deleteLike(catId, userId);
    },
    onSuccess,
  });
};

export function LikeButton({
  catId,
  userId,
  className,
  initialLikes,
}: LikeButtonProps) {
  const [isLikesQueryEnabled, setIsLikesQueryEnabled] = useState(
    initialLikes == null,
  );

  const {
    data: likes,
    refetch,
    isLoading,
    isFetching,
  } = useGetLikesQuery(catId, userId, isLikesQueryEnabled);

  const postLikeMutation = usePostLikeMutation(catId, userId, () => {
    setIsLikesQueryEnabled(true);
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
  };

  const iconClassName = useMemo(() => {
    const shouldShowSkyColor =
      (likes?.liked && !isFetching) ||
      postLikeMutation.isPending ||
      (isFetching && !likes?.liked);
    return classNames(
      "w-4 h-4 transition-colors duration-300",
      shouldShowSkyColor ? "text-sky-300" : "text-slate-600",
      {
        invisible: isLoading,
      },
    );
  }, [likes?.liked, postLikeMutation.isPending, isFetching, isLoading]);

  const likesClassName = classNames(
    "text-sm font-semibold transition duration-300",
    likes?.liked ? "text-white" : "text-slate-200",
  );
  const likesCountClassName = classNames(
    " transition-opacity duration-300",
    {
      invisible: isLoading,
      "text-lime-400": likes?.liked,
    },
    isFetching || postLikeMutation.isPending || deleteLikeMutation.isPending
      ? "opacity-0"
      : "opacity-100",
  );

  return (
    <div className={className}>
      <p className={likesClassName}>
        <span className={likesCountClassName}>{likes?.count}</span> Likes
      </p>
      <SignedIn>
        <IconButton
          sx={{ p: 0, mb: "3px", ml: 0.5 }}
          onClick={() => onClick()}
          disableRipple
        >
          <HandThumbUpIcon className={iconClassName} />
        </IconButton>
      </SignedIn>
    </div>
  );
}
