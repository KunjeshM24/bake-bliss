# Bake Bliss by Gurpreet — Website

A premium, fully responsive, vanilla HTML/CSS/JS landing page for **Bake Bliss by Gurpreet**,
a home bakery in Khargone, Madhya Pradesh.

No frameworks, no build tools, no npm — just drag the folder into Netlify and it's live.

---

## 📁 Project Structure

```
/
├── index.html          → Main landing page (all 12 sections)
├── 404.html             → Custom "page not found" page
├── privacy.html          → Privacy Policy
├── terms.html            → Terms & Conditions
├── thank-you.html        → Post-enquiry confirmation page
├── style.css              → All styling (theme variables, responsive, animations)
├── script.js               → All interactivity (vanilla JS, no dependencies)
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── images/    → Placeholder images (see below — REPLACE with real photos)
    └── icons/      → favicon.ico, apple-touch-icon.png (placeholders)
```

## 🚀 Deploying to Netlify

1. Unzip / open this project folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the whole project folder onto the page.
4. That's it — your site is live! You can rename the site and add a custom domain from the Netlify dashboard.

## 🆕 Update Log (latest revision)

- **Real photography added.** All hero, featured-cakes, signature, gallery, and Instagram-feed images
  now use your actual cake photos (cropped from the Instagram screenshots you shared) instead of
  color placeholders.
- **Rating layout fixed.** "5.0★" now renders as one unbreakable unit on all screen sizes — the bug
  was that the number and suffix were separate flex items stacking on new lines; they're now grouped
  in a single `.stat-value` wrapper with `white-space: nowrap`.
- **Official platform icons.** The floating buttons, contact-info icons, and footer social icons now
  use authentic Instagram and WhatsApp SVG marks (official brand colors/gradient) instead of generic
  emoji, with a subtle scale + glow on hover.
- **`founder.jpg` is still a placeholder** — no real photo of Gurpreet was provided, so swap this one
  in when you have a portrait to use.

## 🖼️ Replacing Images (IMPORTANT)

Most images now use real cake photography cropped from your Instagram screenshots. A couple are
still **solid-color placeholders** (`founder.jpg`) since no source photo was provided — replace with
a real photo of the same filename (or update the `src` in `index.html`):

| Filename | Used for |
|---|---|
| `hero-cake-1.jpg`, `hero-cupcake.jpg`, `hero-cookie.jpg` | Floating hero images |
| `cake-birthday.jpg` … `cookies.jpg` | Featured Cakes cards |
| `signature-1.jpg`, `signature-2.jpg` | Signature Collection |
| `founder.jpg` | About / Meet Gurpreet |
| `gallery-1.jpg` … `gallery-8.jpg` | Masonry gallery |
| `insta-1.jpg` … `insta-6.jpg` | Instagram feed section |
| `og-cover.jpg` | Social share preview image (1200×630 recommended) |

Also replace `assets/icons/favicon.ico` and `apple-touch-icon.png` with your real logo mark.

## ✏️ Things To Personalize

Search for these in `index.html` and update with your real details:
- Phone number (`+91-00000-00000`, `tel:`/`wa.me:` links)
- Email address (`hello@bakeblissbygurpreet.com`)
- Google Maps embed (`iframe src` in the Contact section — get your real embed link from Google Maps → Share → Embed a map)
- Instagram handle links (already set to `@_bakebliss___`)
- Canonical/OG URLs once you have your final Netlify or custom domain

## 📩 Contact Form

The contact form and newsletter form currently do **frontend-only validation** and redirect to
`thank-you.html` on success. To actually receive submissions, either:
- Use **Netlify Forms**: add `netlify` and `data-netlify="true"` attributes to the `<form>` tags, or
- Connect a service like Formspree / EmailJS and update the JS submit handler in `script.js`.

## 🎨 Design System

- **Fonts:** Playfair Display (headings), Poppins (body), Great Vibes (script accents)
- **Colors:** Soft Beige, Cream, Pastel Pink, Chocolate Brown, Warm White, Rose Gold — all defined
  as CSS variables at the top of `style.css` for easy theming.
- **Dark mode:** toggle in the navbar, preference saved to `localStorage`.

## ✅ Features Included

Loading screen · custom cursor (desktop) · scroll progress bar · sticky navbar · dark mode with
localStorage · cookie notice · floating WhatsApp & Instagram buttons · back-to-top button ·
scroll-triggered fade animations · animated counters · parallax hero · mouse-tracking glow ·
button ripple effect · Pinterest-style masonry gallery with lightbox · glassmorphism testimonial
slider · animated FAQ accordion · working frontend form validation · SEO meta tags, Open Graph,
Twitter cards, and Bakery JSON-LD schema · robots.txt & sitemap.xml.

## ♿ Accessibility & Performance

- Semantic HTML5 landmarks (`header`, `main`, `footer`, `section`)
- ARIA labels on icon-only buttons and interactive widgets
- `prefers-reduced-motion` respected — animations disable automatically
- Lazy-loaded images (`loading="lazy"`) throughout, except above-the-fold hero images
- No external JS frameworks — minimal payload, fast load times

---

Made with 💗 — enjoy your new website!
