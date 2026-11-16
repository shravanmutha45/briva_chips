import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CartPill } from "@/components/cart/CartPill";
import { Shell } from "@/components/ui/Shell";

export const metadata: Metadata = { title: "Checkout – Briva", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <Shell step="Details" right={<CartPill />}>
      <CheckoutForm />
    </Shell>
  );
}
