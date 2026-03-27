import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../models";

const JWT_SECRET = process.env.JWT_SECRET || "change-me";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/** Extract and verify JWT from Authorization header or cookie */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token =
    req.headers.authorization?.replace("Bearer ", "") ||
    req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

/** Require admin role */
export function adminOnly(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }
  next();
}

/** Optional auth — sets req.user if token present, doesn't fail otherwise */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const token =
    req.headers.authorization?.replace("Bearer ", "") ||
    req.cookies?.token;

  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      // ignore invalid token
    }
  }
  next();
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}
