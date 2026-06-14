# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read `insta-feature/project/index.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `insta-feature/README.md` — this file
- `insta-feature/project/` — the `Insta Feature` project files (HTML prototypes, assets, components)

---

# Instagram — Post Design Studio (prototype)

An in-app post & carousel creator for Instagram: templates, typography, photo
backgrounds, stickers, AI-assisted design directions, multi-slide carousels, a
live feed preview, and a share flow. Vanilla HTML/CSS/JS — open
`project/index.html` to run it.

## Features

- **Templates** — curated row + full categorized browser.
- **Typography** — fonts, size, line-height, color, alignment.
- **Backgrounds** — solid & gradient swatches, plus **photo backgrounds**:
  - Pick a preset photo **or upload your own** (📎 Upload chip).
  - Background images default to **75% opacity** so overlaid text stays readable;
    adjustable opacity + "darken photo" controls.
- **Stickers** — animated SVG stickers, drag to position.
- **AI directions** — paste text, get 6 designed directions; **Carousel mode**
  auto-splits longer text into designed slides.
- **Carousels** — multi-slide card stack with brand-kit cohesion, numbering, cover.
- **Auto-fit text** — canvas text auto-shrinks to fit its frame, so slides never
  overflow.
- **Feed preview & share** — see the post live in a feed, swipe the carousel, add
  a caption, and post.

## Run it

```bash
# from project/
python3 -m http.server 8000
# open http://127.0.0.1:8000/index.html
```

## Demo carousel (PDF)

A 9-slide product carousel — one feature per page — lives at
**`Instagram-Post-Design-Studio.pdf`**. Rebuild it with:

```bash
npm install
npx playwright install chromium
# serve the prototype on :8000, then:
node capture-carousel.js     # crisp 3x phone frames → carousel-frames/
node build-pdf.js            # assembles → Instagram-Post-Design-Studio.pdf
```

`capture-carousel.js` drives the prototype to each feature state and
screenshots the phone at retina resolution; `build-pdf.js` lays those frames
onto clean dark pages with titles, captions, and progress dots.

A scripted vertical screen recording is also available via
`node record-demo.js` (outputs a `.webm`).
