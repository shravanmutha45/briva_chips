"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const STEPS = [
  {
    title: "Naturally ripe Kerala jackfruit",
    body: "We start with jackfruit that has ripened naturally.",
    img: "/images/step-1-jackfruit.jpg",
    alt: "Halved jackfruit beside a basket of bulbs",
  },
  {
    title: "Sliced",
    body: "The fruit is cut into thin, even pieces.",
    img: "/images/step-2-sliced.jpg",
    alt: "A hand holding fresh jackfruit bulbs",
  },
  {
    title: "Vacuum-fried",
    body: "Fried at a lower temperature to keep the real fruit taste.",
    img: "/images/step-3-fried.jpg",
    alt: "Golden jackfruit chips floating",
  },
  {
    title: "Carefully de-oiled",
    body: "So every chip is crunchy, not greasy.",
    img: "/images/step-4-deoiled.jpg",
    alt: "Two crunchy jackfruit chips with crumbs",
  },
  {
    title: "Packed for you",
    body: "Into the yellow BRIVA pouch, ready to snack.",
    img: "/images/step-5-pouch.jpg",
    alt: "Yellow Briva jackfruit chips pouch",
  },
];

/** S-curve through x=50 at the vertical centre of each row (viewBox 100 x 1000). */
function buildPath(n: number, bulge = 9) {
  const row = 1000 / n;
  let d = `M50,0 L50,${row / 2}`;
  for (let i = 0; i < n - 1; i++) {
    const y0 = row * (i + 0.5);
    const y1 = row * (i + 1.5);
    const dx = i % 2 === 0 ? bulge : -bulge;
    d += ` C${50 + dx},${y0 + row / 3} ${50 + dx},${y1 - row / 3} 50,${y1}`;
  }
  return d + ` L50,1000`;
}

const PATH = buildPath(STEPS.length);

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="how" className="container-x py-20 md:py-24">
      <div className="rounded-card bg-grey px-5 py-16 md:px-12 md:py-20">
        <div className="text-center">
          <span className="pill-label">How it&apos;s made</span>
          <h2 className="mt-5 text-[32px] leading-tight font-bold tracking-[-0.035em] md:text-[48px]">The process</h2>
        </div>

        <div ref={ref} className="relative mx-auto mt-14 max-w-[1000px] md:mt-16">
          {/* Desktop winding path */}
          <svg
            aria-hidden
            className="absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <mask id="process-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="1000">
                <motion.path
                  d={PATH}
                  stroke="white"
                  strokeWidth="24"
                  style={{ pathLength: reduce ? 1 : progress }}
                />
              </mask>
            </defs>
            <path
              d={PATH}
              stroke="#d9d9d9"
              strokeWidth="2"
              strokeDasharray="6 8"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={PATH}
              stroke="#1f1f1f"
              strokeWidth="2"
              strokeDasharray="6 8"
              vectorEffect="non-scaling-stroke"
              mask="url(#process-reveal)"
            />
          </svg>

          {/* Mobile straight line */}
          <div aria-hidden className="absolute top-0 bottom-0 left-[21px] border-l-2 border-dashed border-[#d9d9d9] md:hidden" />

          <ol className="relative">
            {STEPS.map((s, i) => {
              const textLeft = i % 2 === 0;
              return (
                <motion.li
                  key={s.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="grid grid-cols-[44px_1fr] gap-x-5 pb-12 last:pb-0 md:h-[300px] md:grid-cols-[1fr_88px_1fr] md:items-center md:gap-x-0 md:pb-0"
                >
                  <motion.div
                    variants={{ hidden: { scale: 0.6, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
                    transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                    className="row-span-2 grid size-11 place-items-center self-start rounded-full bg-yellow font-display text-lg font-bold shadow-low md:col-start-2 md:row-start-1 md:mx-auto md:self-center"
                  >
                    {i + 1}
                  </motion.div>

                  <motion.div
                    variants={{ hidden: { opacity: 0, x: textLeft ? -24 : 24 }, show: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`pt-1.5 md:row-start-1 md:pt-0 ${
                      textLeft ? "md:col-start-1 md:pr-8 md:text-right" : "md:col-start-3 md:pl-8"
                    }`}
                  >
                    <h3 className="text-xl font-semibold md:text-2xl">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] text-muted">{s.body}</p>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 30, rotate: textLeft ? 4 : -4 },
                      show: { opacity: 1, y: 0, rotate: 0 },
                    }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`col-start-2 mt-5 md:row-start-1 md:mt-0 ${
                      textLeft ? "md:col-start-3 md:pl-8" : "md:col-start-1 md:flex md:justify-end md:pr-8"
                    }`}
                  >
                    <Image
                      src={s.img}
                      alt={s.alt}
                      width={512}
                      height={512}
                      className="aspect-square w-full max-w-[240px] rounded-[28px] object-cover shadow-low"
                    />
                  </motion.div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
