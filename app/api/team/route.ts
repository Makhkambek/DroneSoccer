import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { stripDangerousKeys } from "@/lib/fileRateLimit";
import fs from "fs/promises";
import path from "path";

function validateMember(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { valid: false, error: "Invalid member data" };
  }
  const m = data as Record<string, unknown>;
  if (!m.name || typeof m.name !== "string" || m.name.trim() === "" || m.name.length > 200) {
    return { valid: false, error: "Invalid or missing member name (max 200 chars)" };
  }
  if (m.role !== undefined && (typeof m.role !== "string" || m.role.length > 200)) {
    return { valid: false, error: "Role too long (max 200 chars)" };
  }
  if (m.bio !== undefined && (typeof m.bio !== "string" || m.bio.length > 2000)) {
    return { valid: false, error: "Bio too long (max 2000 chars)" };
  }
  if (m.image !== undefined && (typeof m.image !== "string" || m.image.length > 500)) {
    return { valid: false, error: "Invalid image URL (max 500 chars)" };
  }
  return { valid: true };
}

function sanitizeMember(data: Record<string, unknown>, existingId?: string) {
  return {
    ...(existingId ? { id: existingId } : {}),
    name: String(data.name ?? "").trim(),
    role: data.role !== undefined ? String(data.role).trim() : undefined,
    bio: data.bio !== undefined ? String(data.bio).trim() : undefined,
    image: data.image !== undefined ? String(data.image).trim() : undefined,
  };
}

const DATA_FILE = path.join(process.cwd(), "data", "team.json");

async function getTeamMembers() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as any[];
  } catch (error) {
    return [];
  }
}

async function saveTeamMembers(members: any[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2));
}

// GET - Read all team members
export async function GET() {
  try {
    const members = await getTeamMembers();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

// POST - Create new team member
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if ((session.user as any)?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const validation = validateMember(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const members = await getTeamMembers();
    const maxId = members.reduce((max: number, m: any) => Math.max(max, parseInt(m.id) || 0), 0);
    const newMember = { ...sanitizeMember(body), id: String(maxId + 1) };

    members.push(newMember);
    await saveTeamMembers(members);

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}

// PUT - Update team member
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if ((session.user as any)?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    if (!body.id || typeof body.id !== "string") {
      return NextResponse.json({ error: "Member ID required" }, { status: 400 });
    }
    const validation = validateMember(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const members = await getTeamMembers();
    const index = members.findIndex((m: any) => m.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    const updatedMember = { ...sanitizeMember(body, body.id) };
    members[index] = updatedMember;
    await saveTeamMembers(members);

    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

// DELETE - Delete team member
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if ((session.user as any)?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Member ID required" },
        { status: 400 }
      );
    }

    const members = await getTeamMembers();
    const filteredMembers = members.filter((m: any) => m.id !== id);

    if (filteredMembers.length === members.length) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    await saveTeamMembers(filteredMembers);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
