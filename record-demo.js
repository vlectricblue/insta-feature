/**
 * Instagram Post Design Studio — Holistic Product Demo Recorder
 *
 * Covers EVERY feature: text edit, fonts, font size, text color,
 * solid backgrounds, gradient backgrounds, photo backgrounds (with opacity),
 * stickers, template browser, AI single-post, AI carousel mode,
 * multi-slide carousel card stack, feed preview (swipeable carousel),
 * share screen with caption, and posting to feed with a like reaction.
 *
 * Paced like a premium mobile product video:
 *   - Slow, legible reveals  •  Natural human-speed typing
 *   - Clear beats between micro-actions  •  Hero moments hold longer
 *
 * Usage:  node record-demo.js
 * Output: demo-output/demo.webm  (390×844 @ 2×, ~90s)
 */

const { chromium } = require("playwright");
const path = require("path");
const fs   = require("fs");

/* ── timing ─────────────────────────────────────────────────── */
const wait   = (ms) => new Promise(r => setTimeout(r, ms));
const beat   = ()   => wait(550);
const pause  = ()   => wait(1200);
const linger = ()   => wait(2300);
const breath = ()   => wait(3500);

/* ── smooth scroll ───────────────────────────────────────────── */
async function scrollEl(page, selector, dist) {
  await page.evaluate(({ s, d }) => {
    const el = document.querySelector(s);
    if (el) el.scrollBy({ top: d, behavior: "smooth" });
  }, { s: selector, d: dist });
  await wait(700);
}

/* ── type at human speed ─────────────────────────────────────── */
async function humanType(page, selector, text, delay = 62) {
  await page.click(selector, { timeout: 6000 });
  await beat();
  for (const ch of text) {
    await page.keyboard.type(ch);
    await wait(delay + Math.floor(Math.random() * 38));
  }
}

/* ── nth element click (re-queries, dispatches via DOM to bypass visibility) */
async function clickNth(page, selector, n = 0) {
  const clicked = await page.evaluate(({ sel, idx }) => {
    const all = Array.from(document.querySelectorAll(sel));
    if (!all[idx]) return false;
    all[idx].dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    return true;
  }, { sel: selector, idx: n });
  if (!clicked) console.warn(`[skip] "${selector}"[${n}] not found`);
}

/* ── open a <details> section by its summary text ───────────── */
async function openSection(page, keyword) {
  await page.evaluate((kw) => {
    const sums = Array.from(document.querySelectorAll(".d-section summary"));
    for (const s of sums) {
      if (s.textContent.toLowerCase().includes(kw.toLowerCase())) {
        if (!s.parentElement.hasAttribute("open")) {
          s.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        }
        return;
      }
    }
  }, keyword);
  await pause();
}

