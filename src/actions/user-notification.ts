"use server"
import { getCatsFastDb, userNotificationTable } from "@/lib/core";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function createUserNotification(message: string, userId: string) {

  const insertedNotification = await getCatsFastDb
    .insert(userNotificationTable)
    .values([
      {
        message,
        userId,
      },
    ])
    .returning();

  return insertedNotification[0]
}

export async function getUnreadNotificationsByUserId(userId: string) {
  try {
    const notifications = await getCatsFastDb
      .select()
      .from(userNotificationTable)
      .where(and(eq(userNotificationTable.userId, userId), eq(userNotificationTable.hasBeenRead, false)))

    return notifications;
  } catch (e) {
    console.error("Failed to get notifications");
    console.error(e);
  }
}
export async function markAllUserNotificationsAsRead(userId: string) {
  try {
    const updatedNotifications = await getCatsFastDb
      .update(userNotificationTable)
      .set({ hasBeenRead: true })
      .where(eq(userNotificationTable.userId, userId))

    return "done";
  }
  catch (e) {
    throw (e)
  }
}
