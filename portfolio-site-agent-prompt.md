# Task: Build a Modern Portfolio Website for Md Abdul Ahad Minhaz

You are an expert front-end engineer and visual designer. Build a polished, modern, fully static personal portfolio website for **Md Abdul Ahad Minhaz**, a Computer Science & Engineering graduate (Data Science major) from United International University who builds AI/computer-vision systems, full-stack web platforms, and embedded/robotics projects, and who has co-authored several research papers.

## 1. Sources of Truth

1. **CV:** `minhaz_cv_industry.pdf` (provided). Read it fully before writing any code. It wins on every factual conflict (dates, titles, venues, statuses).
2. **LinkedIn:** https://www.linkedin.com/in/aaminhaz/ is the secondary source for *voice, headline, bio wording, and section naming*. LinkedIn blocks automated access, so **do not try to scrape it**. Use the pasted copy in section 2 instead.

Rules:
- The CV has link labels such as `[ github ]`, `[ live ]`, `[ video ]`, `[ paper ]`, `[ code ]`, `[ dataset ]`, `[ certificate ]`, plus LinkedIn / GitHub / Google Scholar / Portfolio in the header. The URLs are hidden behind these labels, so **extract the real hyperlink annotations from the PDF** (e.g. with PyMuPDF or pdfplumber) and wire them up. If a URL can't be recovered, leave a placeholder marked `TODO` in `index.html` and list it in your final summary.
- Never invent facts, metrics, links, or dates. Rewording for brevity is fine; changing meaning is not.
- Use the LinkedIn URL `https://www.linkedin.com/in/aaminhaz/` for the LinkedIn icon/button.

## 2. LinkedIn Copy (to be pasted by the owner)

> **Owner: paste the rest of your LinkedIn About text here before handing this prompt to the agent.** The headline below is final and must be used exactly as written. The About text should be used verbatim (lightly trimmed) for the bio, and project/award wording may be reused. If a field is left empty, fall back to CV-derived text.

```
HEADLINE (final, use character for character): CSE Graduate @ UIU | NLP, LLM, Multimodal AI Researcher | Full-Stack Web

ABOUT (verified opening, rest to be pasted):
"I am a Computer Science and Engineering graduate from United International University…"
<paste the rest of your About text here>

OTHER SECTION TITLES / WORDING YOU WANT REUSED (optional):
<e.g. custom project titles, featured items, skills order>
```

Wording already confirmed from the LinkedIn profile, which the agent may use:
- The About section opens with: *"I am a Computer Science and Engineering graduate from United International University…"*
- The UIU Platformer entry is listed under **2nd Runner Up | Advanced Object Oriented Programming, CSE Project Show**, described as a 2D platformer built with JavaFX to help new students navigate university life in an engaging and interactive way.

## 3. Section Naming (Mirror LinkedIn)

Use LinkedIn's familiar terminology for section titles and nav labels so the site feels consistent with his professional profile:

**About · Projects · Publications · Skills · Honors & Awards · Licenses & Certifications · Education · Contact**

Nav bar (keep short): `About`, `Projects`, `Publications`, `Skills`, `Achievements`, `Contact`, where *Achievements* groups Honors & Awards, Leadership, and Licenses & Certifications. If the pasted LinkedIn copy uses different titles, prefer those.

## 4. Positioning

Present him as **an NLP, LLM, and multimodal AI researcher who also ships full-stack web products**, as his headline says. Give research (Publications) and shipped projects (vision, web, robotics) equal visual weight.

- **Main title (exact, non-negotiable):** `CSE Graduate @ UIU | NLP, LLM, Multimodal AI Researcher | Full-Stack Web`
  - Use this string verbatim as the primary title under his name in the hero. Do not rewrite, shorten, reorder, re-case, or replace the `@` or `|` characters.
  - You may style it (for example, render the three segments on one line on desktop and stacked on mobile, with the `|` as a subtle divider, or give each segment a different weight or color), but the text content must remain identical and complete.
  - Do not animate it with typing, rotating, or scrambling effects. A simple fade/slide-in on load is fine.
  - Reuse the same string for the page `<title>` suffix, meta description, and Open Graph title.
