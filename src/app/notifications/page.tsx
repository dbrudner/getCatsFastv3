"use server";
import {
  getAllNotificationsByUserId,
  markAllUserNotificationsAsRead,
} from "@/actions/user-notification";
import { UserNotification } from "@/lib/core";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import timeAgo from "../utils/time-ago";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@mui/material";

function NotificationItem({
  message,
  createdAt,
  hasBeenRead,
  title,
  redirectAction,
  imageUrl,
}: UserNotification) {
  const messageClassName = classNames(
    "text-lg",
    hasBeenRead ? "text-slate-300" : "text-white",
  );

  return (
    <Link href={redirectAction ?? ""}>
      <div className="flex items-start gap-x-4">
        {imageUrl && <Avatar src={imageUrl} className="mt-2" />}
        <div>
          <div className="flex items-center">
            <div className="text-xl text-white font-bold inline">{title}</div>
            {hasBeenRead && (
              <div className="inline ml-2 text-xs border px-2 bg-green-500 text-black rounded-lg border-green-500">
                New
              </div>
            )}
          </div>
          <p className="text-slate-600 text-sm inline">{timeAgo(createdAt)}</p>
          <p className={messageClassName}>{message}</p>
        </div>
      </div>
    </Link>
  );
}

export default async function Notifications() {
  const user = await currentUser();
  const userNotifications = await getAllNotificationsByUserId(user?.id || "");
  markAllUserNotificationsAsRead(user?.id || "");

  const sortedUserNotifications = userNotifications?.toSorted((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-wider text-white mt-10">
        Notifications
      </h1>
      <p className="text-sm text-slate-400 mb-4">
        You can check all of your read and unread notifications here.
      </p>
      <div className="flex flex-col gap-y-6">
        {sortedUserNotifications?.map((notification) => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
}
