import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getIntroVideo } from "@/lib/courses";

// Authenticated students can get intro video config (but not change it)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const intro = await getIntroVideo();
    return NextResponse.json(intro);
  } catch {
    return NextResponse.json({ error: "Failed to fetch intro video" }, { status: 500 });
  }
}
