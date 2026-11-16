import { NextResponse } from "next/server";
import { orderRequestSchema } from "@/lib/checkout-schema";
import { createOrder, priceItems, updateOrder } from "@/lib/orders";
import { createRazorpayOrder, razorpayEnabled } from "@/lib/razorpay";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = orderRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your details", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { customer, items } = parsed.data;
  // Never trust client prices – recompute from the server-side config.
  const priced = priceItems(items);
  if (priced.total <= 0) return NextResponse.json({ error: "Your cart is empty" }, { status: 422 });

  const useRazorpay = razorpayEnabled();
  const order = await createOrder({
    customer,
    items: priced.items,
    subtotal: priced.subtotal,
    delivery: priced.delivery,
    total: priced.total,
    paymentMode: useRazorpay ? "razorpay" : "test",
  });

  if (!useRazorpay) {
    // Test mode: no payment keys configured yet, so the order is accepted straight away.
    await updateOrder(order.id, { status: "paid" });
    return NextResponse.json({ orderId: order.id, testMode: true });
  }

  try {
    const rzp = await createRazorpayOrder(priced.total, order.orderNumber);
    await updateOrder(order.id, { razorpayOrderId: rzp.id });
    return NextResponse.json({
      orderId: order.id,
      razorpay: {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        orderId: rzp.id,
        amount: rzp.amount,
        currency: rzp.currency,
      },
      prefill: { name: customer.name, contact: `+91${customer.phone}`, email: customer.email || undefined },
    });
  } catch (err) {
    console.error(err);
    await updateOrder(order.id, { status: "cancelled" });
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }
}
