import { Router, Request, Response } from "express";
import { readJson, writeJson } from "../utils/fileStore";
import { Product } from "../models";
import { authenticate, adminOnly } from "../middleware/auth";

const router = Router();
const FILE = "products.json";

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: List all products
 *     responses:
 *       200: { description: "Array of products" }
 */
router.get("/", async (_req: Request, res: Response) => {
  res.json(await readJson<Product>(FILE));
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Create a product (admin only)
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       201: { description: "Product created" }
 */
router.post("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const { name, description, price, image, category, inStock } = req.body;
  if (!name) { res.status(400).json({ error: "Name is required" }); return; }

  const products = await readJson<Product>(FILE);
  const maxId = products.reduce((m, p) => Math.max(m, parseInt(p.id) || 0), 0);

  const product: Product = {
    id: String(maxId + 1),
    name: String(name).slice(0, 200),
    description: (description || "").slice(0, 2000),
    price: Math.max(0, parseFloat(price) || 0),
    image: (image || "").slice(0, 500),
    category: (category || "").slice(0, 50),
    inStock: inStock ?? true,
  };

  products.push(product);
  await writeJson(FILE, products);
  res.status(201).json(product);
});

/**
 * @swagger
 * /api/products:
 *   put:
 *     tags: [Products]
 *     summary: Update a product (admin only)
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       200: { description: "Product updated" }
 */
router.put("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const { id, ...updates } = req.body;
  if (!id) { res.status(400).json({ error: "id is required" }); return; }

  const products = await readJson<Product>(FILE);
  const product = products.find((p) => p.id === id);
  if (!product) { res.status(404).json({ error: "Product not found" }); return; }

  if (updates.name !== undefined) product.name = String(updates.name).slice(0, 200);
  if (updates.description !== undefined) product.description = String(updates.description).slice(0, 2000);
  if (updates.price !== undefined) product.price = Math.max(0, parseFloat(updates.price) || 0);
  if (updates.image !== undefined) product.image = String(updates.image).slice(0, 500);
  if (updates.category !== undefined) product.category = String(updates.category).slice(0, 50);
  if (updates.inStock !== undefined) product.inStock = Boolean(updates.inStock);

  await writeJson(FILE, products);
  res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product (admin only)
 *     security: [{ BearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: "Product deleted" }
 */
router.delete("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (!id) { res.status(400).json({ error: "id query param required" }); return; }

  const products = await readJson<Product>(FILE);
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) { res.status(404).json({ error: "Product not found" }); return; }

  await writeJson(FILE, filtered);
  res.json({ success: true });
});

export default router;
