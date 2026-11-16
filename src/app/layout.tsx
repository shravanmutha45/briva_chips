import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Briva – Vacuum fried jackfruit chips",
  description:
    "This is not a chip. Naturally ripe Kerala jackfruit, vacuum-fried at a lower temperature and carefully de-oiled. No added sugar, no preservatives.",
  openGraph: {
    title: "Briva – Vacuum fried jackfruit chips",
    description: "We are anti-chips. Stop eating oil. Start eating better.",
    images: ["/images/hero-pouch.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
