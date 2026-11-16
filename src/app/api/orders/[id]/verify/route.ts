import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrder, updateOrder } from "@/lib/orders";
import { verifyPaymentSignature } from "@/lib/razorpay";

const schema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

/** Called by the browser after Razorpay Checkout succeeds. The webhook is the backup path. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const order = await getOrder(id);
  if (!order || order.razorpayOrderId !== parsed.data.razorpay_order_id) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const ok = verifyPaymentSignature(
    parsed.data.razorpay_order_id,
    parsed.data.razorpay_payment_id,
    parsed.data.razorpay_signature,
  );
  if (!ok) return NextResponse.json({ error: "Payment could not be verified" }, { status: 400 });

  if (order.status === "pending") {
    await updateOrder(id, { status: "paid", razorpayPaymentId: parsed.data.razorpay_payment_id });
    // TODO: send confirmation emails (Resend) once configured.
  }
  return NextResponse.json({ ok: true });
}
