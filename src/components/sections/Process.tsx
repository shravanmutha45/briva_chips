import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="how" className="container-x py-20 md:py-24">
      <div className="rounded-card bg-grey px-5 py-16 md:px-12 md:py-20">
        <div className="text-center">
          <span className="pill-label bg-white shadow-xs">How it&apos;s made</span>
          <h2 className="mt-5 text-[32px] leading-tight font-bold tracking-[-0.035em] md:text-[48px]">
            The process
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-base text-muted md:text-lg">
            From naturally ripe Kerala fruit to the crunch in your pouch.
          </p>
        </div>

        <Reveal className="mx-auto mt-10 max-w-[720px] md:mt-14">
          <div className="overflow-hidden rounded-[28px] bg-white p-4 shadow-high sm:p-8 md:p-10">
            <Image
              src="/images/process.jpg"
              alt="5-step process: Collected from farms, picking the best ones, cut for crunch, vacuum fried and de-oiled, sealed fresh"
              width={682}
              height={952}
              className="h-auto w-full object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