/* ── fill a range slider and fire input event ────────────────── */
async function setSlider(page, selector, value) {
  await page.evaluate(({ sel, val }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.value = val;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, { sel: selector, val: String(value) });
}

async function main() {
  const outDir = path.join(__dirname, "demo-output");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    recordVideo: { dir: outDir, size: { width: 390, height: 844 } },
  });
  const page = await context.newPage();

  const url = process.env.DEMO_URL || "http://127.0.0.1:8000/index.html";
  await page.goto(url, { waitUntil: "networkidle" });

  // Hide the design-prototype "Tweaks" FAB/panel so the video is clean.
  await page.addStyleTag({
    content: `.tw-fab, .tw-panel { display: none !important; }`,
  });
  await wait(600);

  /* ════════════════════════════════════════════════════════════
     SCENE 1 — Home feed  (establish context)
     Show the real Instagram-style feed so viewers know where this lives.
     ════════════════════════════════════════════════════════════ */
  await breath();                         // open hold on the feed
  await scrollEl(page, ".home-body", 240);
  await linger();                         // show mid-feed posts
  await scrollEl(page, ".home-body", -240);
  await pause();

  /* ════════════════════════════════════════════════════════════
     SCENE 2 — Tap "Your story" → Camera screen → DESIGN mode
     ════════════════════════════════════════════════════════════ */
  await page.click('[data-act="open-create-sheet"]');
  await linger();                         // camera screen
  await page.click('[data-mode="DESIGN"]');
  await pause();                          // DESIGN tab highlighted

  /* ════════════════════════════════════════════════════════════
     SCENE 3 — Open the designer
     ════════════════════════════════════════════════════════════ */
  await page.click('[data-act="enter-composer"]');
  await linger();                         // composer, Dawn Blush template

  /* ════════════════════════════════════════════════════════════
     SCENE 4 — Write some text
     ════════════════════════════════════════════════════════════ */
  // clear the seed text and type fresh copy
  const ta = "textarea[data-input='text']";
  await page.click(ta);
  await page.keyboard.press("Meta+a");
  await page.keyboard.press("Backspace");
  await beat();
  await humanType(page, ta,
    "Consistency beats motivation.\nShow up when no one's clapping.", 58);
  await linger();

  /* ════════════════════════════════════════════════════════════
     SCENE 5 — Compact template row: swap templates
     ════════════════════════════════════════════════════════════ */
  await scrollEl(page, ".comp-panel", 80);
  await pause();
  await clickNth(page, ".t-card:not(.t-card--more)", 2); await pause();
  await clickNth(page, ".t-card:not(.t-card--more)", 5); await linger();

  /* ════════════════════════════════════════════════════════════
     SCENE 6 — Full template browser: browse all categories
     ════════════════════════════════════════════════════════════ */
  await page.click('[data-act="open-templates"]');
  await linger();
  await scrollEl(page, ".tpl-overlay-body", 380);
  await pause();
  await scrollEl(page, ".tpl-overlay-body", 360);
  await pause();
  await clickNth(page, ".tpl-overlay-body .t-card", 8, { force: true }); // pick one mid-way
  await linger();

  /* ════════════════════════════════════════════════════════════
     SCENE 7 — Typography: font, size, line-height, color, align
     ════════════════════════════════════════════════════════════ */
  await scrollEl(page, ".comp-panel", -600);
  await pause();
  await openSection(page, "typography");

  // Switch fonts one by one — let the canvas update visibly
  await clickNth(page, ".d-font-chip", 0); await pause();  // Editorial
  await clickNth(page, ".d-font-chip", 6); await pause();  // Bold Sans
  await clickNth(page, ".d-font-chip", 9); await pause();  // Modern
  await clickNth(page, ".d-font-chip", 3); await linger(); // Display (settle)

  // Crank font size up then ease back
  await setSlider(page, "input[data-set='fontSize']", 72); await pause();
  await setSlider(page, "input[data-set='fontSize']", 44); await pause();

  // Line height adjustment
  await setSlider(page, "input[data-set='lineHeight']", 1.35); await pause();

  // Text colors: try 3 swatches
  await clickNth(page, ".d-color-chip", 1); await beat();  // cream
  await clickNth(page, ".d-color-chip", 4); await beat();  // gold
  await clickNth(page, ".d-color-chip", 0); await pause(); // back to dark

  // Alignment
  await clickNth(page, ".d-align-chip", 0); await beat();  // left
  await clickNth(page, ".d-align-chip", 1); await linger(); // center

  /* ════════════════════════════════════════════════════════════
     SCENE 8 — Solid & gradient background swatches
     ════════════════════════════════════════════════════════════ */
  await openSection(page, "background");
  await clickNth(page, ".d-bg-chip", 1); await pause();  // black
  await clickNth(page, ".d-bg-chip", 6); await pause();  // coral gradient
  await clickNth(page, ".d-bg-chip", 9); await pause();  // dark blue gradient
  await clickNth(page, ".d-bg-chip", 0); await linger(); // back to sand

  /* ════════════════════════════════════════════════════════════
     SCENE 9 — Photo background: preset + opacity control
     ════════════════════════════════════════════════════════════ */
  await openSection(page, "photo background");

  await clickNth(page, ".d-photo-chip:not(.d-photo-upload)", 3); // mountain dawn
  await linger();

  // Show the opacity slider — dim down then restore to 75%
  await setSlider(page, "input[data-set='bgImageOpacity']", 0.45); await pause();
  await setSlider(page, "input[data-set='bgImageOpacity']", 0.75); await pause();

  // Darken overlay
  await setSlider(page, "input[data-set='bgImageDim']", 0.30); await pause();
  await setSlider(page, "input[data-set='bgImageDim']", 0);    await pause();

  // Switch to another photo
  await clickNth(page, ".d-photo-chip:not(.d-photo-upload)", 0); // cafe
  await linger();

  /* ════════════════════════════════════════════════════════════
     SCENE 10 — Layout & position (aspect ratio)
     ════════════════════════════════════════════════════════════ */
  await openSection(page, "layout");
  await clickNth(page, ".d-aspect-chip", 2); await pause();  // 9:16
  await clickNth(page, ".d-aspect-chip", 1); await linger(); // back to 4:5

  /* ════════════════════════════════════════════════════════════
     SCENE 12 — AI tab: single-post design directions
     ════════════════════════════════════════════════════════════ */
  await page.click('[data-tab="ai"]');
  await pause();

  // Use example chip
  await clickNth(page, ".ai-chip", 1);
  await pause();
  await page.click('[data-act="ai-generate"]');
  await wait(600);   // show loading animation
  await linger();
  await wait(2000);  // let the 2.1s AI timer complete + grid render
  await linger();    // let viewer scan the 6 directions

  // Pick one direction — app applies it to the canvas and jumps to Design tab
  await clickNth(page, ".ai-result", 2); await linger();

  /* ════════════════════════════════════════════════════════════
     SCENE 13 — AI Carousel mode: auto-split long text into slides
     (re-enter AI tab — picking a result above switched us to Design)
     ════════════════════════════════════════════════════════════ */
  await page.click('[data-tab="ai"]');
  await pause();
  await page.click('[data-act="ai-mode-thread"]');
  await pause();

  const aiTa = "textarea[data-input='aiInput']";
  await page.click(aiTa);
  await page.keyboard.press("Meta+a");
  await page.keyboard.press("Backspace");
  await beat();

  const longText =
    "Healing isn't linear, and that's okay.\n\n" +
    "You can be soft and strong at the same time.\n\n" +
    "Rest is not giving up — it's a strategic pause so you can move better.";
  await humanType(page, aiTa, longText, 26);
  await linger();

  await page.click('[data-act="ai-generate"]');
  await wait(600);
  await linger();
  await wait(2200);

  await clickNth(page, ".ai-result", 1); await linger(); // pick a result

  /* ════════════════════════════════════════════════════════════
     SCENE 14 — Design tab: multi-slide carousel card stack
     ════════════════════════════════════════════════════════════ */
  await page.click('[data-tab="design"]');
  await linger(); // card stack with 3 slides visible

  // Tap between cards via the dot pickers
  await clickNth(page, ".d-thread-dot", 1); await pause();
  await clickNth(page, ".d-thread-dot", 2); await pause();
  await clickNth(page, ".d-thread-dot", 0); await linger();

  // Quick brand-kit cohesion demo (Soft match then back to Free)
  await clickNth(page, "[data-set-cohesion]", 1); await pause();
  await clickNth(page, "[data-set-cohesion]", 0); await pause();

  /* ════════════════════════════════════════════════════════════
     SCENE 15 — Feed preview: swipe the carousel
     ════════════════════════════════════════════════════════════ */
  await page.click('[data-act="preview-feed"]');
  await linger();

  const track = page.locator(".carousel-track").first();
  if (await track.count() > 0) {
    const box = await track.boundingBox();
    if (box) {
      // Swipe left to reveal each slide
      for (let i = 0; i < 2; i++) {
        const startX = box.x + box.width * 0.80;
        const endX   = box.x + box.width * 0.08;
        const midY   = box.y + box.height * 0.5;
        await page.mouse.move(startX, midY);
        await page.mouse.down();
        for (let s = 0; s <= 24; s++) {
          await page.mouse.move(startX + (endX - startX) * s / 24, midY);
          await wait(18);
        }
        await page.mouse.up();
        await linger();
      }
    }
  }

  await page.click('[data-act="back-to-composer"]');
  await pause();

  /* ════════════════════════════════════════════════════════════
     SCENE 16 — Share screen: caption + post
     ════════════════════════════════════════════════════════════ */
  await page.click('[data-act="go-share"]');
  await linger();

  await humanType(page,
    "textarea[data-input='caption']",
    "designed this in-app in 2 mins ✨  no Canva needed.",
    46);
  await linger();

  await page.click('[data-act="post-it"]');
  await breath(); // posted — big reveal moment

  /* ════════════════════════════════════════════════════════════
     SCENE 17 — Feed: post live, like it
     ════════════════════════════════════════════════════════════ */
  await linger();
  const likeBtn = page.locator('[data-act="like"]').first();
  if (await likeBtn.count() > 0) {
    await likeBtn.click();
    await linger();  // heart burst
  }
  await breath(); // final hold — viewer sees the finished post in feed

  /* ── wrap up ─────────────────────────────────────────────── */
  await context.close();
  await browser.close();

  // Pick the most recently-modified .webm (Playwright names them by hash).
  const files = fs.readdirSync(outDir)
    .filter(f => f.endsWith(".webm") && f !== "demo.webm")
    .map(f => ({ f, m: fs.statSync(path.join(outDir, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m);
  if (files.length > 0) {
    const src  = path.join(outDir, files[0].f);
    const dest = path.join(outDir, "demo.webm");
    fs.renameSync(src, dest);
    console.log("\n✅  Recording saved →", dest);
    console.log("    Viewport: 390×844 (iPhone 14) @ 2x DPR\n");
  } else {
    console.warn("⚠️  No .webm found in", outDir);
  }
}

main().catch(err => {
  console.error("Recording failed:", err);
  process.exit(1);
});
