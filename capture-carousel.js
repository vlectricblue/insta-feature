/**
 * Capture crisp phone-screen frames for the PDF carousel.
 *
 * Drives the prototype to each feature state and screenshots the phone
 * (the .phone-bezel element) at 2× retina. One PNG per scene.
 *
 * Output: carousel-frames/NN-slug.png
 * Usage:  node capture-carousel.js   (needs local server on :8000)
 */
const { chromium } = require("playwright");
const path = require("path");
const fs   = require("fs");

const URL = process.env.DEMO_URL || "http://127.0.0.1:8000/index.html";
const OUT = path.join(__dirname, "carousel-frames");
const wait = (ms) => new Promise(r => setTimeout(r, ms));

/* Run a function in page context against the app's global `state` + render().
   For static screenshots we also force every canvas to auto-fit (the live
   editor canvas normally opts out of fit so it doesn't fight typing). */
async function setState(page, fn) {
  await page.evaluate(fn);
  await wait(300);
  await page.evaluate(() => {
    // Drop contenteditable so the editor canvas participates in fitCanvasText.
    document.querySelectorAll(".canvas-text[contenteditable]")
      .forEach(el => el.removeAttribute("contenteditable"));
    if (typeof fitCanvasText === "function") fitCanvasText();
  });
  await wait(400); // let fit + fonts settle
}

async function shoot(page, name) {
  const el = await page.$(".phone-bezel");
  await el.screenshot({ path: path.join(OUT, name) });
  console.log("  ✓", name);
}

/* Scroll a scroll-container inside the app (e.g. .comp-panel) by px. */
async function scrollPanel(page, selector, top) {
  await page.evaluate(({ s, t }) => {
    const el = document.querySelector(s);
    if (el) el.scrollTop = t;
  }, { s: selector, t: top });
  await wait(450);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  // clean old frames
  for (const f of fs.readdirSync(OUT)) if (f.endsWith(".png")) fs.unlinkSync(path.join(OUT, f));

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 460, height: 940 },
    deviceScaleFactor: 3, // crisp retina frames
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: `.tw-fab,.tw-panel{display:none!important}` });
  await wait(900);

  console.log("Capturing frames…");

  /* 1 — Home feed */
  await setState(page, () => { state.screen = "home"; render(); });
  await shoot(page, "01-home.png");

  /* 2 — Designer with a fresh headline */
  await setState(page, () => {
    const tpl = TEMPLATES.find(t => t.id === "dawn") || TEMPLATES[0];
    state.cards = [ makeCard(tpl, { text: "Consistency beats motivation.\nShow up when no one's clapping." }) ];
    state.activeCardIdx = 0;
    state.aspect = "4:5";
    state.screen = "composer";
    state.tab = "design";
    render();
  });
  await shoot(page, "02-designer.png");

  /* 3 — Templates overlay (browse all) */
  await setState(page, () => { state.templatesOverlay = true; render(); });
  await shoot(page, "03-templates.png");
  await setState(page, () => { state.templatesOverlay = false; render(); });

  /* 4 — Typography: bold sans, large */
  await setState(page, () => {
    const c = state.cards[0];
    c.overrides = { ...c.overrides, font: "'Archivo Black', sans-serif", fontWeight: 900, fontSize: 38, color: "#0a0a0a" };
    render();
  });
  await shoot(page, "04-typography.png");

  /* 5 — Photo background @ 75% opacity */
  await setState(page, () => {
    const c = state.cards[0];
    c.overrides = {
      ...c.overrides,
      bgImage: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=900&q=80",
      bgImageOpacity: 0.75,
      bgImageDim: 0,
      color: "#0a0a0a",
    };
    render();
  });
  await shoot(page, "05-photo-bg.png");

  /* 6 — AI directions grid */
  await setState(page, () => {
    state.tab = "ai";
    state.aiInput = "Healing isn't linear, and that's okay. You can be soft and strong at the same time.";
    state.aiThreadMode = false;
    state.aiState = "results";
    state.aiResults = ["healing","broadsheet","drive","verse","indie","zine"]
      .filter(id => TEMPLATES.find(t => t.id === id))
      .slice(0, 6);
    if (state.aiResults.length < 6) {
      const extra = TEMPLATES.map(t => t.id).filter(id => !state.aiResults.includes(id));
      state.aiResults = state.aiResults.concat(extra).slice(0, 6);
    }
    render();
  });
  // scroll the panel so the 6-direction results grid is in frame
  await scrollPanel(page, ".comp-panel", 320);
  await shoot(page, "06-ai-directions.png");

  /* 7 — Carousel card stack (3 slides) */
  await setState(page, () => {
    const tpl = TEMPLATES.find(t => t.id === "broadsheet") || TEMPLATES[0];
    const lines = [
      "Healing isn't linear, and that's okay.",
      "You can be soft and strong at the same time.",
      "Rest is not giving up — it's a strategic pause so you can move better.",
    ];
    state.cards = lines.map((t,i) => makeCard(tpl, { text: t, isCover: i===0 }));
    state.activeCardIdx = 0;
    state.cohesion = "family";
    state.aspect = "4:5";
    state.screen = "composer";
    state.tab = "design";
    render();
  });
  await shoot(page, "07-carousel-stack.png");

  /* 8 — Feed preview (carousel post live) */
  await setState(page, () => {
    state.screen = "feed";
    state.previewMode = true;
    render();
  });
  await shoot(page, "08-feed-preview.png");

  /* 9 — Posted to feed, liked */
  await setState(page, () => {
    state.caption = "designed this in-app in 2 mins ✨  no Canva needed.";
    state.previewMode = false;
    state.posted = true;
    state.feedLiked = true;
    state.screen = "feed";
    render();
  });
  await shoot(page, "09-posted.png");

  await browser.close();
  console.log("Done. Frames in", OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
