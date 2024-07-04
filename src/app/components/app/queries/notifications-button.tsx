"use client";
import { BellIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import React from "react";
import { baseNavIconButtonClassnames } from "./nav";
import { useQuery } from "@tanstack/react-query";
import { currentUser } from "@clerk/nextjs/server";
import useCurrentUserQuery from "@/app/queries/useCurrentUserQuery";
import { getNotificationsByUserId } from "@/actions/user-notification";

export default function NotificationsButton() {
  const currentUserQuery = useCurrentUserQuery();

  const userId = currentUserQuery.data?.id;

  const userNotificationsQuery = useQuery({
    enabled: !!userId,
    queryKey: ["userNotifications"],
    queryFn: () => getNotificationsByUserId(userId || "")
  });

  return <IconButton className={baseNavIconButtonClassnames}><BellIcon /></IconButton>
}
