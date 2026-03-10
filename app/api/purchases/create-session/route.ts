import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getCourseById } from "@/lib/courses";
import { hasPurchasedCourse } from "@/lib/purchases";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey || stripeKey.includes("REPLACE_ME") || !stripeKey.startsWith("sk_")) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
    }
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-02-25.clover" });
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = (session.user as any)?.role;
    if (role !== "student") {
      return NextResponse.json({ error: "Only students can purchase courses" }, { status: 403 });
    }

    const body = await request.json();
    const courseId = String(body.courseId ?? "");
    if (!courseId) return NextResponse.json({ error: "courseId required" }, { status: 400 });

    const course = await getCourseById(courseId);
    if (!course || !course.published) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const userId = (session.user as any)?.id;
    const alreadyOwned = await hasPurchasedCourse(userId, courseId);
    if (alreadyOwned) {
      return NextResponse.json({ error: "You already own this course" }, { status: 400 });
    }

    const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: course.currency,
            product_data: {
              name: course.title,
              description: course.description.slice(0, 500),
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/lessons/${courseId}?success=true`,
      cancel_url: `${siteUrl}/lessons/${courseId}?cancelled=true`,
      metadata: { userId, courseId },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
