import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Briva home">
      <span className="grid size-9 place-items-center rounded-full bg-yellow font-display text-lg font-bold text-charcoal">
        B
      </span>
      <span
        className={`font-display text-xl font-bold tracking-[0.08em] ${dark ? "text-white" : "text-charcoal"}`}
      >
        BRIVA
      </span>
    </Link>
  );
}
