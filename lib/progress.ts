import fs from "fs/promises";
import path from "path";
import { stripDangerousKeys } from "./fileRateLimit";

const FILE = path.join(process.cwd(), "data", "progress.json");

export interface ProgressEntry {
  userId: string;
  type: "intro" | "lesson";
  lessonId?: string;
  courseId?: string;
  watchedSeconds: number;
  completed: boolean;
  completedAt?: string;
  updatedAt: string;
}

async function getAllProgress(): Promise<ProgressEntry[]> {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as ProgressEntry[];
  } catch {
    return [];
  }
}

async function saveProgress(entries: ProgressEntry[]) {
  await fs.writeFile(FILE, JSON.stringify(entries, null, 2));
}

export async function hasCompletedIntro(userId: string): Promise<boolean> {
  const all = await getAllProgress();
  return all.some((e) => e.userId === userId && e.type === "intro" && e.completed);
}

export async function getCourseProgress(userId: string, courseId: string): Promise<ProgressEntry[]> {
  const all = await getAllProgress();
  return all.filter((e) => e.userId === userId && e.courseId === courseId && e.type === "lesson");
}

export async function isLessonCompleted(userId: string, lessonId: string): Promise<boolean> {
  const all = await getAllProgress();
  return all.some((e) => e.userId === userId && e.lessonId === lessonId && e.completed);
}

export async function upsertProgress(entry: Omit<ProgressEntry, "updatedAt">): Promise<ProgressEntry> {
  const all = await getAllProgress();
  const now = new Date().toISOString();

  const key = entry.type === "intro"
    ? (e: ProgressEntry) => e.userId === entry.userId && e.type === "intro"
    : (e: ProgressEntry) => e.userId === entry.userId && e.lessonId === entry.lessonId;

  const idx = all.findIndex(key);
  const updated: ProgressEntry = { ...entry, updatedAt: now };

  if (idx !== -1) {
    // Only advance watchedSeconds forward, never backward (anti-cheat)
    updated.watchedSeconds = Math.max(all[idx].watchedSeconds, entry.watchedSeconds);
    if (!all[idx].completed && entry.completed) {
      updated.completedAt = now;
    } else {
      updated.completedAt = all[idx].completedAt;
    }
    all[idx] = updated;
  } else {
    if (entry.completed) updated.completedAt = now;
    all.push(updated);
  }

  await saveProgress(all);
  return updated;
}
