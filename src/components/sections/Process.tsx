import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="how" className="container-x py-20 md:py-24">
      <div className="rounded-card bg-grey px-5 py-16 md:px-12 md:py-20">
        <div className="text-center">
          <span className="pill-label">How it&apos;s made</span>
          <h2 className="mt-5 text-[32px] leading-tight font-bold tracking-[-0.035em] md:text-[48px]">
            The process
          </h2>
        </div>

        <Reveal className="mx-auto mt-12 max-w-[760px]">
          <div className="overflow-hidden rounded-[28px] bg-white p-4 shadow-high sm:p-8 md:p-10">
            <Image
              src="/images/process.jpg"
              alt="The Process - Briva jackfruit chips from farm to pack"
              width={682}
              height={1024}
              className="h-auto w-full object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