- Any additional tagline or value statement must support this title and stay accurate. Do not claim seniority or experience the CV doesn't show.

## 5. Content Curation Rules (Important)

This is a portfolio, not a CV copy-paste. **Curate aggressively and avoid clutter.** Use short, scannable lines (max ~20 words each).

**Feature prominently**
- The 4 projects: AnyTate, TaskVault, EcoRover, UIU Platformer (AnyTate and EcoRover visually emphasized as flagships).
- The 4 publications, in their own section.
- Hult Prize 2026 On-Campus Champion and the Build with Gemma (Kaggle) hackathon.

**Include in compressed form**
- Skills: 4 groups, strongest items only, no progress bars or percentages.
- Honors & Awards and Licenses & Certifications as one tidy row or list.
- Education as one compact card.

**Leave out entirely**
- Phone number (show email and social links only), CGPA, and LinkedIn follower/connection counts.
- Minor tools: Proteus, Logisim, Cisco Packet Tracer, BASH, LaTeX, Matplotlib, TiDB, Netlify.
- The Castpotro role. The Graphic Design internship may appear as one small line under leadership, or be dropped if it crowds the layout.
- Long project descriptions: one-line summary plus 2-3 short highlights per project.

## 6. Site Structure

Single-page site with smooth scrolling and a sticky navigation bar.

### 6.1 Hero
Name, the main title (section 4, exact text), a one-sentence value statement, and CTAs: **View Projects**, **Download CV** (serve the PDF from `assets/Minhaz_CV.pdf`), **Contact**. Social icons for GitHub, LinkedIn, Google Scholar, and email. Avatar slot (placeholder if none) and an animated background.

### 6.2 About
A 2-4 sentence bio based on the LinkedIn About text (trimmed) and CV facts. Add a compact **Education** card (B.Sc. in CSE, Major: Data Science, United International University, 2022-2026) and 3-4 honest highlight stats derived from the CV (e.g. "4 publications", "4 shipped projects", "Hult Prize on-campus champion").

### 6.3 Projects (card grid)
Each card: title, tag line, one-sentence summary, up to 5 tech chips, and icon-links (GitHub / Live / Video where available). Hover lift or tilt, optional detail modal.

| Project | Summary to convey | Tech chips |
|---|---|---|
| **AnyTate** (2026) | Full-stack computer-vision annotation platform enforcing Few-Shot Chain-of-Thought reasoning guidelines, with taxonomy versioning, fast queue caching, and YOLO/COCO export | Next.js, PostgreSQL, Supabase, GCP |
| **TaskVault** (2026) | Learn-to-earn platform linking education and employment via an LMS, a reputation-point engine, and escrow-based corporate bounties | Next.js, MySQL |
| **EcoRover** (2025) | 4-DOF robot that autonomously detects and sorts recyclable waste using computer vision | Python, OpenCV, YOLOv8n, Raspberry Pi 5 |
| **UIU Platformer** (2024) | 2D platformer that helps new students navigate university life; usability-tested with 20+ participants. Show a small **"2nd Runner-Up, UIU CSE Project Show 2024"** badge on this card | Java, JavaFX |

No screenshots are provided. Generate a good-looking cover for each project (CSS/SVG gradient with an icon or abstract pattern) and structure each card so a real screenshot can later replace the generated cover by dropping a file into `assets/img/projects/` and swapping one `<img>` tag (leave a commented example in the markup). Show a play icon on cards that have a video link.

### 6.4 Skills (curated, grouped chips)
- **Languages:** Python, C/C++, Java, JavaScript, SQL
- **AI & ML:** PyTorch, OpenCV, Scikit-learn, NumPy & Pandas, YOLO
- **Web & Data:** Next.js, Tailwind CSS, Supabase, PostgreSQL / MySQL, Prisma
- **Hardware & Tools:** Raspberry Pi, ESP32, Arduino, Git & GitHub

