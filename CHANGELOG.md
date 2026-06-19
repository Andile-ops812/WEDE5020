# Changelog — Mercedes-Benz South Africa Website

## [Part 3] — 2026-06-19

### JavaScript — js_assets/main.js (new file)

- **Created** `js_assets/main.js` as the single site-wide JavaScript file
- **Hamburger menu toggle** — clicking `.nav-toggle` shows/hides the `.navigation` list on mobile; `aria-expanded` updates for screen readers; menu closes automatically when a link is tapped
- **Scroll-triggered animations** — `IntersectionObserver` adds `.visible` to `.animate-on-scroll` elements as they enter the viewport; graceful fallback for older browsers; respects `prefers-reduced-motion`
- **Products accordion** — `.accordion-trigger` buttons open/close their linked `.accordion-panel` using `aria-expanded` and the `hidden` attribute
- **Products search/filter** — live `input` event listener filters `.accordion-item` elements in real time against visible text and `data-keywords`; auto-opens matching panels; shows live result count in `#searchCount`
- **Enquiry form validation** — `handleEnquirySubmit()` validates Name, Email (regex), Subject dropdown, and Message; highlights invalid fields with `.input-error`; on success hides the form and displays a dynamic response table with estimated price, availability, and follow-up information based on the selected tier
- **Contact form validation** — `handleContactSubmit()` validates Name, Email (regex), Message Type dropdown, and Message; compiles all fields into a pre-filled `mailto:` link; shows a confirmation card after submission
- **Retained** `js_assets/validation.js` from Part 2 for reference

### HTML — all five pages

- **Added** `<button class="nav-toggle">` hamburger button inside `<nav>` on all five pages
- **Added** `<script src="js_assets/main.js"></script>` before `</body>` on all five pages
- **Added** `<meta name="author" content="Andile Ndlovu">` to all five pages
- **Added** Open Graph meta tags (`og:title`, `og:description`, `og:type`, `og:image`) to all five pages
- **Added** `<link rel="preload" as="image">` for the hero banner on `index.html`
- **Added** `loading="lazy"` to the team photo on `about_us.html` and all product images on `products.html`
- **Added** `class="animate-on-scroll"` to key sections on `index.html`, `about_us.html`, and `products.html`

### products.html

- **Replaced** static model lists and images with a four-card accordion (G63 AMG, C63 AMG, C200 AMG, GLS 600 Maybach)
- **Each accordion card** contains: model image with `loading="lazy"`, spec list (year range, price, engine, availability), description paragraph, and "Enquire About This Model" CTA link to `enquires.html`
- **Added** `data-keywords` attributes to each `.accordion-item` for richer search matching (e.g. "electric", "suv", "touring")
- **Added** live search/filter input (`#productSearch`) above the accordion
- **Retained** the brand tiers table and operating hours (moved into a `.hours-box`)

### enquires.html

- **Updated** form `onsubmit` from `return false` to `return handleEnquirySubmit(event)` to call the Part 3 validation function
- **Updated** script reference from `validation.js` to `main.js`
- **Fixed** page comment to reflect that the Google Form iframe was already replaced in an earlier revision

### contact.html

- **Added** `Message Type` dropdown (`#contactMessageType`) with six options — fulfils the Part 3 brief requirement to collect "name, email, message type and full message"
- **Added** `<span class="error-msg">` under each field for inline validation feedback
- **Updated** form `onsubmit` to call `handleContactSubmit(event)`
- **Added** `#contactResponse` confirmation card

### CSS — css_assets/mystyles.css

- **Added** hamburger button styles (`.nav-toggle`, `.nav-toggle span`) with 3-line icon and smooth hover state
- **Added** mobile override: `.navigation { display: none }` → `.navigation.open { display: flex }` at `max-width: 768px`
- **Added** `@keyframes pageFadeIn` and `main { animation: pageFadeIn }` for page load animation
- **Added** `.animate-on-scroll` / `.animate-on-scroll.visible` transition (opacity + translateY)
- **Added** `transition-delay` staggering for nth-child accordion items
- **Added** `@media (prefers-reduced-motion: reduce)` override — disables all animations for accessibility
- **Added** `.accordion-trigger` styles with arrow indicator (▼ / ▲ via `::after`) and hover state
- **Added** `.accordion-panel`, `.accordion-img`, `.spec-list`, `.accordion-cta` styles
- **Added** `.search-wrapper`, `.search-input`, `.search-count` styles
- **Added** `.hours-box` styles for the operating hours card
- **Added** `select` global base styling with custom dropdown arrow via `background-image`
- **Added** `.response-table` styles for the dynamic enquiry response
- **Added** `input:focus`, `textarea:focus`, `select:focus` box-shadow transition (consistent across both forms)
- **Added** `button[type="submit"]:active` scale press-down effect

### robots.txt

- **Added** `Disallow: /private/` rule to prevent crawling of the private folder
- **Added** `Sitemap:` directive pointing to `sitemap.xml`
- **Added** comments explaining each directive

### sitemap.xml

- **Rebuilt** with proper absolute URL format for all five pages
- **Added** `<lastmod>`, `<changefreq>`, and `<priority>` tags to every `<url>` entry
- **Added** XML comments explaining how to update the domain after GitHub Pages deployment

### README.md

- **Rewrote** with project overview, page list, folder structure, Part 3 changelog summary, technologies used, and Harvard-formatted references

---

## [Part 2] — 2026-05-29 (retained for reference)

- Built all five HTML pages with semantic structure
- Applied responsive CSS with Flexbox, Grid, and two breakpoints (768px, 480px)
- Added enquiry form with basic validation in `validation.js`
- Added Google Maps iframes for both branch locations
- Added SEO meta descriptions and keywords to all pages
