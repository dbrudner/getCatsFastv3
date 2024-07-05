"use server";
import {
  UserNotification,
  getCatsFastDb,
  userNotificationTable,
} from "@/lib/core";
import { and, count, eq } from "drizzle-orm";

type UserNotificationInput = Pick<
  UserNotification,
  | "message"
  | "createdByUserId"
  | "createdForUserId"
  | "title"
  | "redirectAction"
>;

export async function createUserNotification(
  userNotificationInput: UserNotificationInput,
) {
  try {
    const insertedNotification = await getCatsFastDb
      .insert(userNotificationTable)
      .values([userNotificationInput])
      .returning();

    console.log(insertedNotification[0]);
    return insertedNotification[0];
  } catch (e) {
    console.log("Failed to create user notification");
    console.error(e);
  }
}

export async function getUnreadNotificationsByUserId(userId: string) {
  try {
    const notifications = await getCatsFastDb
      .select()
      .from(userNotificationTable)
      .where(
        and(
          eq(userNotificationTable.createdForUserId, userId),
          eq(userNotificationTable.hasBeenRead, false),
        ),
      );

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
      .where(eq(userNotificationTable.createdForUserId, userId));

    return "done";
  } catch (e) {
    throw e;
  }
}

export async function getCountUnreadNotificationsByUserId(userId: string) {
  try {
    const userNotificationsCount = await getCatsFastDb
      .select({ count: count() })
      .from(userNotificationTable)
      .where(
        and(
          eq(userNotificationTable.createdForUserId, userId),
          eq(userNotificationTable.hasBeenRead, false),
        ),
      );

    return userNotificationsCount;
  } catch (e) {
    console.error("Failed to get notifications");
    console.error(e);
  }
}

export async function getAllNotificationsByUserId(userId: string) {
  try {
    const notifications = await getCatsFastDb
      .select()
      .from(userNotificationTable)
      .where(eq(userNotificationTable.createdForUserId, userId));
    return notifications;
  } catch (e) {
    console.error("Failed to get notifications");
    console.error(e);
  }
}
