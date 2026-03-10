import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import { stripDangerousKeys } from "./fileRateLimit";

const FILE = path.join(process.cwd(), "data", "users.json");

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "student";
  createdAt: string;
  applicationId?: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as User[];
  } catch {
    return [];
  }
}

async function saveUsers(users: User[]) {
  await fs.writeFile(FILE, JSON.stringify(users, null, 2));
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function createUser(params: {
  email: string;
  password: string;
  name: string;
  applicationId?: string;
}): Promise<User> {
  const users = await getUsers();
  const existing = users.find(
    (u) => u.email.toLowerCase() === params.email.toLowerCase()
  );
  if (existing) throw new Error("User with this email already exists");

  const maxId = users.reduce((m, u) => Math.max(m, parseInt(u.id) || 0), 0);
  const passwordHash = await bcrypt.hash(params.password, 12);

  const user: User = {
    id: String(maxId + 1),
    email: params.email.toLowerCase(),
    passwordHash,
    name: params.name,
    role: "student",
    createdAt: new Date().toISOString(),
    applicationId: params.applicationId,
  };

  users.push(user);
  await saveUsers(users);
  return user;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

/** Generate a random readable password like "Drone#4821" */
export function generatePassword(): string {
  const words = ["Drone", "Pilot", "Solar", "Relay", "Chase"];
  const word = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${word}#${num}`;
}
