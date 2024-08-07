"use client";
import {
  getCountUnreadNotificationsByUserId,
  getUnreadNotificationsByUserId,
  markAllUserNotificationsAsRead,
} from "@/actions/user-notification";
import timeAgo from "@/app/utils/time-ago";
import { useUser } from "@clerk/nextjs";
import { BellAlertIcon, BellIcon } from "@heroicons/react/24/outline";
import { Avatar, Divider, IconButton, Popover } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useHighlightNavIconButtonIfActive } from "./nav";
import Image from "next/image";

export default function UserNotificationsNavButton() {
  const ref = useRef(null);
  const [hasDismissedNotifications, setHasDismissedNotifications] =
    useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const unreadUserNotificationsQuery = useQuery({
    queryKey: ["userNotifications", user?.id],
    queryFn: async () => {
      console.log("Query fn");
      try {
        const notifications = await getUnreadNotificationsByUserId(
          user?.id ?? "",
        );
        console.log({ notifications });
        return notifications;
      } catch (e) {
        return [];
      }
    },
  });

  const unreadUserNotificationsCountQuery = useQuery({
    queryKey: ["unreadUserNotificationsCount", user?.id],
    queryFn: async () => {
      try {
        const notifications = await getCountUnreadNotificationsByUserId(
          user?.id ?? "",
        );
        return notifications?.[0]?.count ?? 0;
      } catch (e) {
        return 0;
      }
    },
  });

  useEffect(() => {
    if (unreadUserNotificationsCountQuery.data) {
      document.title = `Get Cats Fast (${unreadUserNotificationsCountQuery.data})`;
    }
  }, [unreadUserNotificationsCountQuery.data]);

  const hasUnreadNotifications =
    Number(unreadUserNotificationsCountQuery.data) > 0 &&
    !hasDismissedNotifications;

  const notifications = unreadUserNotificationsQuery.data ?? [];

  const markUserNotificationsAsReadMutation = useMutation({
    mutationFn: async () => {
      try {
        await markAllUserNotificationsAsRead(user?.id ?? "");
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess: () => {
      setHasDismissedNotifications(true);
      unreadUserNotificationsQuery.refetch();
    },
  });

  const highlightNavItemIfPathMatches = useHighlightNavIconButtonIfActive();

  const unreadNotificationsClassName =
    "absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center";

  return (
    <div className="relative" ref={ref}>
      {hasUnreadNotifications && (
        <div className={unreadNotificationsClassName}>
          {unreadUserNotificationsCountQuery.data}
        </div>
      )}
      <IconButton onClick={() => setOpen(!open)}>
        {hasUnreadNotifications ? (
          <BellAlertIcon className="h-6 w-6 text-white" />
        ) : (
          <Link href="/notifications">
            <BellIcon
              className={
                highlightNavItemIfPathMatches("/notifications") + " w-6 h-6"
              }
            />
          </Link>
        )}
      </IconButton>

      <Popover
        disableScrollLock
        anchorEl={ref.current}
        open={open && hasUnreadNotifications}
        onClose={() => {
          setOpen(!open);
          markUserNotificationsAsReadMutation.mutate();
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="min-w-80">
          <Link href="/notifications">
            <div className="flex items-baseline w-full justify-between">
              <div className="p-3 text-xl">Notifications</div>
              <div className="p-3 text-xs text-slate-200 font-bold tracking-wider">
                {unreadUserNotificationsCountQuery.data} new!
              </div>
            </div>
          </Link>
          <Divider />
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.redirectAction ?? ""}
            >
              <div className="p-3">
                <div className="flex gap-x-2">
                  <div>
                    {notification.imageUrl && (
                      <Avatar
                        className="mt-2"
                        src={notification.imageUrl}
                        alt={notification.title}
                      />
                    )}
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-baseline">
                      <div className="font-bold">{notification.title}</div>
                      <div className="text-sm text-slate-500">
                        {timeAgo(notification.createdAt)}
                      </div>
                    </div>
                    <div className="mt-1 text-slate-300">
                      {notification.message}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Popover>
    </div>
  );
}