### 6.5 Publications
Make this section distinctive (clean list or stacked cards with a status badge per paper). For each: title, venue and year, status badge, his name **highlighted in the author list**, and icon-links (paper / code / dataset / presentation) where available.

- **GreenSwap: Verb Choice or Output Length? A Controlled Decomposition of Prompt-Level Energy Savings in LLM Inference**: EMNLP 2026 (Main Conference)
- **WADE: A Waste Annotation Reasoning-Chain Dataset and Distillation Framework for Low-Resource Vision-Language Models**: submitted to Engineering Applications of Artificial Intelligence (EAAI), under review, 2026
- **EcoDetect: Lightweight Real-Time Recyclable Waste Detection Using YOLOv11n Trained on LLM-Guided Synthetic Data**: ICCIT 2025
- **InsideOut: An EfficientNetV2-S Based Deep Learning Framework for Robust Multi-Class Facial Emotion Recognition**: arXiv:2510.03066 (preprint)

Use status labels exactly as the CV states (Conference, Under Review, Preprint); never upgrade or reword them. Keep author lists tidy (collapsed or truncated with his name highlighted) but never remove or reorder authors. Add a prominent "View all on Google Scholar" link.

### 6.6 Achievements
One compact section with sub-blocks named like LinkedIn:
- **Honors & Awards:** Hult Prize 2026 On-Campus Champion (led a team to win the on-campus round, advancing to represent UIU at the Nationals); 2nd Runner-Up, UIU CSE Project Show (Advanced Object-Oriented Programming), 2024; 4th Runner-Up, UIU CSE Project Show (Software Engineering), 2025.
- **Hackathons & Leadership:** Build with Gemma: Bangladesh (Kaggle), Google's generative-AI hackathon using the Gemma open-weights model.
- **Licenses & Certifications:** Google AI Essentials Specialization (Google), Claude Code 101 (Anthropic), Intro to Machine Learning (Kaggle), all 2026, with certificate links where available.

### 6.7 Contact
Short call to action with email and social links. No backend: use a `mailto:` button and a copy-email-to-clipboard action with a toast. Location shown as "Dhaka, Bangladesh".

### 6.8 Footer
Minimal copyright line and a back-to-top link.

## 7. Design Direction

- Modern, clean, premium, with a subtle technical/AI flavor suited to an ML and robotics profile (faint grid, dot, or neural-network-style background, monospace accents for tags and labels). Tasteful, never gimmicky.
- **Dark mode by default** with a light-mode toggle (persist in `localStorage`, respect `prefers-color-scheme` on first load).
  - Use Tailwind's class strategy (`darkMode: 'class'`, a `dark` class on `<html>`).
  - Add a tiny inline script in `<head>`, before the stylesheet, that sets the class from `localStorage` (key `portfolio-theme`) or `prefers-color-scheme` before first paint, so there is no flash of the wrong theme. Wrap storage access in `try/catch`. `main.js` only handles the toggle click and saving the choice.
- One accent color or gradient used consistently (e.g. indigo-to-cyan or emerald-to-teal) on a neutral base.
- Typography: a modern sans (Inter, Plus Jakarta Sans, or Space Grotesk) plus a mono font (JetBrains Mono or similar) for chips and metadata.
- Generous whitespace, consistent spacing scale, rounded corners, soft shadows, subtle borders or glassmorphism.
- Fully responsive, mobile-first (360px, 768px, 1024px, 1440px), with a hamburger menu on mobile.
- Use inline SVG icons (no icon libraries). No emoji as UI icons.

### 7.1 Mobile Experience (Required)

Most visitors will open this on a phone, so design **mobile-first** and treat mobile as the primary experience, not an afterthought. Check every section at 320px, 360px, 390px, 412px, 768px (tablet), 1024px, and 1440px, in portrait and landscape.

