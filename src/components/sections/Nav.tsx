"use client";

import { ShoppingBag } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/components/cart/CartProvider";

const LINKS = [
  { href: "#why", label: "Why Briva" },
  { href: "#how", label: "How it's made" },
  { href: "#about", label: "About us" },
];

export function Nav() {
  const { totals, open, ready } = useCart();
  const count = ready ? totals.itemCount : 0;

  return (
    <header className="sticky top-3 z-40 px-3 md:top-4 md:px-6">
      <nav className="mx-auto flex max-w-[1232px] items-center justify-between rounded-full border border-border bg-white/90 py-2.5 pr-2.5 pl-5 shadow-low backdrop-blur md:py-3 md:pr-3 md:pl-7">
        <Logo />
        <ul className="hidden items-center gap-10 text-[15px] text-charcoal/80 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-charcoal">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {count > 0 && (
            <button
              type="button"
              onClick={open}
              className="relative grid size-11 place-items-center rounded-full bg-grey transition hover:bg-border"
              aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            >
              <ShoppingBag className="size-5" />
              <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-charcoal text-[11px] font-bold text-white">
                {count}
              </span>
            </button>
          )}
          <a href="#shop" className="btn-yellow px-5 py-2.5 md:px-7 md:py-3">
            Order now
          </a>
        </div>
      </nav>
    </header>
  );
}
