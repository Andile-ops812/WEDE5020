# Mercedes-Benz South Africa — WEDE5020 Portfolio of Evidence (Part 3)

**Student:** Andile Ndlovu
**Student Number:** ST10452270
**Module:** WEDE5020 — Web Design and Development
**Institution:** Rosebank College
**Year:** 2026

---

## Live Site

> **Deploy to GitHub Pages and paste the URL here:**
> `https://[your-username].github.io/[your-repo-name]/`

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

```
mercedes-benz/
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
│   ├── main.js         ← Part 3: all site-wide JS
│   └── validation.js   ← Part 2: enquiry form validation (retained)
└── images/
    └── [image files]
```

---

## Part 3 Changelog

See `CHANGELOG.md` for the full detailed changelog.

### Summary of Part 3 additions

- Created `js_assets/main.js` with hamburger menu, scroll animations, accordion, search/filter, enquiry form validation, and contact form validation
- Replaced Google Form iframe with a validated HTML enquiry form that shows a dynamic price and availability response
- Added `Message Type` dropdown to the contact form and wired full JS validation with mailto compilation
- Added four-model accordion with images, specs, and enquiry CTAs on the Products page
- Added live search/filter input on the Products page
- Added scroll-triggered entrance animations using IntersectionObserver
- Added page fade-in animation and button/input CSS transitions
- Added hamburger navigation toggle for mobile
- Added `<meta name="author">` and Open Graph tags to all five pages
- Added `loading="lazy"` to all non-header images
- Added `<link rel="preload">` for the hero banner image on the homepage
- Updated `robots.txt` with Disallow rule and sitemap reference
- Rebuilt `sitemap.xml` with proper `<lastmod>`, `<changefreq>`, and `<priority>` tags
- Linked `main.js` to all five pages

---

## Technologies Used

- **HTML5** — semantic elements, accessibility attributes (aria-*)
- **CSS3** — Flexbox, CSS Grid, media queries, CSS animations, transitions
- **JavaScript (ES5/6)** — DOM manipulation, IntersectionObserver, form validation, IntersectionObserver, mailto API
- **GitHub Pages** — static site hosting

---

## References

- Mozilla Developer Network (MDN). (2024). *IntersectionObserver API*. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- Mozilla Developer Network (MDN). (2024). *HTMLFormElement: submit event*. https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
- Mozilla Developer Network (MDN). (2024). *ARIA: aria-expanded attribute*. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
- W3Schools. (2024). *HTML5 Semantic Elements*. https://www.w3schools.com/html/html5_semantic_elements.asp
- Google Developers. (2024). *Search Engine Optimisation (SEO) Starter Guide*. https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Sitemaps.org. (2024). *Sitemap protocol*. https://www.sitemaps.org/protocol.html
- Open Graph Protocol. (2024). *The Open Graph Protocol*. https://ogp.me/
