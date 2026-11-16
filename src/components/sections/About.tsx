import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

// Copy TBC with the client – placeholder uses the brand line from Briva's current page.
export function About() {
  return (
    <section id="about" className="container-x py-20 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <span className="pill-label bg-grey">About us</span>
          <h2 className="mt-5 text-[32px] leading-tight font-bold tracking-[-0.035em] md:text-[48px]">
            Great snacks don&apos;t have to be ordinary.
          </h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-charcoal/80">
            BRIVA is a premium snacking brand built around one simple idea: great snacks don&apos;t have to be
            ordinary.
          </p>
          <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-charcoal/80">
            We take naturally ripe Kerala jackfruit, vacuum-fry it at a lower temperature and carefully de-oil
            it, so you get real fruit and real crunch, with nothing added.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-card bg-yellow p-8 md:p-12">
            <Image
              src="/images/step-1-jackfruit.jpg"
              alt="Naturally ripe Kerala jackfruit"
              width={512}
              height={512}
              className="mx-auto aspect-square w-full max-w-[360px] rounded-[24px] object-cover shadow-high"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
