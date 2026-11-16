"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Lock, RefreshCw, Truck, Zap } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { formatINR, PACK_LIST, PackId, PACKS, PRODUCT } from "@/lib/pricing";

const GALLERY = [
  { src: "/images/product-main.jpg", alt: "Briva pouch with a bowl of jackfruit chips" },
  { src: "/images/step-4-deoiled.jpg", alt: "Two crunchy jackfruit chips up close" },
  { src: "/images/step-1-jackfruit.jpg", alt: "Ripe Kerala jackfruit with a basket of bulbs" },
];

export function BuyBox() {
  const router = useRouter();
  const { add, open } = useCart();
  const [active, setActive] = useState(0);
  const [packId, setPackId] = useState<PackId>("single");
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pinStatus, setPinStatus] = useState<"idle" | "ok" | "bad">("idle");

  const pack = PACKS[packId];

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder until Shiprocket serviceability is wired in (phase 2).
    setPinStatus(/^[1-9][0-9]{5}$/.test(pincode) ? "ok" : "bad");
  };

  return (
    <section id="shop" className="container-x py-20 md:py-28">
      <div className="text-center">
        <span className="pill-label bg-grey">Shop</span>
        <h2 className="mx-auto mt-5 max-w-[860px] text-[32px] leading-[1.08] font-bold tracking-[-0.035em] md:text-[52px]">
          Naturally sweet. Seriously crunchy. Completely different.
        </h2>
      </div>

      <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-14">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-card bg-grey p-6 md:p-8">
            <Image
              key={GALLERY[active].src}
              src={GALLERY[active].src}
              alt={GALLERY[active].alt}
              width={512}
              height={512}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {GALLERY.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={active === i}
                className={`overflow-hidden rounded-2xl border-2 bg-grey p-2 transition ${
                  active === i ? "border-yellow" : "border-transparent hover:border-border"
                }`}
              >
                <Image src={g.src} alt="" width={160} height={160} className="aspect-square w-full rounded-xl object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h3 className="text-[30px] leading-tight font-bold tracking-[-0.03em] md:text-[38px]">{PRODUCT.name}</h3>
          <p className="mt-1 text-muted">{PRODUCT.weight} · Vacuum fried</p>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-[44px] leading-none font-bold">{formatINR(pack.price)}</span>
            {pack.mrp && <span className="pb-1 text-2xl text-muted line-through">{formatINR(pack.mrp)}</span>}
          </div>
          <p className="mt-2 text-xs text-muted">Inclusive of all taxes</p>

          <hr className="my-7 border-border" />

          <p className="text-[15px] font-medium">Choose your pack</p>
          <div className="mt-4 grid grid-cols-3 gap-3" role="radiogroup" aria-label="Choose your pack">
            {PACK_LIST.map((p) => {
              const selected = p.id === packId;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setPackId(p.id)}
                  className={`relative rounded-2xl border-2 bg-white p-3 text-left transition md:p-4 ${
                    selected ? "border-yellow shadow-low" : "border-border hover:border-charcoal/30"
                  }`}
                >
                  {p.tag && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-charcoal px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                      {p.tag}
                    </span>
                  )}
                  <span className="block text-sm">{p.label}</span>
                  <span className="mt-1 block font-display text-xl font-bold md:text-2xl">{formatINR(p.price)}</span>
                  {p.freeDelivery ? (
                    <span className="mt-3 inline-block rounded-full bg-yellow px-2 py-0.5 text-[11px] font-semibold">
                      Free delivery
                    </span>
                  ) : (
                    <span className="mt-3 block text-[11px] text-muted">+ ₹60 delivery</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={setQty} />
            <button
              type="button"
              className="btn-yellow flex-1"
              onClick={() => {
                add(packId, qty);
                open();
              }}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="btn-dark flex-1"
              onClick={() => {
                add(packId, qty);
                router.push("/checkout");
              }}
            >
              Buy now
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-full bg-grey px-5 py-3 text-sm">
            <Truck className="size-4 shrink-0" />
            Free delivery on Pack of 3 and Pack of 5
          </div>

          <form onSubmit={checkPincode} className="mt-3 flex items-center rounded-full bg-grey p-1.5 pl-5">
            <label htmlFor="pincode" className="sr-only">
              Pincode
            </label>
            <input
              id="pincode"
              inputMode="numeric"
              maxLength={6}
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value.replace(/\D/g, ""));
                setPinStatus("idle");
              }}
              placeholder="Check delivery to your pincode"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <button type="submit" className="rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-low">
              Check
            </button>
          </form>
          {pinStatus === "ok" && (
            <p className="mt-2 flex items-center gap-1.5 pl-5 text-sm text-green-700">
              <Check className="size-4" /> Delivery available
            </p>
          )}
          {pinStatus === "bad" && <p className="mt-2 pl-5 text-sm text-red-600">Enter a valid 6-digit pincode.</p>}

          <hr className="my-7 border-border" />

          <ul className="grid grid-cols-3 gap-4 text-xs leading-snug text-charcoal/80">
            <li className="flex items-start gap-2">
              <Zap className="size-4 shrink-0" /> Fast delivery across India
            </li>
            <li className="flex items-start gap-2">
              <Lock className="size-4 shrink-0" /> Secure payments – UPI, cards, netbanking
            </li>
            <li className="flex items-start gap-2">
              <RefreshCw className="size-4 shrink-0" /> Easy returns
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
