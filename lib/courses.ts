import fs from "fs/promises";
import path from "path";
import { stripDangerousKeys } from "./fileRateLimit";

const COURSES_FILE = path.join(process.cwd(), "data", "courses.json");
const LESSONS_FILE = path.join(process.cwd(), "data", "lessons.json");
const INTRO_FILE = path.join(process.cwd(), "data", "intro-video.json");

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; // cents
  currency: string;
  duration: string;
  level: string;
  thumbnail: string | null;
  published: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoFile: string | null;
  durationSeconds: number;
  order: number;
}

export interface IntroVideo {
  videoFile: string | null;
  duration: number; // seconds
}

// ── Courses ──────────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  try {
    const data = await fs.readFile(COURSES_FILE, "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as Course[];
  } catch {
    return [];
  }
}

async function saveCourses(courses: Course[]) {
  await fs.writeFile(COURSES_FILE, JSON.stringify(courses, null, 2));
}

export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find((c) => c.id === id) ?? null;
}

export async function createCourse(data: Omit<Course, "id">): Promise<Course> {
  const courses = await getCourses();
  const maxId = courses.reduce((m, c) => Math.max(m, parseInt(c.id) || 0), 0);
  const course: Course = { ...data, id: String(maxId + 1) };
  courses.push(course);
  await saveCourses(courses);
  return course;
}

export async function updateCourse(id: string, data: Partial<Omit<Course, "id">>): Promise<Course | null> {
  const courses = await getCourses();
  const idx = courses.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  courses[idx] = { ...courses[idx], ...data };
  await saveCourses(courses);
  return courses[idx];
}

export async function deleteCourse(id: string): Promise<boolean> {
  const courses = await getCourses();
  const filtered = courses.filter((c) => c.id !== id);
  if (filtered.length === courses.length) return false;
  await saveCourses(filtered);
  return true;
}

// ── Lessons ───────────────────────────────────────────────────────────────────

export async function getLessons(): Promise<Lesson[]> {
  try {
    const data = await fs.readFile(LESSONS_FILE, "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as Lesson[];
  } catch {
    return [];
  }
}

async function saveLessons(lessons: Lesson[]) {
  await fs.writeFile(LESSONS_FILE, JSON.stringify(lessons, null, 2));
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const lessons = await getLessons();
  return lessons
    .filter((l) => l.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  const lessons = await getLessons();
  return lessons.find((l) => l.id === id) ?? null;
}

export async function createLesson(data: Omit<Lesson, "id">): Promise<Lesson> {
  const lessons = await getLessons();
  const maxId = lessons.reduce((m, l) => Math.max(m, parseInt(l.id) || 0), 0);
  const lesson: Lesson = { ...data, id: String(maxId + 1) };
  lessons.push(lesson);
  await saveLessons(lessons);
  return lesson;
}

export async function updateLesson(id: string, data: Partial<Omit<Lesson, "id">>): Promise<Lesson | null> {
  const lessons = await getLessons();
  const idx = lessons.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  lessons[idx] = { ...lessons[idx], ...data };
  await saveLessons(lessons);
  return lessons[idx];
}

export async function deleteLesson(id: string): Promise<boolean> {
  const lessons = await getLessons();
  const filtered = lessons.filter((l) => l.id !== id);
  if (filtered.length === lessons.length) return false;
  await saveLessons(filtered);
  return true;
}

// ── Intro Video ───────────────────────────────────────────────────────────────

export async function getIntroVideo(): Promise<IntroVideo> {
  try {
    const data = await fs.readFile(INTRO_FILE, "utf-8");
    return JSON.parse(data) as IntroVideo;
  } catch {
    return { videoFile: null, duration: 120 };
  }
}

export async function saveIntroVideo(data: IntroVideo) {
  await fs.writeFile(INTRO_FILE, JSON.stringify(data, null, 2));
}
