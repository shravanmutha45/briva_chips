import type { Metadata } from "next";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/components/sections/Footer";
import { PolicyPage } from "@/components/ui/PolicyPage";

// TODO: final text from the client.
export const metadata: Metadata = { title: "Contact – Briva" };

export default function ContactPage() {
  return (
    <PolicyPage title="Contact">
        <p>Write to us at{" "}<a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-charcoal underline">{CONTACT_EMAIL}</a> or message us on{" "}<a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="font-medium text-charcoal underline">Instagram</a>.</p>
    </PolicyPage>
  );
}