**Layout and typography**
- Include `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. No horizontal scrolling at any width (watch long titles, author lists, chips, and code-like text; use `min-w-0`, `break-words`, and wrapping).
- Fluid type with `clamp()` (or responsive Tailwind sizes): body text at least 16px, comfortable line length and line height, and a hero name and title that scale down cleanly.
- The exact main title must wrap gracefully on small screens: stack its three `|`-separated segments on separate lines (hiding the `|` dividers visually only), without changing the text.
- Single-column stacks on mobile: project cards, publication cards, skills groups, and achievements. Two or three columns only from `md`/`lg` upward. Buttons in the hero and contact sections stack full-width on small screens.
- Use `min-h-[100svh]` (small viewport height) for full-screen sections, never plain `100vh`, so the iOS/Android browser bars don't cut content off.
- Respect device notches and home bars with `env(safe-area-inset-*)` padding on the fixed navbar and footer.
- Set `scroll-padding-top` (or `scroll-mt-*` on sections) so anchor jumps aren't hidden under the sticky navbar.

**Navigation**
- Compact sticky top bar with the name or monogram, a theme toggle, and a hamburger button. The menu opens as a full-screen or slide-down panel with large, easy-to-tap links.
- It closes on link tap, on the close button, on `Esc`, and on tapping the backdrop. Lock body scroll while it's open, move focus into it, and return focus to the button on close. Set `aria-expanded` and `aria-controls` correctly.

**Touch and interaction**
- Every tappable element is at least 44x44px with adequate spacing, including icon links, chips that are links, and the theme toggle.
- Wrap hover-only effects (card tilt, glow, cursor-follow) in `@media (hover: hover)` so they never appear or get stuck on touch devices. Give touch users a clear `:active` press state instead.
- Modals open as a full-screen or bottom-sheet layout on mobile, with a large close button, scrollable content, and body scroll lock.

**Performance and animation on phones**
- Keep animation light: `transform` and `opacity` only, shorter durations and smaller travel distances on mobile.
- The hero background effect must be cheap on phones (far fewer particles or a static/CSS-only gradient), must pause when off-screen or when the tab is hidden, and must be disabled under `prefers-reduced-motion`.
- Responsive, lazy-loaded images with explicit width/height to avoid layout shift, and no large unoptimized assets.
- Add `<meta name="theme-color">` for both light and dark themes so the mobile browser bar matches the site.

**Verification**
- If a headless browser (e.g. Playwright) is available, take screenshots at 360x800, 390x844, and 768x1024 in both themes and fix anything clipped, overlapping, or overflowing before finishing. Otherwise, review the markup carefully against this checklist. Mention in the final summary what was verified.

## 8. Animations & Interaction (Required)

- Staggered hero entrance on load (headline, subtext, buttons, avatar).
- Scroll-reveal for every section and card (fade + translate, staggered children, triggered once).
- Smooth anchor scrolling, active-section highlighting in the navbar, and a thin scroll-progress bar.
- Hover and focus micro-interactions on buttons, cards, chips, and links (lift, glow, underline slide, subtle tilt on project cards).
- Animated hero background (slow gradient drift, floating shapes, or a lightweight canvas network effect that pauses off-screen).
- Smooth theme-toggle transition.
- Optional: count-up on stats, cursor-follow glow on desktop. No typing or rotating effects on the main title.
- Animate `transform` and `opacity` only. Natural easing (e.g. `cubic-bezier(0.22, 1, 0.36, 1)`).
- **Respect `prefers-reduced-motion`** by disabling or heavily simplifying motion.

## 9. Tech Stack (Strict)

- **Plain HTML5, Tailwind CSS, and vanilla JavaScript. Nothing else.** No React/Vue or any framework, no Vite/Webpack or any bundler, no TypeScript, and no animation or UI libraries (no jQuery, GSAP, Framer Motion, AOS, etc.).
- **One `index.html` at the repo root**, with all content written as semantic static HTML (better SEO, works without JavaScript). JavaScript is for behavior only: theme toggle, mobile menu, scroll-reveal, active nav highlighting, scroll progress, hero background effect, copy-email, and modals.
- **JavaScript:** one `assets/js/main.js` loaded as a classic script (`<script defer src="assets/js/main.js">`, not ES modules) so the page also works when opened by double-clicking the file. Organize it into small, well-named functions with short comments.
- **Tailwind:** use the Tailwind CLI only to generate CSS (this is the only npm tooling allowed). Source in `assets/css/input.css`, theme config in `tailwind.config.js` (custom colors, fonts, keyframes, class-based dark mode), and the compiled, minified output **committed** as `assets/css/styles.css` and linked from `index.html`. Do not use the Tailwind Play CDN in the final site. `package.json` contains only the CLI dependency and two scripts, `build:css` and `watch:css`.
- **Icons and fonts:** inline SVG icons (reuse via an SVG `<symbol>` sprite). Google Fonts via `<link>` with `preconnect` and `display=swap`, plus proper fallback stacks.
- **No backend, database, API keys, or server code.**
- **Deployment target: GitHub Pages**, served straight from the repo root. Because the compiled CSS is committed, no build step or workflow is needed (Settings, Pages, Deploy from a branch, `main` / root).
  - Add an empty `.nojekyll` file at the root.
  - Use **relative** paths everywhere (`assets/...`, never a leading `/`) so the site works at both `username.github.io` and `username.github.io/repo-name/`.
  - Open Graph/canonical tags need absolute URLs: define the site URL once as a clearly marked `TODO` placeholder and mention it in the final summary.
  - The same files must also work unchanged on Vercel or Netlify.

## 10. Code Organization

```
index.html
assets/
  css/
    input.css            // Tailwind source (@tailwind directives + small custom CSS)
    styles.css           // compiled output, committed
  js/
    main.js              // all interactions and animations
  img/                   // avatar, og-image, favicon, projects/
  Minhaz_CV.pdf
