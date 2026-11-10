# minhazfuad.github.io

Personal portfolio for Md Abdul Ahad Minhaz — static HTML, Tailwind CSS, and vanilla JavaScript. Deployed with GitHub Pages.

## Preview locally

No build step is required to preview, since the compiled CSS is committed.

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Editing styles

Tailwind source lives in `assets/css/input.css` and is compiled to `assets/css/styles.css`.

```bash
npm install
npm run build:css   # one-off production build
npm run watch:css   # rebuild on change
```

Re-run `npm run build:css` after editing `index.html` or `assets/css/input.css`.

## Structure

- `index.html` — all page content, icon sprite, and metadata.
- `assets/css/input.css` — Tailwind source and custom components.
- `assets/css/styles.css` — compiled output (committed).
- `assets/js/main.js` — theme toggle, mobile menu, scroll reveal, particle canvas, copy-email, active nav.
- `assets/img/` — avatar, favicon, social preview, and project covers.
- `assets/Minhaz_CV.pdf` — downloadable CV.

## Customization

- Replace `assets/img/avatar.svg` with a real portrait and update the `<img>` in the hero.
- Replace the generated project covers with screenshots. See the commented `<img>` examples in each project card (`anytate.jpg`, `taskvault.jpg`, `ecorover.jpg`, `uiu-platformer.jpg`).
- Confirm the canonical URL and Open Graph URL in the `<head>` (currently `https://minhazfuad.github.io/`).
- Update `assets/Minhaz_CV.pdf` when the CV changes.

## Deployment

Push to the `main` branch of the `minhazfuad.github.io` repository. GitHub Pages serves the site from the repository root. `.nojekyll` is included so asset paths are served as-is.
