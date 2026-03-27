import fs from "fs/promises";
import path from "path";
import { stripDangerousKeys } from "./sanitize";

const DATA_DIR = path.join(__dirname, "../../data");

export async function readJson<T>(filename: string): Promise<T[]> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as T[];
  } catch {
    return [];
  }
}

export async function writeJson<T>(filename: string, data: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

export async function readSingleJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as T;
  } catch {
    return fallback;
  }
}

export async function writeSingleJson<T>(filename: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

export function getDataDir(): string {
  return DATA_DIR;
}
