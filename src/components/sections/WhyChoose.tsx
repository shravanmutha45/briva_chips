import { Droplet, Heart, Leaf } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  { icon: Leaf, title: "100% real fruit", body: "Made from naturally ripe Kerala jackfruit." },
  {
    icon: Droplet,
    title: "Less oil. More texture.",
    body: "Vacuum-fried at a lower temperature and carefully de-oiled.",
  },
  { icon: Heart, title: "Nothing added", body: "No added sugar, no preservatives, no added flavours." },
];

export function WhyChoose() {
  return (
    <section className="container-x py-12 md:py-16">
      <div className="relative overflow-hidden rounded-card bg-charcoal px-6 py-14 text-white md:px-14 md:py-20">
        <div aria-hidden className="absolute -top-24 -left-24 size-80 rounded-full bg-white/[0.04]" />
        <div aria-hidden className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-white/[0.04]" />
        <div aria-hidden className="absolute -right-24 -bottom-24 size-80 rounded-full bg-white/[0.04]" />
        <h2 className="relative text-center text-[32px] font-bold tracking-[-0.03em] md:text-[48px]">
          Why choose Briva?
        </h2>
        <div className="relative mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {ITEMS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1} className="text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-yellow text-charcoal">
                <Icon className="size-7" strokeWidth={2} />
              </span>
              <h3 className="mt-6 text-xl font-bold md:text-2xl">{title}</h3>
              <p className="mx-auto mt-3 max-w-[300px] text-[15px] leading-relaxed text-white/75">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
