import "server-only";
import { randomUUID } from "crypto";
import type { Customer } from "@/lib/checkout-schema";
import { CartLine, computeTotals, PACKS, PackId } from "@/lib/pricing";

export type OrderStatus = "pending" | "paid" | "packed" | "shipped" | "delivered" | "cancelled";

export type OrderItem = { packId: PackId; label: string; qty: number; unitPrice: number; lineTotal: number };

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  paymentMode: "razorpay" | "test";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
};

/** What the confirmation page is allowed to see. */
export type PublicOrder = Pick<
  Order,
  "id" | "orderNumber" | "createdAt" | "status" | "items" | "subtotal" | "delivery" | "total" | "paymentMode"
> & { city: string; pincode: string; firstName: string };

/**
 * TEMPORARY in-memory store so the flow works end to end locally.
 * Replace with Supabase (`orders` table in IMPLEMENTATION.md) before launch:
 * this resets on every server restart and is not shared between serverless instances.
 */
const g = globalThis as unknown as { __brivaOrders?: Map<string, Order>; __brivaSeq?: number };
const store = (g.__brivaOrders ??= new Map<string, Order>());

function nextOrderNumber() {
  g.__brivaSeq = (g.__brivaSeq ?? 0) + 1;
  return `BRV-${String(g.__brivaSeq).padStart(4, "0")}`;
}

/** Prices always come from the server-side config, never from the client. */
export function priceItems(lines: CartLine[]) {
  const merged = new Map<PackId, number>();
  for (const l of lines) merged.set(l.packId, (merged.get(l.packId) ?? 0) + l.qty);
  const normalised = [...merged].map(([packId, qty]) => ({ packId, qty }));
  const items: OrderItem[] = normalised.map(({ packId, qty }) => ({
    packId,
    label: PACKS[packId].label,
    qty,
    unitPrice: PACKS[packId].price,
    lineTotal: PACKS[packId].price * qty,
  }));
  return { items, ...computeTotals(normalised) };
}

export async function createOrder(input: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">) {
  const order: Order = {
    ...input,
    id: randomUUID(),
    orderNumber: nextOrderNumber(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  store.set(order.id, order);
  return order;
}

export async function getOrder(id: string) {
  return store.get(id) ?? null;
}

export async function findByRazorpayOrderId(razorpayOrderId: string) {
  for (const o of store.values()) if (o.razorpayOrderId === razorpayOrderId) return o;
  return null;
}

export async function updateOrder(id: string, patch: Partial<Order>) {
  const existing = store.get(id);
  if (!existing) return null;
  const next = { ...existing, ...patch };
  store.set(id, next);
  return next;
}

export function toPublic(o: Order): PublicOrder {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    createdAt: o.createdAt,
    status: o.status,
    items: o.items,
    subtotal: o.subtotal,
    delivery: o.delivery,
    total: o.total,
    paymentMode: o.paymentMode,
    city: o.customer.city,
    pincode: o.customer.pincode,
    firstName: o.customer.name.split(" ")[0],
  };
}
