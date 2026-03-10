import { NextResponse } from "next/server";
import Stripe from "stripe";
import { recordPurchase } from "@/lib/purchases";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-02-25.clover" });

// Stripe webhooks need raw body — disable Next.js body parsing
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, courseId } = session.metadata ?? {};

    if (userId && courseId && session.payment_status === "paid") {
      await recordPurchase({
        userId,
        courseId,
        stripeSessionId: session.id,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
      });
    }
  }

  return NextResponse.json({ received: true });
}
