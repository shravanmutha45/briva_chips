import Link from "next/link";
import { Camera, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const CONTACT_EMAIL = "brivajackfruitchips@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/briva.jackfruit.chips/";

const COLS = [
  {
    title: "Shop",
    links: [
      { href: "/#shop", label: "The chips" },
      { href: "/#about", label: "About us" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/shipping-policy", label: "Shipping policy" },
      { href: "/refund-policy", label: "Return & refund policy" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-6 text-xs font-semibold tracking-[0.12em] text-yellow">REAL FRUIT. ELEVATED.</p>
            <p className="mt-4 max-w-[380px] text-sm leading-relaxed text-white/70">
              BRIVA is a premium snacking brand built around one simple idea: great snacks don&apos;t have to be
              ordinary.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-4" /> {CONTACT_EMAIL}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
              <Camera className="size-4" /> Instagram
            </a>
          </div>
          <p>© Briva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
