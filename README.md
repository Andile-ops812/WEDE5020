# Mercedes-Benz South Africa — WEDE5020 Portfolio of Evidence (Part 3)

**Student:** Andile Ndlovu
**Student Number:** ST10452270
**Module:** WEDE5020 — Web Design and Development
**Institution:** Rosebank College
**Year:** 2026

---

## Live Site

> **URL:** `https://andile-ops812.github.io/WEDE5020/`

---

## Project Overview

A five-page responsive website for Mercedes-Benz South Africa, built with HTML5, CSS3, and vanilla JavaScript. The site showcases the brand, its vehicle range, and allows visitors to submit enquiries and contact the dealership.

### Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — brand intro, payment info, branch table |
| `about_us.html` | History, Vision, Mission, Team |
| `products.html` | Model range with accordion, search/filter, pricing |
| `enquires.html` | Enquiry form with JS validation and dynamic response |
| `contact.html` | Contact details, validated form, Google Maps |

### Folder Structure
WEDE5020/

├── index.html

├── about_us.html

├── products.html

├── enquires.html

├── contact.html

├── robots.txt

├── sitemap.xml

├── README.md

├── CHANGELOG.md

├── css_assets/

│   └── mystyles.css

├── js_assets/

│   ├── main.js

│   └── validation.js

└── images/

└── [image files]
---

## Part 3 Changelog

### [2026-06-19] — Part 3: JavaScript, SEO, Forms, Deployment

- **Created** `js_assets/main.js` with hamburger menu toggle, scroll-triggered entrance animations, products accordion, live search/filter, enquiry form validation with dynamic price and availability response, and contact form validation with mailto compilation
- **Retained** `js_assets/validation.js` from Part 2
- **Replaced** static model lists on `products.html` with a four-card accordion (G63 AMG, C63 AMG, C200 AMG, GLS 600 Maybach), each showing a model image, spec list, and enquiry CTA
- **Added** live search/filter input on `products.html` that filters accordion cards in real time
- **Fixed** enquiry form `onsubmit` to call `handleEnquirySubmit()` — validates all fields and displays a dynamic response showing estimated price and availability based on the selected tier
- **Added** Message Type dropdown to `contact.html` — fulfils the Part 3 brief requirement; form validates all fields and compiles a pre-filled mailto link
- **Added** hamburger navigation button to all five pages — toggles the nav on mobile with `aria-expanded` for accessibility
- **Added** scroll-triggered entrance animations using `IntersectionObserver` on all pages
- **Added** page fade-in animation, button press transitions, and input focus glow across the site
- **Added** `<meta name="author">` and Open Graph tags (`og:title`, `og:description`, `og:type`, `og:image`) to all five pages
- **Added** `<link rel="preload">` for the hero banner image on `index.html`
- **Added** `loading="lazy"` to all non-header images
- **Created** `robots.txt` — allows all crawlers, disallows `/private/`, includes sitemap reference
- **Created** `sitemap.xml` — lists all five pages with `<lastmod>`, `<changefreq>`, and `<priority>` tags
- **Deployed** site live on GitHub Pages at `https://andile-ops812.github.io/WEDE5020/`
- **Updated** `robots.txt` and `sitemap.xml` with live GitHub Pages URL
- **Rewrote** `README.md` with project overview, folder structure, changelog, and references
- **Wrote** `CHANGELOG.md` with detailed entry for every Part 3 change

---

## Technologies Used

- **HTML5** — semantic elements, accessibility attributes (aria-*)
- **CSS3** — Flexbox, CSS Grid, media queries, CSS animations, keyframes, transitions
- **JavaScript (ES5/6)** — DOM manipulation, IntersectionObserver, form validation, mailto API
- **GitHub Pages** — static site hosting and deployment

---

## References

- Mozilla Developer Network (MDN). (2024). *IntersectionObserver API*. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- Mozilla Developer Network (MDN). (2024). *HTMLFormElement: submit event*. https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
- Mozilla Developer Network (MDN). (2024). *ARIA: aria-expanded attribute*. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
- W3Schools. (2024). *HTML5 Semantic Elements*. https://www.w3schools.com/html/html5_semantic_elements.asp
- Google Developers. (2024). *Search Engine Optimisation (SEO) Starter Guide*. https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Sitemaps.org. (2024). *Sitemap protocol*. https://www.sitemaps.org/protocol.html
- Open Graph Protocol. (2024). *The Open Graph Protocol*. https://ogp.me/

