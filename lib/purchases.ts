import fs from "fs/promises";
import path from "path";
import { stripDangerousKeys } from "./fileRateLimit";

const FILE = path.join(process.cwd(), "data", "purchases.json");

export interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  stripeSessionId: string;
  amount: number;
  currency: string;
  paidAt: string;
}

async function getPurchases(): Promise<Purchase[]> {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as Purchase[];
  } catch {
    return [];
  }
}

async function savePurchases(purchases: Purchase[]) {
  await fs.writeFile(FILE, JSON.stringify(purchases, null, 2));
}

export async function getUserPurchases(userId: string): Promise<Purchase[]> {
  const purchases = await getPurchases();
  return purchases.filter((p) => p.userId === userId);
}

export async function hasPurchasedCourse(userId: string, courseId: string): Promise<boolean> {
  const purchases = await getPurchases();
  return purchases.some((p) => p.userId === userId && p.courseId === courseId);
}

export async function recordPurchase(params: {
  userId: string;
  courseId: string;
  stripeSessionId: string;
  amount: number;
  currency: string;
}): Promise<Purchase> {
  const purchases = await getPurchases();

  // Idempotency — don't double-record the same Stripe session
  const existing = purchases.find((p) => p.stripeSessionId === params.stripeSessionId);
  if (existing) return existing;

  const maxId = purchases.reduce((m, p) => Math.max(m, parseInt(p.id) || 0), 0);
  const purchase: Purchase = {
    id: String(maxId + 1),
    ...params,
    paidAt: new Date().toISOString(),
  };
  purchases.push(purchase);
  await savePurchases(purchases);
  return purchase;
}
