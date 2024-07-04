"use client";
import { getUnreadNotificationsByUserId, markAllUserNotificationsAsRead, markUserNotificationAsRead } from "@/actions/user-notification";
import useCurrentUserQuery from "@/app/queries/useCurrentUserQuery";
import { useUser } from "@clerk/nextjs";
import { BellAlertIcon, BellIcon } from "@heroicons/react/24/outline";
import { Divider, IconButton, Popover } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { baseNavIconButtonClassnames } from "./nav";
import { useRef, useState } from "react";
import timeAgo from "@/app/utils/time-ago";

export default function UserNotificationsNavButton() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const userNotificationsQuery = useQuery({
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

  const hasNotifications = Number(userNotificationsQuery.data?.length) > 0;

  const notifications = userNotificationsQuery.data ?? [];

  const markUserNotificationsAsReadMutation = useMutation({
    mutationFn: async () => {
      try {
        await markAllUserNotificationsAsRead(user?.id ?? "")
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess: () => { userNotificationsQuery.refetch() },
  });

  return (
    <div className="relative" ref={ref}>
      {hasNotifications && <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs rounded-full px-1">
        {userNotificationsQuery.data?.length}
      </div>}
      <IconButton onClick={() => setOpen(!open)}>
        {hasNotifications ? <BellAlertIcon className="h-6 w-6 text-white" /> : <BellIcon className="h-6 w-6 text-slate-600" />}
      </IconButton>

      <Popover
        anchorEl={ref.current}
        open={open}
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
          <div className="p-3 text-xl">
            Notifications
          </div>
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
