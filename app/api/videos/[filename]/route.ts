import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { hasPurchasedCourse } from "@/lib/purchases";
import { getLessons, getIntroVideo } from "@/lib/courses";
import { createReadStream, statSync } from "fs";
import path from "path";

const VIDEOS_DIR = path.join(process.cwd(), "private", "videos");

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    // Sanitize filename — prevent path traversal
    const filename = path.basename(params.filename);
    if (!filename || filename.includes("..")) {
      return new Response("Invalid filename", { status: 400 });
    }

    const filePath = path.join(VIDEOS_DIR, filename);

    // Check if this is the intro video (accessible to all authenticated users)
    const introVideo = await getIntroVideo();
    const isIntro = introVideo.videoFile === filename;

    // For non-intro videos, verify the user has purchased the course
    if (!isIntro) {
      const role = (session.user as any)?.role;
      if (role !== "admin") {
        const userId = (session.user as any)?.id;
        // Find which course this video belongs to
        const lessons = await getLessons();
        const lesson = lessons.find((l) => l.videoFile === filename);
        if (!lesson) return new Response("Not found", { status: 404 });

        const purchased = await hasPurchasedCourse(userId, lesson.courseId);
        if (!purchased) return new Response("Purchase required", { status: 403 });
      }
    }

    // Stat the file
    let stat: ReturnType<typeof statSync>;
    try {
      stat = statSync(filePath);
    } catch {
      return new Response("Video not found", { status: 404 });
    }

    const fileSize = stat.size;
    const rangeHeader = request.headers.get("range");

    if (rangeHeader) {
      // Partial content for seeking
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const stream = createReadStream(filePath, { start, end });
      // @ts-ignore — Node.js stream is compatible with Response body
      return new Response(stream as any, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": String(chunkSize),
          "Content-Type": "video/mp4",
          "Cache-Control": "no-store",
        },
      });
    } else {
      const stream = createReadStream(filePath);
      // @ts-ignore
      return new Response(stream as any, {
        headers: {
          "Content-Length": String(fileSize),
          "Content-Type": "video/mp4",
          "Accept-Ranges": "bytes",
          "Cache-Control": "no-store",
        },
      });
    }
  } catch (error) {
    console.error("Video stream error:", error);
    return new Response("Server error", { status: 500 });
  }
}
