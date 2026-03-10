import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const VIDEOS_DIR = path.join(process.cwd(), "private", "videos");
const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/ogg"];
const MAX_SIZE_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only MP4, WebM, OGG videos are allowed" }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "File too large (max 2 GB)" }, { status: 400 });
    }

    // Safe filename: timestamp + original base name, strip dangerous chars
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${Date.now()}_${safeName}`;

    await mkdir(VIDEOS_DIR, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(VIDEOS_DIR, filename), buffer);

    return NextResponse.json({ filename }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
