import { Router, Request, Response } from "express";
import { readJson } from "../../utils/fileStore";
import { User, Purchase, Application, Product } from "../../models";
import { authenticate, adminOnly } from "../../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     tags: [Admin]
 *     summary: Dashboard statistics
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Counts and recent applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 students: { type: number }
 *                 purchases: { type: number }
 *                 applications: { type: number }
 *                 products: { type: number }
 *                 recentApplications: { type: array }
 */
router.get("/", authenticate, adminOnly, async (_req: Request, res: Response) => {
  const [users, purchases, applications, products] = await Promise.all([
    readJson<User>("users.json"),
    readJson<Purchase>("purchases.json"),
    readJson<Application>("applications.json"),
    readJson<Product>("products.json"),
  ]);

  res.json({
    students: users.length,
    purchases: purchases.length,
    applications: applications.length,
    products: products.length,
    recentApplications: applications
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 5),
  });
});

export default router;
