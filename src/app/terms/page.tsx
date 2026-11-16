import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/components/sections/Footer";
import { PolicyPage } from "@/components/ui/PolicyPage";

// TODO: final text from the client.
export const metadata: Metadata = { title: "Terms – Briva" };

export default function TermsPage() {
  return (
    <PolicyPage title="Terms">
        <p>Our terms of sale are being finalised.</p>
        <p>Questions? Write to <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-charcoal underline">{CONTACT_EMAIL}</a>.</p>
    </PolicyPage>
  );
}
