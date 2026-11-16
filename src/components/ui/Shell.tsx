import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const STEPS = ["Cart", "Details", "Payment"] as const;

/** Slim frame used by checkout and order pages. */
export function Shell({
  step,
  right,
  children,
}: {
  step?: (typeof STEPS)[number];
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="p-2.5 md:p-6">
      <div className="min-h-[calc(100vh-48px)] rounded-frame bg-white px-5 py-6 shadow-high md:px-12 md:py-10">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-6">
          <Logo />
          {step && (
            <ol className="hidden items-center gap-1 rounded-full bg-grey p-1 text-sm sm:flex" aria-label="Checkout steps">
              {STEPS.map((s) => (
                <li
                  key={s}
                  aria-current={s === step ? "step" : undefined}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 ${
                    s === step ? "bg-white font-semibold shadow-low" : "text-muted"
                  }`}
                >
                  {s === step && <span className="size-1.5 rounded-full bg-yellow" />}
                  {s}
                </li>
              ))}
            </ol>
          )}
          <div className="min-w-10">{right}</div>
        </header>
        <main className="pt-8 md:pt-10">{children}</main>
        <footer className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-2 border-t border-border pt-6 text-sm text-muted">
          <Link href="/privacy-policy" className="hover:text-charcoal">Privacy</Link>
          <Link href="/terms" className="hover:text-charcoal">Terms</Link>
          <Link href="/shipping-policy" className="hover:text-charcoal">Shipping policy</Link>
          <Link href="/contact" className="hover:text-charcoal">Contact</Link>
        </footer>
      </div>
    </div>
  );
}
