import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Shell } from "@/components/ui/Shell";
import { CONTACT_EMAIL } from "@/components/sections/Footer";
import { getOrder, toPublic } from "@/lib/orders";
import { formatINR, PRODUCT } from "@/lib/pricing";

export const metadata: Metadata = { title: "Order placed – Briva", robots: { index: false } };
export const dynamic = "force-dynamic";

const TRACK = ["Order placed", "Packed", "Shipped", "Delivered"] as const;
const STATUS_STEP: Record<string, number> = { pending: 0, paid: 0, packed: 1, shipped: 2, delivered: 3 };

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const raw = await getOrder(id);
  if (!raw) notFound();
  const order = toPublic(raw);
  const current = STATUS_STEP[order.status] ?? 0;
  const paid = order.status !== "pending" && order.status !== "cancelled";

  return (
    <Shell>
      <div className="mx-auto max-w-[720px] text-center">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-yellow">
          <Check className="size-10" strokeWidth={2.5} />
        </span>
        <h1 className="mt-6 text-[32px] leading-tight font-bold tracking-[-0.03em] md:text-[44px]">
          {paid ? "Thank you! Your order is placed." : "We're confirming your payment."}
        </h1>
        <p className="mt-3 text-muted">
          Order #{order.orderNumber}
          {paid ? " · A confirmation has been sent to your mobile and email." : " · This page will show the update shortly."}
        </p>
        {order.paymentMode === "test" && (
          <p className="mx-auto mt-4 w-fit rounded-full bg-yellow-tint px-4 py-1.5 text-xs font-semibold">
            Test order – no payment was taken
          </p>
        )}
      </div>

      <div className="mx-auto mt-10 grid max-w-[880px] gap-4 md:grid-cols-2">
        <section className="rounded-card bg-grey p-6">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {order.items.map((i) => (
              <li key={i.packId} className="flex justify-between gap-4">
                <span>
                  {PRODUCT.name} – {i.label} × {i.qty}
                </span>
                <span>{formatINR(i.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd>{order.delivery === 0 ? "Free" : formatINR(order.delivery)}</dd>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <dt>Total</dt>
              <dd className="font-display">{formatINR(order.total)}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-muted">Paid via</dt>
              <dd>{order.paymentMode === "test" ? "Test mode" : "Razorpay"}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-card bg-grey p-6">
          <h2 className="font-display text-lg font-semibold">Delivery</h2>
          <p className="mt-2 text-[15px] text-muted">
            Delivering to {order.firstName}, {order.city} – {order.pincode}
          </p>
          <ol className="mt-6 space-y-5">
            {TRACK.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                <span
                  className={`grid size-7 place-items-center rounded-full text-xs font-bold ${
                    i <= current ? "bg-yellow" : "border border-border bg-white text-muted"
                  }`}
                >
                  {i <= current ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className={i <= current ? "font-medium" : "text-muted"}>{t}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="btn-dark px-8">
          Continue shopping
        </Link>
        <p className="mt-5 text-sm text-muted">
          Questions? Write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-charcoal underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </Shell>
  );
}
