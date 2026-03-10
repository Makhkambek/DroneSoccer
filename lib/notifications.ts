import fs from "fs/promises";
import path from "path";

const FILE = path.join(process.cwd(), "data", "notifications.json");

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

async function getAll(): Promise<Notification[]> {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveAll(notifications: Notification[]) {
  await fs.writeFile(FILE, JSON.stringify(notifications, null, 2));
}

export async function createNotification(data: Omit<Notification, "id" | "read" | "createdAt">): Promise<Notification> {
  const all = await getAll();
  const notification: Notification = {
    ...data,
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  all.push(notification);
  await saveAll(all);
  return notification;
}

export async function getUserNotifications(userId: string): Promise<Notification[]> {
  const all = await getAll();
  return all
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function markAllRead(userId: string): Promise<void> {
  const all = await getAll();
  const updated = all.map((n) =>
    n.userId === userId ? { ...n, read: true } : n
  );
  await saveAll(updated);
}

export async function markOneRead(id: string, userId: string): Promise<void> {
  const all = await getAll();
  const updated = all.map((n) =>
    n.id === id && n.userId === userId ? { ...n, read: true } : n
  );
  await saveAll(updated);
}
