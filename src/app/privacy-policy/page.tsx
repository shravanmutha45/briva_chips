import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/components/sections/Footer";
import { PolicyPage } from "@/components/ui/PolicyPage";

// TODO: final text from the client.
export const metadata: Metadata = { title: "Privacy policy – Briva" };

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy policy">
        <p>We only use your details to process and deliver your order. Our full privacy policy is being finalised.</p>
        <p>Questions? Write to <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-charcoal underline">{CONTACT_EMAIL}</a>.</p>
    </PolicyPage>
  );
}
