import Link from "next/link";
import { Shell } from "@/components/ui/Shell";

/** Placeholder layout for policy pages. Final text must come from the client (needed for Razorpay activation). */
export function PolicyPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Shell>
      <article className="mx-auto max-w-[720px]">
        <Link href="/" className="text-sm text-muted hover:text-charcoal">
          ← Back to Briva
        </Link>
        <h1 className="mt-4 text-[32px] font-bold tracking-[-0.03em] md:text-[44px]">{title}</h1>
        <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-charcoal/80">{children}</div>
      </article>
    </Shell>
  );
}
