"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, ShoppingBag, Truck, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { formatINR, PACKS, PRODUCT } from "@/lib/pricing";

export function CartDrawer() {
  const { isOpen, close, lines, totals, setQty, remove, replace } = useCart();
  const onlySingles = lines.length > 0 && lines.every((l) => !PACKS[l.packId].freeDelivery);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed top-2 right-2 bottom-2 z-50 flex w-[calc(100%-16px)] max-w-[440px] flex-col rounded-[28px] bg-white shadow-high"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <h2 className="text-2xl font-bold">Your cart ({totals.itemCount})</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="grid size-10 place-items-center rounded-full bg-grey hover:bg-border"
              >
                <X className="size-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-grey">
                  <ShoppingBag className="size-7" />
                </span>
                <p className="text-muted">Your cart is empty.</p>
                <Link href="/#shop" onClick={close} className="btn-yellow">
                  Shop the chips
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-2">
                  {lines.map((l) => {
                    const p = PACKS[l.packId];
                    return (
                      <li key={l.packId} className="flex gap-4 rounded-3xl border border-border p-3">
                        <Image
                          src={PRODUCT.image}
                          alt=""
                          width={88}
                          height={88}
                          className="size-[88px] rounded-2xl bg-grey object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="leading-snug font-semibold">{PRODUCT.name}</p>
                              <p className="text-sm text-muted">
                                {p.label} · {p.count > 1 ? `${p.count} × ` : ""}
                                {PRODUCT.weight}
                              </p>
                            </div>
                            <p className="font-display font-bold whitespace-nowrap">{formatINR(p.price * l.qty)}</p>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <QtyStepper size="sm" value={l.qty} onChange={(v) => setQty(l.packId, v)} />
                            <button
                              type="button"
                              onClick={() => remove(l.packId)}
                              className="text-sm text-muted underline-offset-2 hover:text-charcoal hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}

                  {onlySingles && (
                    <li className="flex items-center gap-3 rounded-3xl bg-yellow-tint p-4 text-sm">
                      <Truck className="size-5 shrink-0" />
                      <span className="flex-1">
                        Get free delivery – switch to Pack of 3 ({formatINR(PACKS.pack3.price)}) or Pack of 5 (
                        {formatINR(PACKS.pack5.price)})
                      </span>
                      <button
                        type="button"
                        onClick={() => replace("single", "pack3")}
                        className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white"
                      >
                        Switch
                      </button>
                    </li>
                  )}
                </ul>

                <div className="border-t border-border px-6 pt-5 pb-6">
                  <dl className="space-y-2 text-[15px]">
                    <div className="flex justify-between">
                      <dt className="text-muted">Subtotal</dt>
                      <dd>{formatINR(totals.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted">Delivery</dt>
                      <dd>{totals.delivery === 0 ? "Free" : formatINR(totals.delivery)}</dd>
                    </div>
                    <div className="flex justify-between pt-2 text-lg font-bold">
                      <dt>Total</dt>
                      <dd className="font-display">{formatINR(totals.total)}</dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-xs text-muted">Inclusive of all taxes</p>
                  <Link href="/checkout" onClick={close} className="btn-dark mt-5 w-full">
                    Checkout – {formatINR(totals.total)}
                  </Link>
                  <button type="button" onClick={close} className="btn-outline mt-3 w-full">
                    Continue shopping
                  </button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
                    <Lock className="size-3.5" /> Secure payments – UPI, cards, netbanking
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
