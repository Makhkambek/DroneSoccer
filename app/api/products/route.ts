import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { stripDangerousKeys } from "@/lib/fileRateLimit";
import fs from "fs/promises";
import path from "path";

function validateProduct(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { valid: false, error: "Invalid product data" };
  }
  const p = data as Record<string, unknown>;
  if (!p.name || typeof p.name !== "string" || p.name.trim() === "" || p.name.length > 200) {
    return { valid: false, error: "Invalid or missing product name (max 200 chars)" };
  }
  if (p.description !== undefined && (typeof p.description !== "string" || p.description.length > 2000)) {
    return { valid: false, error: "Description too long (max 2000 chars)" };
  }
  if (p.price !== undefined && (typeof p.price !== "number" || p.price < 0)) {
    return { valid: false, error: "Price must be a non-negative number" };
  }
  if (p.image !== undefined && (typeof p.image !== "string" || p.image.length > 500)) {
    return { valid: false, error: "Invalid image URL (max 500 chars)" };
  }
  return { valid: true };
}

function sanitizeProduct(data: Record<string, unknown>, existingId?: string) {
  return {
    ...(existingId ? { id: existingId } : {}),
    name: String(data.name ?? "").trim(),
    description: data.description !== undefined ? String(data.description).trim() : "",
    price: typeof data.price === "number" ? data.price : undefined,
    image: data.image !== undefined ? String(data.image).trim() : undefined,
    category: data.category !== undefined ? String(data.category).slice(0, 100) : undefined,
    inStock: typeof data.inStock === "boolean" ? data.inStock : undefined,
  };
}

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

async function getProducts() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as any[];
  } catch (error) {
    return [];
  }
}

async function saveProducts(products: any[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));
}

// GET - Read all products
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = validateProduct(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const products = await getProducts();
    const maxId = products.reduce((max: number, p: any) => Math.max(max, parseInt(p.id) || 0), 0);
    const newProduct = { ...sanitizeProduct(body), id: String(maxId + 1) };

    products.push(newProduct);
    await saveProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// PUT - Update product
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.id || typeof body.id !== "string") {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }
    const validation = validateProduct(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const products = await getProducts();
    const index = products.findIndex((p: any) => p.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updatedProduct = { ...sanitizeProduct(body, body.id) };
    products[index] = updatedProduct;
    await saveProducts(products);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE - Delete product
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const products = await getProducts();
    const filteredProducts = products.filter((p: any) => p.id !== id);

    if (filteredProducts.length === products.length) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await saveProducts(filteredProducts);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
