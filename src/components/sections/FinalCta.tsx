import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="container-x pt-4 pb-20 md:pb-24">
      <div className="grid items-center gap-10 overflow-hidden rounded-card bg-charcoal p-8 text-white md:grid-cols-2 md:p-16">
        <div>
          <h2 className="text-[32px] leading-tight font-bold tracking-[-0.035em] md:text-[44px]">
            One bite is all it takes.
          </h2>
          <p className="mt-4 text-white/75">Discover jackfruit like never before.</p>
          <a href="#shop" className="btn-yellow mt-8">
            Order now <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="rounded-[28px] bg-yellow p-6 md:p-10">
          <Image
            src="/images/product-main.jpg"
            alt="Briva jackfruit chips pouch and bowl"
            width={512}
            height={512}
            className="mx-auto aspect-[4/3] w-full rounded-2xl object-cover shadow-high"
          />
        </div>
      </div>
    </section>
  );
}
