import { Request, Response, NextFunction } from "express";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

export function rateLimit(opts: { windowMs: number; max: number; prefix?: string }) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() || "unknown";
    const key = `${opts.prefix || ""}:${ip}`;
    const now = Date.now();

    const entry = store.get(key);
    if (entry && now < entry.resetAt) {
      if (entry.count >= opts.max) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        res.status(429).json({ error: "Too many requests", retryAfter });
        return;
      }
      entry.count++;
    } else {
      store.set(key, { count: 1, resetAt: now + opts.windowMs });
    }

    next();
  };
}
