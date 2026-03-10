import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCourses, createCourse, updateCourse, deleteCourse } from "@/lib/courses";

// Public — anyone can see published courses
export async function GET() {
  try {
    const courses = await getCourses();
    const session = await getServerSession(authOptions);
    const isAdmin = (session?.user as any)?.role === "admin";
    // Non-admins only see published courses
    const visible = isAdmin ? courses : courses.filter((c) => c.published);
    return NextResponse.json(visible);
  } catch {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    if (!body.title || typeof body.title !== "string" || body.title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const course = await createCourse({
      title: body.title.trim().slice(0, 200),
      description: (body.description ?? "").slice(0, 2000),
      price: typeof body.price === "number" && body.price >= 0 ? Math.round(body.price) : 0,
      currency: "usd",
      duration: (body.duration ?? "").slice(0, 50),
      level: (body.level ?? "").slice(0, 50),
      thumbnail: null,
      published: body.published === true,
    });
    return NextResponse.json(course, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updated = await updateCourse(body.id, {
      ...(body.title && { title: String(body.title).trim().slice(0, 200) }),
      ...(body.description !== undefined && { description: String(body.description).slice(0, 2000) }),
      ...(typeof body.price === "number" && { price: Math.round(body.price) }),
      ...(body.duration !== undefined && { duration: String(body.duration).slice(0, 50) }),
      ...(body.level !== undefined && { level: String(body.level).slice(0, 50) }),
      ...(body.published !== undefined && { published: Boolean(body.published) }),
    });
    if (!updated) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const deleted = await deleteCourse(id);
    if (!deleted) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
