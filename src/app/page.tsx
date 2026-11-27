import { CartDrawer } from "@/components/cart/CartDrawer";
import { About } from "@/components/sections/About";
import { BuyBox } from "@/components/sections/BuyBox";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Process } from "@/components/sections/Process";
import { WhatsInside } from "@/components/sections/WhatsInside";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { PACKS, PRODUCT } from "@/lib/pricing";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `Briva ${PRODUCT.name}`,
  brand: { "@type": "Brand", name: "Briva" },
  description:
    "Naturally ripe Kerala jackfruit, vacuum-fried at a lower temperature and carefully de-oiled. No added sugar, no preservatives.",
  image: PRODUCT.image,
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: PACKS.single.price,
    availability: "https://schema.org/InStock",
  },
};

export default function Home() {
  return (
    <div className="p-2.5 md:p-6">
      <div className="overflow-clip rounded-frame bg-white pt-3 shadow-high md:pt-6">
        <Nav />
        <main>
          <Hero />
          <BuyBox />
          <WhatsInside />
          <Process />
          <WhyChoose />
          <About />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
      <CartDrawer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </div>
  );
}
