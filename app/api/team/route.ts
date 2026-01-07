import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "team.json");

async function getTeamMembers() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
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

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newMember = await request.json();
    const members = await getTeamMembers();

    // Generate new ID
    const maxId = members.reduce((max: number, m: any) =>
      Math.max(max, parseInt(m.id) || 0), 0
    );
    newMember.id = String(maxId + 1);

    members.push(newMember);
    await saveTeamMembers(members);

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

// PUT - Update team member
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedMember = await request.json();
    const members = await getTeamMembers();

    const index = members.findIndex((m: any) => m.id === updatedMember.id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    members[index] = updatedMember;
    await saveTeamMembers(members);

    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// DELETE - Delete team member
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
