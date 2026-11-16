"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export function CartPill() {
  const { totals, ready } = useCart();
  return (
    <Link
      href="/#shop"
      className="flex items-center gap-2 rounded-full border border-border px-4 py-2"
      aria-label={`Cart, ${ready ? totals.itemCount : 0} items`}
    >
      <ShoppingBag className="size-4" />
      <span className="grid size-6 place-items-center rounded-full bg-charcoal text-xs font-bold text-white">
        {ready ? totals.itemCount : 0}
      </span>
    </Link>
  );
}
