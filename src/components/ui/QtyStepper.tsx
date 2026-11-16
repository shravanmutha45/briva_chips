"use client";

import { Minus, Plus } from "lucide-react";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const btn = size === "sm" ? "size-8" : "size-11";
  return (
    <div className="inline-flex items-center rounded-full bg-grey p-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        className={`${btn} grid place-items-center rounded-full transition hover:bg-white disabled:opacity-40`}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-8 text-center text-[15px] font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={`${btn} grid place-items-center rounded-full transition hover:bg-white disabled:opacity-40`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
