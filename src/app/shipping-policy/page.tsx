import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/components/sections/Footer";
import { PolicyPage } from "@/components/ui/PolicyPage";

// TODO: final text from the client.
export const metadata: Metadata = { title: "Shipping policy – Briva" };

export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping policy">
        <p>Delivery is ₹60 on a single pack and free on Pack of 3 and Pack of 5. Delivery timelines and serviceable areas are being finalised.</p>
        <p>Questions? Write to <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-charcoal underline">{CONTACT_EMAIL}</a>.</p>
    </PolicyPage>
  );
}
