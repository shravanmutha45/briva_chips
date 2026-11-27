import Image from "next/image";
import { Ban, Droplets, Heart, ShieldCheck, Sparkles, Sun } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const LEFT = [
  { icon: Sun, label: "Naturally ripe Kerala jackfruit" },
  { icon: Droplets, label: "Vacuum-fried at a lower temperature" },
  { icon: Sparkles, label: "Carefully de-oiled – not greasy" },
];
const RIGHT = [
  { icon: Ban, label: "No added sugar" },
  { icon: ShieldCheck, label: "No preservatives or added flavours" },
  { icon: Heart, label: "Zero trans fat" },
];

function Feature({
  icon: Icon,
  label,
  side,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  side: "left" | "right";
}) {
  return (
    <li
      className={`flex items-center gap-3 md:gap-4 ${side === "left" ? "md:flex-row-reverse md:text-right" : ""}`}
    >
      <span aria-hidden className="hidden h-px w-8 bg-border md:block" />
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-grey">
        <Icon className="size-[18px]" />
      </span>
      <span className="font-display text-[17px] leading-snug font-semibold md:max-w-[220px]">{label}</span>
    </li>
  );
}

export function WhatsInside() {
  return (
    <section id="why" className="container-x py-20 md:py-24">
      <div className="text-center">
        <span className="pill-label bg-grey">Why Briva</span>
        <h2 className="mt-5 text-[32px] leading-tight font-bold tracking-[-0.035em] md:text-[48px]">
          What&apos;s inside every pack
        </h2>
      </div>

      <div className="mt-14 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <ul className="order-2 space-y-6 md:order-1 md:space-y-14">
          {LEFT.map((f) => (
            <Feature key={f.label} {...f} side="left" />
          ))}
        </ul>
        <Reveal className="order-1 mx-auto w-full max-w-[360px] md:order-2">
          <div className="overflow-hidden rounded-[28px] bg-white shadow-high">
            <Image
              src="/images/whats-inside.jpg"
              alt="What's inside every pack of Briva jackfruit chips"
              width={794}
              height={1024}
              className="h-auto w-full object-contain"
            />
          </div>
        </Reveal>
        <ul className="order-3 space-y-6 md:space-y-14">
          {RIGHT.map((f) => (
            <Feature key={f.label} {...f} side="right" />
          ))}
        </ul>
      </div>

      <div className="mt-14 text-center">
        <a href="#shop" className="btn-yellow px-8">
          Order now
        </a>
      </div>
    </section>
  );
}
