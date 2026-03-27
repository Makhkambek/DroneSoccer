import bcrypt from "bcryptjs";
import { readJson, writeJson } from "../utils/fileStore";
import { User } from "../models";

const FILE = "users.json";

export async function getUsers(): Promise<User[]> {
  return readJson<User>(FILE);
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
  const existing = users.find((u) => u.email.toLowerCase() === params.email.toLowerCase());
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
  await writeJson(FILE, users);
  return user;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

export function generatePassword(): string {
  const words = ["Drone", "Pilot", "Solar", "Relay", "Chase"];
  const word = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${word}#${num}`;
}
