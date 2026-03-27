import express from "express";
import cors from "cors";
import path from "path";

// Load env from parent .env.local for dev (reuse existing config)
import fs from "fs";
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  }
  // Map NEXTAUTH_SECRET to JWT_SECRET if not set
  if (!process.env.JWT_SECRET && process.env.NEXTAUTH_SECRET) {
    process.env.JWT_SECRET = process.env.NEXTAUTH_SECRET;
  }
}

import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/courses.routes";
import lessonRoutes from "./routes/lessons.routes";
import productRoutes from "./routes/products.routes";
import purchaseRoutes from "./routes/purchases.routes";
import notificationRoutes from "./routes/notifications.routes";
import applicationRoutes from "./routes/applications.routes";
import adminStudentRoutes from "./routes/admin/students.routes";
import adminStatsRoutes from "./routes/admin/stats.routes";
import adminIntroVideoRoutes from "./routes/admin/introVideo.routes";
import { setupSwagger } from "./swagger";

const app = express();
const PORT = parseInt(process.env.PORT || "4000", 10);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/apply", applicationRoutes);
app.use("/api/admin/students", adminStudentRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin/intro-video", adminIntroVideoRoutes);

// Swagger
setupSwagger(app);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 DroneSoccer API running on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs: http://localhost:${PORT}/api/docs`);
});

export default app;
