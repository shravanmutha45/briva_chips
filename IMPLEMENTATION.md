# Briva website – implementation spec

Source of truth for building the site from the approved Stitch designs in `designs/`.
Copy comes only from Briva's Instagram and current selling page; anything marked **TBC** must be confirmed by the client.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4, Framer Motion
- Fonts: Outfit (headlines), Plus Jakarta Sans (body) via `next/font/google`
- Razorpay Standard Checkout (test mode until KYC)
- Supabase Postgres (orders)
- Resend (order emails)
- Shiprocket API (pincode check, shipments) – phase 2
- Hosting: Vercel

## Design tokens

| Token | Value |
|---|---|
| `--yellow` | `#F6C31C` |
| `--white` | `#FFFFFF` |
| `--grey` (cards) | `#F5F5F5` |
| `--border` | `#EAEAEA` |
| `--charcoal` (text, dark buttons, dark band) | `#1F1F1F` |
| Radius – cards/panels | 32px |
| Radius – buttons, inputs, chips | 9999px (pill) |
| Shadow – low | `0 4px 20px rgba(31,31,31,.03), 0 1px 4px rgba(31,31,31,.02)` |
| Shadow – high (drawer) | `0 24px 60px rgba(31,31,31,.08), 0 8px 24px rgba(31,31,31,.04)` |
| Display headline | Outfit 600, 56px / 64px, -0.03em (mobile 36px) |
| Section heading | Outfit 600, 40px / 48px (mobile 28px) |
| Body | Plus Jakarta Sans 400, 16px / 26px |
| Max content width | 1280px; desktop margins 48px, mobile 20px |

Page frame: yellow outer background, content in one large white rounded card (36px radius).

## Screens and sections

Reference images in `designs/` (full-size `.png`, smaller `-preview.jpg`).

### Landing page `/`

1. **Nav** (`1-hero-v5.png`) – floating white pill: yellow "B" circle + "BRIVA"; links "Why Briva", "How it's made", "About us"; yellow pill "Order now" (scrolls to buy box). Cart icon with count appears once the cart has items.
2. **Hero** (`1-hero-v5.png`) – yellow panel, wave bottom edge, faint pale-yellow arcs.
   - Pill "Real Fruit. Elevated."
   - H1 "This is not a chip."
   - "We are anti-chips." / "Stop eating oil. Start eating better."
   - Charcoal pill "Buy now →" (scrolls to buy box)
   - Small text "No added sugar • No preservatives • Zero trans fat"
   - Right: transparent product cutout overlapping the wave (**real photo TBC**)
3. **Why choose Briva?** (`1-hero-v5.png`) – charcoal rounded band, three columns with yellow icon circles:
   - "100% real fruit" – "Made from naturally ripe Kerala jackfruit."
   - "Less oil. More texture." – "Vacuum-fried at a lower temperature and carefully de-oiled."
   - "Nothing added" – "No added sugar, no preservatives, no added flavours."
4. **Buy box** `#shop` (`2-buy-box.png`)
   - Pill "Shop", heading "Naturally sweet. Seriously crunchy. Completely different."
   - Gallery: main image + 3 thumbnails
   - "Vacuum fried jackfruit chips", "50 g · Vacuum fried"
   - ₹150, struck ₹240, "Inclusive of all taxes"
   - "Choose your pack" tiles (see **Pricing** below): "1 pack ₹150 + ₹60 delivery" / "Pack of 3 ₹439 Free delivery" (tag "Popular") / "Pack of 5 ₹700 Free delivery" (tag "Best value")
   - Quantity stepper, yellow "Add to cart", charcoal "Buy now"
   - Note "Free delivery on Pack of 3 and Pack of 5"
   - Pincode check pill
   - Trust row: "Fast delivery across India", "Secure payments – UPI, cards, netbanking", "Easy returns" (**TBC**)
5. **What's inside** `#why` (`3-whats-inside.png`) – pill "Why Briva", heading "What's inside every pack"; pouch centred with label lines to: "Naturally ripe Kerala jackfruit", "Vacuum-fried at a lower temperature", "Carefully de-oiled – not greasy", "No added sugar", "No preservatives or added flavours", "Zero trans fat"; yellow pill "Order now".
6. **How it's made (short)** (`3-whats-inside.png`) – yellow panel, "From ripe fruit to real crunch", 4-step timeline. **Overlaps with The process (section 7); likely drop it – confirm with client.** If kept, heading in charcoal, not white.
7. **The process** `#how` (`4-process.png`, replaces the old Reviews block) – light-grey section, pill "How it's made", heading "The process". A dashed line winds down in an S-curve (build as an SVG path; the Stitch mock shows it straight) linking 5 numbered yellow steps that alternate left/right, each with a floating cutout photo opposite:
   1. "Naturally ripe Kerala jackfruit" – "We start with jackfruit that has ripened naturally." (jackfruit + basket)
   2. "Sliced" – "The fruit is cut into thin, even pieces." (hand with bulbs)
   3. "Vacuum-fried" – "Fried at a lower temperature to keep the real fruit taste." (floating chips)
   4. "Carefully de-oiled" – "So every chip is crunchy, not greasy." (two chips + crumbs)
   5. "Packed for you" – "Into the yellow BRIVA pouch, ready to snack." (pouch)
   Animate: draw the path and fade steps in on scroll. **Step copy to be confirmed by client; photos TBC.**
8. **About us** `#about` – **new, copy TBC**. Placeholder: "BRIVA is a premium snacking brand built around one simple idea: great snacks don't have to be ordinary."
9. **FAQ** (`5-faq-footer.png`) – accordion "Questions, answered":
   - "Is it deep fried?" – "No. It's vacuum-fried at a lower temperature and carefully de-oiled."
   - "Does it have added sugar?", "Are there preservatives or added flavours?", "Where do you deliver?" (**answers TBC**)
   - "How much is delivery?" – "₹60 on a single pack. Free on Pack of 3 and Pack of 5."
