"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

// Answers marked TBC need confirmation from the client before launch.
const FAQS = [
  { q: "Is it deep fried?", a: "No. It's vacuum-fried at a lower temperature and carefully de-oiled." },
  { q: "Does it have added sugar?", a: "No. The sweetness comes from naturally ripe jackfruit." },
  { q: "Are there preservatives or added flavours?", a: "No preservatives and no added flavours." },
  { q: "Where do you deliver?", a: "We deliver across India." },
  { q: "How much is delivery?", a: "₹60 on a single pack. Free on Pack of 3 and Pack of 5." },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="container-x py-20 md:py-24">
      <h2 className="text-center text-[32px] leading-tight font-bold tracking-[-0.035em] md:text-[44px]">
        Questions, answered
      </h2>
      <div className="mx-auto mt-12 max-w-[780px] divide-y divide-border">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          const id = `faq-${i}`;
          return (
            <div key={f.q} className="py-1">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium"
                >
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-grey">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[15px] text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
