/**
 * Single source of truth for prices and delivery.
 * The client uses this for display; the server recomputes every order with it.
 * All amounts are in whole rupees.
 */

export type PackId = "single" | "pack3" | "pack5";

export type Pack = {
  id: PackId;
  label: string;
  shortLabel: string;
  count: number;
  price: number;
  mrp?: number;
  freeDelivery: boolean;
  tag?: string;
};

export const PRODUCT = {
  name: "Vacuum fried jackfruit chips",
  weight: "50 g",
  image: "/images/product-main.jpg",
} as const;

export const PACKS: Record<PackId, Pack> = {
  single: {
    id: "single",
    label: "1 pack",
    shortLabel: "1 pack",
    count: 1,
    price: 150,
    mrp: 240,
    freeDelivery: false,
  },
  pack3: {
    id: "pack3",
    label: "Pack of 3",
    shortLabel: "Pack of 3",
    count: 3,
    price: 439,
    freeDelivery: true,
    tag: "Popular",
  },
  pack5: {
    id: "pack5",
    label: "Pack of 5",
    shortLabel: "Pack of 5",
    count: 5,
    price: 700,
    freeDelivery: true,
    tag: "Best value",
  },
};

export const PACK_LIST: Pack[] = [PACKS.single, PACKS.pack3, PACKS.pack5];

/** Charged once per order when the cart has only single packs. TBC with client for mixed carts. */
export const DELIVERY_FEE = 60;

export const MAX_QTY_PER_LINE = 20;

export type CartLine = { packId: PackId; qty: number };

export type Totals = {
  subtotal: number;
  delivery: number;
  total: number;
  itemCount: number;
};

export function isPackId(v: unknown): v is PackId {
  return v === "single" || v === "pack3" || v === "pack5";
}

export function computeTotals(lines: CartLine[]): Totals {
  const valid = lines.filter((l) => isPackId(l.packId) && l.qty > 0);
  const subtotal = valid.reduce((s, l) => s + PACKS[l.packId].price * l.qty, 0);
  const itemCount = valid.reduce((s, l) => s + l.qty, 0);
  const hasFreeDeliveryPack = valid.some((l) => PACKS[l.packId].freeDelivery);
  const delivery = valid.length === 0 || hasFreeDeliveryPack ? 0 : DELIVERY_FEE;
  return { subtotal, delivery, total: subtotal + delivery, itemCount };
}

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
