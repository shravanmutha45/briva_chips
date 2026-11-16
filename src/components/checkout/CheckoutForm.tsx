"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Building2, Check, ChevronDown, CreditCard, Loader2, Lock, QrCode, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { Customer, customerSchema, INDIAN_STATES } from "@/lib/checkout-schema";
import { formatINR, PACKS, PRODUCT } from "@/lib/pricing";

const SAVED_KEY = "briva-details-v1";

type Form = Record<keyof Customer, string>;
const EMPTY: Form = { name: "", phone: "", email: "", address1: "", address2: "", city: "", state: "", pincode: "" };

const METHODS = [
  { id: "upi", label: "UPI (GPay, PhonePe, Paytm)", icon: QrCode },
  { id: "card", label: "Credit / debit card", icon: CreditCard },
  { id: "netbanking", label: "Net banking", icon: Building2 },
] as const;
type Method = (typeof METHODS)[number]["id"];

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (e: string, cb: () => void) => void };
declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => RazorpayInstance;
  }
}

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export function CheckoutForm() {
  const router = useRouter();
  const { lines, totals, ready, setQty, clear } = useCart();
  const [form, setForm] = useState<Form>(EMPTY);
  const [save, setSave] = useState(true);
  const [method, setMethod] = useState<Method>("upi");
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "paying">("idle");
  const [formError, setFormError] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_KEY);
      if (saved) setForm({ ...EMPTY, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
  }, []);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let v = e.target.value;
    if (k === "phone") v = v.replace(/\D/g, "").slice(-10);
    if (k === "pincode") v = v.replace(/\D/g, "").slice(0, 6);
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const pinOk = /^[1-9]\d{5}$/.test(form.pincode);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const parsed = customerSchema.safeParse(form);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v?.[0]])));
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    try {
      if (save) localStorage.setItem(SAVED_KEY, JSON.stringify(form));
      else localStorage.removeItem(SAVED_KEY);
    } catch {
      /* ignore */
    }

    setStatus("submitting");
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer: parsed.data, items: lines }),
    }).catch(() => null);
    const data = await res?.json().catch(() => null);
    if (!res?.ok || !data) {
      setStatus("idle");
      setFormError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    if (data.testMode) {
      router.push(`/order/${data.orderId}`);
      clear();
      return;
    }

    setStatus("paying");
    if (!(await loadRazorpay()) || !window.Razorpay) {
      setStatus("idle");
      setFormError("Could not load the payment window. Check your connection and try again.");
      return;
    }
    const rzp = new window.Razorpay({
      key: data.razorpay.key,
      order_id: data.razorpay.orderId,
      amount: data.razorpay.amount,
      currency: data.razorpay.currency,
      name: "Briva",
      description: PRODUCT.name,
      prefill: { ...data.prefill, method },
      theme: { color: "#F6C31C" },
      handler: async (resp: RazorpayResponse) => {
        const v = await fetch(`/api/orders/${data.orderId}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resp),
        }).catch(() => null);
        router.push(`/order/${data.orderId}${v?.ok ? "" : "?verify=pending"}`);
        clear();
      },
      modal: { ondismiss: () => setStatus("idle") },
    });
    rzp.on("payment.failed", () => {
      setStatus("idle");
      setFormError("Payment failed. You have not been charged – please try again.");
    });
    rzp.open();
  }

  if (!ready) return <div className="h-96" />;

  if (lines.length === 0 && status !== "idle") {
    return (
      <div className="flex items-center justify-center gap-3 py-24 text-muted">
        <Loader2 className="size-5 animate-spin" /> Placing your order…
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-grey">
          <ShoppingBag className="size-7" />
        </span>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/#shop" className="btn-yellow">
          Shop the chips
        </Link>
      </div>
    );
  }

  const field = (
    k: keyof Form,
    label: string,
    { className, ...props }: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div className={className}>
      <label htmlFor={k} className="sr-only">
        {label}
      </label>
      <input
        id={k}
        name={k}
        placeholder={label}
        value={form[k]}
        onChange={set(k)}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `${k}-err` : undefined}
        className="input"
        {...props}
      />
      {errors[k] && (
        <p id={`${k}-err`} className="mt-1.5 pl-5 text-xs text-red-600">
          {errors[k]}
        </p>
      )}
    </div>
  );

  const busy = status !== "idle";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1fr_440px] lg:gap-12">
      <div>
        <h1 className="sr-only">Checkout</h1>
        <fieldset>
          <legend className="font-display text-xl font-semibold">Contact</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {field("name", "Full name", { autoComplete: "name", className: "sm:col-span-2" })}
            {field("phone", "Mobile number (+91)", { autoComplete: "tel-national", inputMode: "numeric", type: "tel" })}
            {field("email", "Email (optional)", { autoComplete: "email", type: "email" })}
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="font-display text-xl font-semibold">Delivery address</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {field("address1", "Address line 1", { autoComplete: "address-line1", className: "sm:col-span-2" })}
            {field("address2", "Address line 2", { autoComplete: "address-line2", className: "sm:col-span-2" })}
            {field("city", "City", { autoComplete: "address-level2" })}
            <div className="relative">
              <label htmlFor="state" className="sr-only">
                State
              </label>
              <select
                id="state"
                value={form.state}
                onChange={set("state")}
                aria-invalid={errors.state ? true : undefined}
                className={`input appearance-none pr-12 ${form.state ? "" : "text-muted"}`}
              >
                <option value="">State</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-4 right-5 size-4" />
              {errors.state && <p className="mt-1.5 pl-5 text-xs text-red-600">{errors.state}</p>}
            </div>
            <div className="relative sm:col-span-2">
              {field("pincode", "Pincode", { autoComplete: "postal-code", inputMode: "numeric" })}
              {pinOk && (
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-low">
                  Delivery available <Check className="size-3.5" />
                </span>
              )}
            </div>
          </div>
          <label className="mt-4 flex cursor-pointer items-center gap-3 text-[15px]">
            <input
              type="checkbox"
              checked={save}
              onChange={(e) => setSave(e.target.checked)}
              className="size-5 accent-charcoal"
            />
            Save details for next time
          </label>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="font-display text-xl font-semibold">Payment</legend>
          <div className="mt-4 space-y-3" role="radiogroup">
            {METHODS.map(({ id, label, icon: Icon }) => (
              <label
                key={id}
                className={`flex cursor-pointer items-center gap-4 rounded-3xl border-2 px-5 py-4 transition ${
                  method === id ? "border-charcoal bg-white" : "border-transparent bg-grey"
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value={id}
                  checked={method === id}
                  onChange={() => setMethod(id)}
                  className="size-5 accent-charcoal"
                />
                <span className="flex-1 font-medium">{label}</span>
                <Icon className="size-5 text-muted" />
              </label>
            ))}
          </div>
        </fieldset>

        {formError && (
          <p role="alert" className="mt-6 rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-700">
            {formError}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-dark mt-8 w-full py-4 text-base">
          {busy ? <Loader2 className="size-5 animate-spin" /> : null}
          {status === "paying" ? "Opening payment…" : `Pay ${formatINR(totals.total)} securely`}
        </button>
        <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted">
          <Lock className="size-3.5" /> Payments are 100% secure and encrypted
        </p>
      </div>

      {/* Summary */}
      <aside className="h-fit rounded-card bg-grey p-6 lg:sticky lg:top-6">
        <h2 className="font-display text-xl font-semibold">Order summary</h2>
        <ul className="mt-5 space-y-3">
          {lines.map((l) => {
            const p = PACKS[l.packId];
            return (
              <li key={l.packId} className="flex items-center gap-4 rounded-3xl bg-white p-3">
                <Image src={PRODUCT.image} alt="" width={64} height={64} className="size-16 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-medium">
                    {PRODUCT.name} – {p.label}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <QtyStepper size="sm" min={0} value={l.qty} onChange={(v) => setQty(l.packId, v)} />
                    <span className="font-display font-bold">{formatINR(p.price * l.qty)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 flex items-center gap-3 rounded-3xl bg-white px-4 py-3.5 text-sm">
          <span className="grid size-8 place-items-center rounded-full bg-yellow-tint">
            <Truck className="size-4" />
          </span>
          Free delivery on Pack of 3 and Pack of 5
        </div>

        <div className="mt-3">
          <div className="flex items-center rounded-full bg-white p-1.5 pl-5">
            <label htmlFor="coupon" className="sr-only">
              Coupon code
            </label>
            <input
              id="coupon"
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setCouponMsg("");
              }}
              placeholder="Coupon code"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setCouponMsg(coupon.trim() ? "This code isn't valid." : "")}
              className="rounded-full bg-charcoal px-5 py-2 text-sm font-semibold text-white"
            >
              Apply
            </button>
          </div>
          {couponMsg && <p className="mt-1.5 pl-5 text-xs text-red-600">{couponMsg}</p>}
        </div>

        <dl className="mt-6 space-y-2.5 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatINR(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Delivery</dt>
            <dd>{totals.delivery === 0 ? "Free" : formatINR(totals.delivery)}</dd>
          </div>
          <div className="flex items-end justify-between pt-3">
            <dt className="text-lg font-semibold">Total</dt>
            <dd className="text-right">
              <span className="font-display text-2xl font-bold">{formatINR(totals.total)}</span>
              <span className="block text-xs text-muted">Inclusive of all taxes</span>
            </dd>
          </div>
        </dl>
        <p className="mt-6 border-t border-border pt-4 text-center text-xs text-muted">
          Fast delivery across India · Easy returns
        </p>
      </aside>
    </form>
  );
}
