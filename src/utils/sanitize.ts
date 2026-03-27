export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function stripDangerousKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(stripDangerousKeys);
  if (obj && typeof obj === "object") {
    const clean: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
      clean[key] = stripDangerousKeys(value);
    }
    return clean;
  }
  return obj;
}