10. **Final CTA** (`5-faq-footer.png`) – charcoal panel, "One bite is all it takes." / "Discover jackfruit like never before." + yellow "Order now →".
11. **Footer** (`5-faq-footer.png`) – wordmark, "REAL FRUIT. ELEVATED.", brand line; Shop: The chips, About us; Help: Shipping policy, Return & refund policy, Contact; Legal: Privacy policy, Terms; brivajackfruitchips@gmail.com, Instagram, "© Briva. All rights reserved." Phone/WhatsApp and FSSAI no. **TBC**.

Reviews section removed for now (can return once there are real reviews).

## Pricing (confirmed by client)

| Pack | Price | Delivery | Customer pays |
|---|---|---|---|
| 1 pack (50 g) | ₹150 | ₹60 | ₹210 |
| Pack of 3 | ₹439 | Free | ₹439 |
| Pack of 5 | ₹700 | Free | ₹700 |

- Struck MRP ₹240 shown on the single pack only.
- Delivery rule: ₹60 if the cart contains **only single packs**; free if it contains any Pack of 3 or Pack of 5. (**Confirm with client:** what if someone adds 3 single packs, or 2 single packs + a Pack of 3? Suggested: ₹60 once per order, waived if any multi-pack is in the cart.)
- Keep prices and the delivery rule in one config file, recomputed on the server.

### Cart drawer (`6-cart-drawer.png`)

Right-side drawer over dimmed page: "Your cart (n)"; line item (thumb, name, "1 pack · 50 g", stepper, price, Remove); upsell tip "Get free delivery – switch to Pack of 3 (₹439) or Pack of 5 (₹700)" + "Switch" (only when the cart has only single packs); Subtotal, Delivery, Total, "Inclusive of all taxes"; charcoal "Checkout – ₹X", outlined "Continue shopping", "Secure payments – UPI, cards, netbanking". Persist cart in localStorage.

### Checkout `/checkout` (`7-checkout.png`)

- Header: logo, steps "Cart · Details · Payment", cart pill
- Contact: Full name, Mobile (+91, 10 digits), Email (optional)
- Address: line 1, line 2, City, State (dropdown), Pincode (6 digits, live serviceability hint), "Save details for next time"
- Payment: Razorpay handles method choice (UPI / card / netbanking)
- Summary card: items, tip "Free delivery on Pack of 3 and Pack of 5", coupon, Subtotal, Delivery, Total
- CTA "Pay ₹X securely", "Payments are 100% secure and encrypted"
- The Stitch mock shows "560001" in the pincode field; build it as an empty field.

### Order confirmed `/order/[id]` (`8-order-confirmed.png`)

Yellow check circle, "Thank you! Your order is placed.", order number, summary card (items, Delivery, Total, paid via), delivery card with status steps (Order placed → Packed → Shipped → Delivered), "Continue shopping", "Questions? Write to brivajackfruitchips@gmail.com".

### Policy pages

`/shipping-policy`, `/refund-policy`, `/privacy-policy`, `/terms`, `/contact` – required for Razorpay activation (**text TBC**).

### Admin `/admin` (phase 2)

Password-protected order list, status updates, CSV export, price/shipping settings.

## Backend flow

1. `POST /api/orders` – validate cart + address (zod), **recompute prices server-side**, create Razorpay order, insert `orders` row with status `pending`.
2. Client opens Razorpay Checkout.
3. `POST /api/razorpay/webhook` – verify signature, mark order `paid`, send emails.
4. Redirect to `/order/[id]`.

### `orders` table (Supabase)

`id`, `order_number`, `created_at`, `status` (pending/paid/packed/shipped/delivered/cancelled), `name`, `phone`, `email`, `address_line1`, `address_line2`, `city`, `state`, `pincode`, `items` (jsonb), `subtotal`, `shipping`, `discount`, `total`, `razorpay_order_id`, `razorpay_payment_id`, `tracking_url`.

## Environment variables (`.env.local`, never committed)

```
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
ORDER_ALERT_EMAIL=
```

## Build order

1. Scaffold, tokens, fonts, page frame
2. Landing sections 1–11 (static, responsive)
3. Cart state + drawer
4. Checkout form + validation
5. Razorpay test-mode payment + order API + Supabase
6. Confirmation page + emails
7. Policy pages, SEO (metadata, OG image, product schema), analytics
8. Admin, Shiprocket (phase 2)

## Still needed from the client

- Real product photos (transparent background), correct 50 g pack
- Delivery rule for mixed carts (see Pricing)
- Whether to keep the short "How it's made" panel now that The process exists
- Return/refund policy, FAQ answers, About us text, process step wording
- Phone/WhatsApp, FSSAI licence, GSTIN (if any)
- Razorpay KYC documents, domain name

## Build status (2026-11-16)

Done: landing page (all sections except the short "How it's made" panel, dropped as it repeats The process), cart drawer, `/checkout`, `POST /api/orders` (server-side pricing), Razorpay verify + webhook routes, `/order/[id]`, placeholder policy pages.

Run locally: `npm install`, `npm run dev`. With no Razorpay keys in `.env.local`, checkout runs in **test mode**: orders are accepted without payment and marked "Test order".

Still to do:
- Replace the in-memory order store (`src/lib/orders.ts`) with Supabase – orders currently vanish on restart.
- Razorpay test keys, then Resend emails, `metadataBase` + real domain.
- Real photos (current ones are AI placeholders), client copy for About us, FAQ answers, policies.
- Pincode check is a format check only until Shiprocket is wired in.