tailwind.config.js
package.json             // Tailwind CLI + build:css / watch:css only
.nojekyll
README.md
```

Make content easy to edit: give each section a clear comment banner in `index.html` (for example `<!-- ===== PROJECTS ===== -->`), keep repeated cards (projects, publications, achievements) in identical markup so adding one is a copy-paste, and mark every placeholder with `TODO`.

## 11. Quality Requirements

- **Accessibility:** semantic HTML (`header`, `nav`, `main`, `section`, `footer`), correct heading order, alt text, visible focus states, WCAG AA contrast, keyboard-navigable menu and modals, `aria-label`s on icon-only buttons.
- **SEO and sharing:** `<title>` of the form "Md Abdul Ahad Minhaz | " + the main title, a meta description, Open Graph and Twitter tags using the same main title, and a favicon.
- **Performance:** lazy-load images, no heavy scripts, aim for Lighthouse 90+.
- No console errors or warnings; `npm run build:css` must succeed and the committed `styles.css` must be up to date.

## 12. Deliverables

1. A complete working site (`index.html` plus `assets/`) that opens directly in a browser and renders correctly with no build step. `npm install && npm run build:css` regenerates the CSS after edits.
2. A short `README.md`: how to preview locally, how to edit content in `index.html`, how to swap the avatar, project images, and CV, how to rebuild the CSS, and how to deploy to GitHub Pages step by step (push to `main`, then Settings, Pages, Deploy from a branch, `main` / root).
3. A final summary listing: what was included, what was left out and why, every `TODO` placeholder or missing link, whether the LinkedIn copy in section 2 was filled in, and any assumptions made.

## 13. Definition of Done

- The site looks distinctive, modern, and professional on mobile and desktop in both themes.
- A visitor understands within about 30 seconds who he is, what he has built, that he publishes research, and how to contact him.
- The main title appears exactly as specified in section 4, with no changes to its text.
- It looks and feels great on a phone: no horizontal scroll, comfortable tap targets, a working mobile menu, and smooth performance (section 7.1).
- Section titles and bio wording feel consistent with his LinkedIn profile.
- It feels uncluttered, with smooth animations that degrade gracefully under reduced motion.
- The site works on GitHub Pages with no build step, uses only HTML, Tailwind, and vanilla JS, and nothing is fabricated.
