import { Router, Request, Response } from "express";
import { readJson } from "../utils/fileStore";
import { Purchase } from "../models";
import { authenticate } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/purchases:
 *   get:
 *     tags: [Purchases]
 *     summary: Get current user's purchases or check course ownership
 *     security: [{ BearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema: { type: string }
 *         description: "If provided, returns { owned: boolean } instead of full list"
 *     responses:
 *       200: { description: "Purchases list or ownership check" }
 */
router.get("/", authenticate, async (req: Request, res: Response) => {
  const purchases = await readJson<Purchase>("purchases.json");
  const userPurchases = purchases.filter((p) => p.userId === req.user!.sub);

  const courseId = req.query.courseId as string;
  if (courseId) {
    res.json({ owned: userPurchases.some((p) => p.courseId === courseId) });
    return;
  }

  res.json(userPurchases);
});

export default router;
