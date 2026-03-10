import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getIntroVideo, saveIntroVideo } from "@/lib/courses";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const intro = await getIntroVideo();
    return NextResponse.json(intro);
  } catch {
    return NextResponse.json({ error: "Failed to fetch intro video" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    await saveIntroVideo({
      videoFile: body.videoFile ? String(body.videoFile).slice(0, 200) : null,
      duration: typeof body.duration === "number" ? Math.max(1, Math.min(120, body.duration)) : 120,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save intro video" }, { status: 500 });
  }
}
