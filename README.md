Hi I am kunjesh mahajan - co-founder of ShipReady - $1 Million startup | visit us at useshipready.dev
# Bake Bliss by Gurpreet — Website !
  
A premium, fully responsive, vanilla HTML/CSS/JS landing page for **Bake Bliss by Gurpreet**,   
a home bakery in Khargone, Madhya Pradesh.
  
No frameworks, no build tools, no npm — just drag the folder into Netlify and it's live.class Tree {  // Euler tour: the subtree of x is tin[x] .. tout[x] - 1; LCA by a sparse table over the DFS order
    final int[] parent, tin, tout, order;  // the root is its own parent; order: the nodes in DFS order 
    final int[][] first;  // first[k][i]: the earliest parent among order[i .. i + 2^k - 1]

    Tree(int n, int[][] edges) {
        int[] degree = new int[n];
        for (int[] e : edges) {
            degree[e[0]]++;
            degree[e[1]]++;
        }
        int[][] graph = new int[n][];
        for (int x = 0; x < n; x++) graph[x] = new int[degree[x]];
        for (int[] e : edges) {
            graph[e[0]][--degree[e[0]]] = e[1];
            graph[e[1]][--degree[e[1]]] = e[0];
        }

        parent = new int[n];
        tin = new int[n];
        tout = new int[n];
        order = new int[n];
        int[] stack = new int[2 * n];
        int top = 0, time = 0;
        stack[top++] = 0;
        while (top > 0) {  // DFS without recursion; ~x marks the moment x's subtree is done
            int x = stack[--top];
            if (x < 0) {
                tout[~x] = time;
                continue;
            }
            tin[x] = time;
            order[time++] = x;
            stack[top++] = ~x;
            for (int y : graph[x])
                if (y != parent[x]) {
                    parent[y] = x;
                    stack[top++] = y;
                }
        }

        first = new int[32 - Integer.numberOfLeadingZeros(n)][];
        first[0] = new int[n];
        for (int i = 0; i < n; i++) first[0][i] = tin[parent[order[i]]];
        for (int k = 1; k < first.length; k++) {
            first[k] = new int[n - (1 << k) + 1];
            for (int i = 0; i < first[k].length; i++) first[k][i] = Math.min(first[k - 1][i], first[k - 1][i + (1 << (k - 1))]);
        }
    }

    int lca(int u, int v) {  // the parent that comes first in DFS order among the nodes after u up to v
        if (u == v) return u;
        int l = Math.min(tin[u], tin[v]), r = Math.max(tin[u], tin[v]);
        int k = 31 - Integer.numberOfLeadingZeros(r - l);
        return order[Math.min(first[k][l + 1], first[k][r - (1 << k) + 1])];
    }
}

class RootPaths {  // get(x): XOR of the letter bits from the root down to x
    private final Tree tree;
    private final int[] start, fenwick;  // the masks for the initial letters, and a Fenwick tree over the Euler tour with the changes since the start

    RootPaths(Tree tree, int[] bit) {
        this.tree = tree;
        start = bit.clone();
        for (int x : tree.order)  // a parent comes before its children in DFS order
            if (x != tree.parent[x]) start[x] ^= start[tree.parent[x]];
        fenwick = new int[bit.length + 1];
    }

    void flip(int x, int d) {  // XOR d into the root path of every node in x's subtree
        for (int i : new int[] {tree.tin[x] + 1, tree.tout[x] + 1})  // d starts at x's subtree and cancels out after it
            for (; i < fenwick.length; i += i & -i) fenwick[i] ^= d;
    }

    int get(int x) {
        int mask = start[x];
        for (int i = tree.tin[x] + 1; i > 0; i -= i & -i) mask ^= fenwick[i];
        return mask;
    }
}

class Solution {
    public List<Boolean> palindromePath(int n, int[][] edges, String s, String[] queries) {
        Tree tree = new Tree(n, edges);
        int[] bit = new int[n];  // bit[x]: the bit of x's letter
        for (int x = 0; x < n; x++) bit[x] = 1 << (s.charAt(x) - 'a');
        RootPaths paths = new RootPaths(tree, bit);

        List<Boolean> ans = new ArrayList<>();
        for (String q : queries) {
            int end = q.length();
            if (q.charAt(0) == 'u') {  // "update x c"
                int x = Integer.parseInt(q, 7, end - 2, 10), newBit = 1 << (q.charAt(end - 1) - 'a');
                paths.flip(x, bit[x] ^ newBit);  // the new letter changes the root path of every node in x's subtree
                bit[x] = newBit;
            } else {  // "query u v"
                int space = q.indexOf(' ', 6);
                int u = Integer.parseInt(q, 6, space, 10), v = Integer.parseInt(q, space + 1, end, 10);
                int mask = paths.get(u) ^ paths.get(v) ^ bit[tree.lca(u, v)];  // the LCA cancels out in get(u) ^ get(v), so add it back
                ans.add(Integer.bitCount(mask) <= 1);  // at most one letter is odd
            }
        }
        return ans;
    }
}

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
