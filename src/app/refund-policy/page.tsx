import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/components/sections/Footer";
import { PolicyPage } from "@/components/ui/PolicyPage";

// TODO: final text from the client.
export const metadata: Metadata = { title: "Return & refund policy – Briva" };

export default function RefundPolicyPage() {
  return (
    <PolicyPage title="Return &amp; refund policy">
        <p>Our return and refund policy is being finalised.</p>
        <p>Questions? Write to <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-charcoal underline">{CONTACT_EMAIL}</a>.</p>
    </PolicyPage>
  );
}
