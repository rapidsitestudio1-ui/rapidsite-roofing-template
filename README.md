# Roflin — Roofing & Construction Template

| | |
|---|---|
| **Template name** | Roflin |
| **Niche** | Roofing / Construction |
| **Figma source** | https://www.figma.com/design/lGAYHLhNmCUsC6aneYNFNL/Untitled?node-id=219-687 |
| **Created** | 2026-08-30 |
| **Technology** | Semantic HTML5, CSS (Grid/Flexbox, clamp(), CSS variables), vanilla JS |
| **Deployment URL** | _filled in at deploy time_ |
| **GitHub repository** | _filled in at deploy time_ |

## Signature interactions

- **Folding project stack** — the "Premium roofing projects" cards are sticky and fold into each other on scroll (previous card scales down/dims as the next covers it). Implemented with `position: sticky` + a rAF scroll handler in `js/main.js`; disabled for `prefers-reduced-motion`.
- **Accent hover CTAs** — the navbar "Get in touch" button and hero CTA shift to the orange accent (`--color-accent`) on hover; nav links also highlight orange.
- **Soft background** — the page ground is a warm off-white (`--color-bg: #f6f5f1`) with a deeper soft band (`--color-surface: #efede8`) for alternating sections, instead of pure white.
- **Before/after comparison slider** — draggable divider over two roof photos (range input, no dependencies).
- Testimonials slider with dot pagination, one-open FAQ accordion, client-logo marquee, soft scroll reveals.

## Main editable business fields

All content lives in `index.html`; brand colors live in the `:root` block at the top of `css/style.css`.

| Field | Where |
|---|---|
| Company name | search/replace "Roflin"; `<title>` + meta description |
| Logo | `assets/icons/logo-mark.svg` + `logo-word.svg` (header and footer) |
| Phone | search `(555) 123-4567` / `tel:+15551234567` (hero emergency card, contact, footer) |
| Email | search `info@roflin.com` |
| City / address | footer Contact Info ("123 Roofing Street, Dallas…") + form placeholder |
| Business hours | Contact section "Business Hours" block |
| Hero headline | `.hero__content h1` |
| Services | 4 `.service-card` items + `#f-service` select options + footer Services list |
| Projects | 4 `.project-card` items (image, tag, title, description, meta table) |
| Testimonials | `.review-card` items + `.reviews__stat` numbers |
| Team | `.team__grid` photos |
| Blog cards | `.blog-card` items |
| FAQ | `.faq__item` `<details>` blocks |
| Images | `assets/images/*.webp` — keep filenames to avoid touching HTML |
| Brand colors | `--color-navy`, `--color-accent`, `--color-bg`, `--color-surface` in `css/style.css` |

## Adapting for a new prospect

1. Copy this folder to `business-name-demo`.
2. Global search/replace company name, phone, email, address in `index.html`.
3. Swap images in `assets/images/` (keep filenames), adjust alt text.
4. Tune the 4 color variables in `css/style.css` if the prospect has brand colors.
5. Update `<title>` + meta description for local SEO.
6. Deploy: push to a `business-name-demo` repo → Netlify site named after the business.

## Notes

- Font: DM Sans via Google Fonts (substitute for the design's Google Sans, which is not publicly licensed).
- Contact + newsletter forms are front-end only — add `data-netlify="true"` for Netlify Forms if the prospect needs live submissions.
- Arrow glyphs in buttons and the two contact icons (phone/clock) are unicode characters; all photos/logos are real exported Figma assets.
