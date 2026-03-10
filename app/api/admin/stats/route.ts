import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUsers } from "@/lib/users";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [users, purchases, applications, products] = await Promise.all([
    getUsers(),
    readJSON("purchases.json"),
    readJSON("applications.json"),
    readJSON("products.json"),
  ]);

  const recentApplications = (applications as any[])
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5)
    .map((a) => ({ name: `${a.firstName} ${a.lastName}`, course: a.course, date: a.submittedAt }));

  return NextResponse.json({
    students: users.length,
    purchases: (purchases as any[]).length,
    applications: (applications as any[]).length,
    products: (products as any[]).length,
    recentApplications,
  });
}

async function readJSON(filename: string) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), "data", filename), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}
