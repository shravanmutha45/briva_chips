import { NextResponse } from "next/server";
import { findByRazorpayOrderId, updateOrder } from "@/lib/orders";
import { verifyWebhookSignature } from "@/lib/razorpay";

/** Razorpay webhook: subscribe to `order.paid` and `payment.captured` in the dashboard. */
export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: {
    event?: string;
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } };
  };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (event.event === "order.paid" || event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    if (payment?.order_id) {
      const order = await findByRazorpayOrderId(payment.order_id);
      if (order && order.status === "pending") {
        await updateOrder(order.id, { status: "paid", razorpayPaymentId: payment.id });
      }
    }
  }
  return NextResponse.json({ received: true });
}
