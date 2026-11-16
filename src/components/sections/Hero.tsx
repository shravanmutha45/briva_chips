import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="container-x pt-5 md:pt-6">
      <div className="relative overflow-hidden rounded-t-[32px] bg-yellow">
        {/* faint concentric arcs */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -top-48 -right-40 size-[900px] text-white/[0.12]"
          viewBox="0 0 900 900"
          fill="none"
        >
          {[140, 230, 320, 410].map((r) => (
            <circle key={r} cx="450" cy="450" r={r} stroke="currentColor" strokeWidth="44" />
          ))}
        </svg>

        <div className="relative grid items-center gap-10 px-6 pt-12 pb-24 md:grid-cols-[1.5fr_1fr] md:px-14 md:pt-16 md:pb-28">
          <div>
            <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-[13px] font-medium tracking-wide">
              Real Fruit. Elevated.
            </span>
            <h1 className="mt-6 text-[46px] leading-[1.02] font-bold tracking-[-0.045em] md:text-[56px] lg:text-[68px] lg:whitespace-nowrap">
              This is not a chip.
            </h1>
            <p className="mt-6 font-display text-xl leading-snug font-semibold md:text-[22px]">
              We are anti-chips.
              <br />
              Stop eating oil. Start eating better.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a href="#shop" className="btn-dark px-8 py-4 text-base">
                Buy now <ArrowRight className="size-4" />
              </a>
              <p className="text-sm text-charcoal/85">No added sugar • No preservatives • Zero trans fat</p>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[400px]">
            <div className="overflow-hidden rounded-[28px] bg-white shadow-high">
              <Image
                src="/images/hero-pouch.jpg"
                alt="Briva vacuum fried jackfruit chips pouch beside a bowl of chips"
                width={512}
                height={512}
                priority
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* wave edge */}
        <svg
          aria-hidden
          className="absolute bottom-0 left-0 h-14 w-full md:h-20"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C380,48 950,56 1440,12 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
