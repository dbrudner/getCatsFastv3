"use client";
import { getCountUnreadNotificationsByUserId, getUnreadNotificationsByUserId, markAllUserNotificationsAsRead } from "@/actions/user-notification";
import timeAgo from "@/app/utils/time-ago";
import { useUser } from "@clerk/nextjs";
import { BellAlertIcon, BellIcon } from "@heroicons/react/24/outline";
import { Divider, IconButton, Popover } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRef, useState } from "react";
import { useHighlightNavIconButtonIfActive } from "./nav";

export default function UserNotificationsNavButton() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const unreadUserNotificationsQuery = useQuery({
    queryKey: ["userNotifications", user?.id],
    queryFn: async () => {
      console.log("Query fn")
      try {
        const notifications = await getUnreadNotificationsByUserId(user?.id ?? "");
        console.log({ notifications })
        return notifications;
      }
      catch (e) {
        return [];
      }
    },
  });

  const unreadUserNotificationsCountQuery = useQuery({
    queryKey: ["unreadUserNotificationsCount", user?.id],
    queryFn: async () => {
      try {
        const notifications = await getCountUnreadNotificationsByUserId(user?.id ?? "");
        return notifications?.[0]?.count ?? 0;
      }
      catch (e) {
        return 0;
      }
    },
  });
  console.log(unreadUserNotificationsCountQuery.data, "blah");

  const hasUnreadNotifications = Number(unreadUserNotificationsCountQuery.data) > 0;

  const notifications = unreadUserNotificationsQuery.data ?? [];

  const markUserNotificationsAsReadMutation = useMutation({
    mutationFn: async () => {
      try {
        await markAllUserNotificationsAsRead(user?.id ?? "")
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess: () => { unreadUserNotificationsQuery.refetch() },
  });

  const highlightNavItemIfPathMatches = useHighlightNavIconButtonIfActive();

  return (
    <div className="relative" ref={ref}>
      {hasUnreadNotifications && <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
        {unreadUserNotificationsCountQuery.data}
      </div>}
      <IconButton onClick={() => setOpen(!open)}>
        {hasUnreadNotifications ? <BellAlertIcon className="h-6 w-6 text-white" /> : <Link href="/notifications"><BellIcon className={highlightNavItemIfPathMatches("/notifications") + " w-8 h-8"} /></Link>}
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
        <div className="w-60">
          <Link href="/notifications">
            <div className="p-3 text-xl">
              Notifications
            </div>

          </Link>
          <Divider />
          {notifications.map((notification) => (
            <div key={notification.id} className="p-3">
              <div className="text-sm text-slate-500">
                {timeAgo(notification.createdAt)}
              </div>
              <div>
                {notification.message}
              </div>
            </div>
          ))}
        </div>
      </Popover>
    </div>

  );
}
