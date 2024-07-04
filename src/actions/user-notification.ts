import { getCatsFastDb, userNotificationTable } from "@/lib/core";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

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

export async function getNotificationsByUserId(userId: string) {
  try {
    const notifications = await getCatsFastDb
      .select()
      .from(userNotificationTable)
      .where(eq(userNotificationTable.userId, userId));

    return notifications;
  } catch (e) {
    console.error("Failed to get cat");
    console.error(e);
  }
}
export async function markUserNotificationAsRead(notificationId: number) {
  try {
    const updatedNotification = await getCatsFastDb
      .update(userNotificationTable)
      .set({ hasBeenRead: true })
      .where(eq(userNotificationTable.id, notificationId))

    return updatedNotification
  }
  catch (e) {
    throw (e)
  }
}
