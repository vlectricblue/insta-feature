/* ─────────────────────────────────────────────────────────────
   TEMPLATES — 24 designs across 6 persona "worlds".
   Each template is a recipe that renders to .canvas-stage.
   ───────────────────────────────────────────────────────────── */

window.CATEGORIES = [
  { id: "healing",  label: "Healing & Affirmations", blurb: "Soft, embodied, gentle" },
  { id: "drive",    label: "Daily Drive",            blurb: "Bold, contrasty, push" },
  { id: "indie",    label: "Independent Business",    blurb: "Warm, hand-crafted, local" },
  { id: "news",     label: "News & Notebook",         blurb: "Reported, considered, sharp" },
  { id: "zine",     label: "Risograph & Zine",        blurb: "Raw, off-register, DIY" },
  { id: "verse",    label: "Pages & Verse",           blurb: "Quiet, literary, sparse" },
];

/* helper: build a CSS gradient or solid */
const solid = (c) => c;
const linear = (deg, ...stops) => `linear-gradient(${deg}deg, ${stops.join(", ")})`;
const radial = (pos, ...stops) => `radial-gradient(${pos}, ${stops.join(", ")})`;

/* small SVGs used as decoration */
const SVG = {
  dot: (color, size = 8) => `<span class="deco-dot" style="width:${size}px;height:${size}px;background:${color}"></span>`,
  hr: (color) => `<span class="deco-hr" style="background:${color}"></span>`,
  starSmall: (color) => `<svg viewBox="0 0 20 20" width="14" height="14" fill="${color}" style="opacity:.85"><path d="M10 0l2 7h7l-5.7 4.2L15.5 19 10 14.8 4.5 19 6.7 11.2 1 7h7z"/></svg>`,
  sunArc: (color) => `<svg viewBox="0 0 200 100" width="100%" height="80" preserveAspectRatio="none" style="display:block"><path d="M0 100 A100 100 0 0 1 200 100" fill="${color}"/></svg>`,
  breathRing: (color) => `<svg viewBox="0 0 200 200" width="180" height="180" style="opacity:.45"><circle cx="100" cy="100" r="80" fill="none" stroke="${color}" stroke-width="1"/><circle cx="100" cy="100" r="60" fill="none" stroke="${color}" stroke-width="1"/><circle cx="100" cy="100" r="40" fill="none" stroke="${color}" stroke-width="1"/></svg>`,
  quoteMark: (color) => `<svg viewBox="0 0 80 80" width="64" height="64" fill="${color}" style="opacity:.85"><path d="M22 14c-7 4-13 11-13 22v30h22V38H18c0-7 4-13 10-16zm36 0c-7 4-13 11-13 22v30h22V38H54c0-7 4-13 10-16z"/></svg>`,
  cornerTL: (color) => `<svg viewBox="0 0 40 40" width="28" height="28" style="position:absolute;top:14px;left:14px"><path d="M2 14V2h12" stroke="${color}" stroke-width="1.5" fill="none"/></svg>`,
  cornerTR: (color) => `<svg viewBox="0 0 40 40" width="28" height="28" style="position:absolute;top:14px;right:14px"><path d="M26 2h12v12" stroke="${color}" stroke-width="1.5" fill="none"/></svg>`,
  cornerBL: (color) => `<svg viewBox="0 0 40 40" width="28" height="28" style="position:absolute;bottom:14px;left:14px"><path d="M2 26v12h12" stroke="${color}" stroke-width="1.5" fill="none"/></svg>`,
  cornerBR: (color) => `<svg viewBox="0 0 40 40" width="28" height="28" style="position:absolute;bottom:14px;right:14px"><path d="M26 38h12V26" stroke="${color}" stroke-width="1.5" fill="none"/></svg>`,
  brushStroke: () => `<svg viewBox="0 0 400 60" width="80%" height="40"><path d="M5 30 C 100 5, 200 55, 395 25" stroke="#1d2233" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/></svg>`,
  tape: (color, rotate = 0) => `<span class="deco-tape" style="background:${color};transform:rotate(${rotate}deg)"></span>`,
  stamp: (color, text) => `<span class="deco-stamp" style="color:${color};border-color:${color}">${text}</span>`,
  scribble: (color) => `<svg viewBox="0 0 120 40" width="120" height="40" style="opacity:.9"><path d="M5 25 Q 25 5, 40 25 T 75 25 T 115 25" stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
};

window.TEMPLATES = [
  /* ── HEALING & AFFIRMATIONS ─────────────────────────────── */
  {
    id: "linen", name: "Soft Linen", cat: "healing",
    seed: "rest is\nproductive.",
    handle: "@soft.somatics",
    recipe: {
      bg: "#f5ecdf",
      noise: true,
      font: "'Fraunces', serif", fontStyle: "italic", fontWeight: 500,
      fontSize: 44, lineHeight: 1.15, letterSpacing: "-0.5px",
      color: "#5a4634",
      align: "center", justify: "center",
      padding: [56, 40, 60, 40],
      deco: { center: SVG.dot("#c08667", 10) + `<div style="height:24px"></div>` },
      decoPlace: "above",
      wm: { color: "#b09076", weight: 400, family: "'Fraunces', serif", italic: true, size: 13 },
    }
  },
  {
    id: "sage", name: "Sage Breath", cat: "healing",
    seed: "you are\nallowed to\ntake up space",
    handle: "@quiet.therapy",
    recipe: {
      bg: linear(170, "#cdd6c4", "#aab59a"),
      font: "'Lora', serif", fontWeight: 500, fontStyle: "italic",
      fontSize: 36, lineHeight: 1.25, letterSpacing: "-0.2px",
      color: "#2e3a2a",
      align: "center", justify: "center",
      padding: [40, 40, 60, 40],
      deco: { bg: `<div class="deco-abs deco-center">${SVG.breathRing("#3d4d36")}</div>` },
      wm: { color: "#3d4d36", weight: 500, family: "'Lora', serif", size: 12, letterSpacing: "2px", upper: true },
    }
  },
  {
    id: "dawn", name: "Dawn Blush", cat: "healing",
    seed: "healing\nisn't linear—\nand that's okay.",
    handle: "@morning.notes",
    recipe: {
      bg: linear(160, "#f6d4bd", "#eaa088 70%", "#d77a72"),
      font: "'DM Serif Display', serif", fontWeight: 400, fontStyle: "italic",
      fontSize: 40, lineHeight: 1.18, letterSpacing: "-0.3px",
      color: "#fff8f1",
      align: "center", justify: "center",
      padding: [50, 36, 80, 36],
      deco: { bottom: `<div class="deco-abs" style="left:0;right:0;bottom:0;height:80px;overflow:hidden">${SVG.sunArc("#fff8f1")}</div>` },
      wm: { color: "rgba(255,248,241,.85)", weight: 400, family: "'DM Serif Display', serif", italic: true, size: 13 },
    }
  },
  {
    id: "midnight", name: "Midnight Quiet", cat: "healing",
    seed: "softness\nis its own kind\nof strength.",
    handle: "@night.therapist",
    recipe: {
      bg: radial("circle at 50% 30%", "#1a2540", "#0a1020 70%"),
      font: "'Cormorant Garamond', serif", fontWeight: 500, fontStyle: "italic",
      fontSize: 38, lineHeight: 1.22, letterSpacing: "-0.2px",
      color: "#f3ebd9",
      align: "center", justify: "center",
      padding: [60, 36, 60, 36],
      deco: { above: `<div style="margin-bottom:24px">${SVG.starSmall("#f3ebd9")}</div>` },
      decoPlace: "above",
      wm: { color: "#cdb98e", weight: 500, family: "'Cormorant Garamond', serif", italic: true, size: 13 },
    }
  },

  /* ── DAILY DRIVE ────────────────────────────────────────── */
  {
    id: "caution", name: "Caution Yellow", cat: "drive",
    seed: "DO\nHARD\nTHINGS",
    handle: "@daily.drive",
    recipe: {
      bg: "#0a0a0a",
      font: "'Anton', sans-serif", fontWeight: 400,
      fontSize: 64, lineHeight: 0.94, letterSpacing: "-1px",
      color: "#ffd60a",
      align: "left", justify: "center",
      textTransform: "uppercase",
      padding: [40, 28, 40, 28],
      deco: { below: `<div class="deco-hr" style="height:6px;background:#ffd60a;width:80px;margin-top:18px"></div>` },
      wm: { color: "#ffd60a", weight: 700, family: "'Space Grotesk', sans-serif", size: 12, letterSpacing: "3px", upper: true },
    }
  },
  {
    id: "sunset", name: "Sunset Push", cat: "drive",
    seed: "CONSISTENCY\nBEATS\nMOTIVATION.",
    handle: "@coach.kavya",
    recipe: {
      bg: linear(160, "#ff5e3a", "#ff2a68 60%", "#a8138a"),
      font: "'Bebas Neue', sans-serif", fontWeight: 400,
      fontSize: 48, lineHeight: 1.02, letterSpacing: "1px",
      color: "#fff",
      align: "center", justify: "center",
      padding: [50, 24, 70, 24],
      deco: { below: `<div class="deco-hr" style="height:2px;background:#fff;width:60%;margin:22px auto 0"></div>` },
      wm: { color: "rgba(255,255,255,.9)", weight: 700, family: "'Bebas Neue', sans-serif", size: 14, letterSpacing: "4px" },
    }
  },
  {
    id: "court", name: "Court Red", cat: "drive",
    seed: "YOUR\nFUTURE\nSELF IS\nWATCHING.",
    handle: "@move.with.mira",
    recipe: {
      bg: "#c2261f",
      font: "'Archivo Black', sans-serif", fontWeight: 900,
      fontSize: 32, lineHeight: 1.08, letterSpacing: "-0.5px",
      color: "#fff8eb",
      align: "left", justify: "center",
      padding: [40, 28, 50, 28],
      deco: { above: `<div style="display:flex;gap:6px;margin-bottom:14px"><span style="display:block;width:48px;height:8px;background:#fff8eb"></span><span style="display:block;width:14px;height:8px;background:#fff8eb"></span></div>` },
      decoPlace: "above",
      wm: { color: "#fff8eb", weight: 700, family: "'Space Grotesk', sans-serif", size: 11, letterSpacing: "3px", upper: true },
    }
  },
  {
    id: "peak", name: "Peak Light", cat: "drive",
    seed: "SHOW UP—\neven when no\none's clapping.",
    handle: "@trail.thoughts",
    recipe: {
      bg: "#0a0a0a",
      bgImage: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=900&q=80",
      bgOverlay: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.85) 100%)",
      font: "'Archivo Black', sans-serif", fontWeight: 900,
      fontSize: 38, lineHeight: 1.1, letterSpacing: "-0.4px",
      color: "#fff",
      align: "left", justify: "bottom",
      padding: [40, 32, 60, 32],
      wm: { color: "#fff", weight: 600, family: "'Space Grotesk', sans-serif", size: 12, letterSpacing: "2px", upper: true },
    }
  },

  /* ── INDEPENDENT BUSINESS ───────────────────────────────── */
  {
    id: "chalk", name: "Cafe Chalkboard", cat: "indie",
    seed: "fresh batch\njust out of\nthe oven ☕",
    handle: "@lemon.tree.cafe",
    recipe: {
      bg: "#1f2e26",
      texture: "chalk",
      font: "'Caveat', cursive", fontWeight: 700,
      fontSize: 56, lineHeight: 1.05, letterSpacing: "0px",
      color: "#f7efd8",
      align: "center", justify: "center",
      padding: [50, 36, 60, 36],
      deco: { below: `<div style="margin:8px auto 0">${SVG.scribble("#f7efd8")}</div>` },
      wm: { color: "#f7efd8", weight: 700, family: "'Caveat', cursive", size: 22 },
    }
  },
  {
    id: "plum", name: "Salon Plum", cat: "indie",
    seed: "NEW SERVICES\n— dropping —\nFRIDAY",
    handle: "@plum.studio",
    recipe: {
      bg: "#3a1c40",
      font: "'Playfair Display', serif", fontWeight: 700, fontStyle: "italic",
      fontSize: 36, lineHeight: 1.18, letterSpacing: "0.5px",
      color: "#d8b06d",
      align: "center", justify: "center",
      padding: [50, 38, 60, 38],
      deco: {
        bg: `<div class="deco-abs">${SVG.cornerTL("#d8b06d")}${SVG.cornerTR("#d8b06d")}${SVG.cornerBL("#d8b06d")}${SVG.cornerBR("#d8b06d")}</div>`
      },
      wm: { color: "#d8b06d", weight: 400, family: "'Playfair Display', serif", italic: true, size: 12, letterSpacing: "3px", upper: true },
    }
  },
  {
    id: "bakery", name: "Bakery Window", cat: "indie",
    seed: "open today\n9 am — until\nthe trays are\nempty.",
    handle: "@daughter.bakes",
    recipe: {
      bg: "#faf2e4",
      bgImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80",
      bgImageInset: { top: 0, height: "44%" },
      font: "'Lora', serif", fontWeight: 500, fontStyle: "italic",
      fontSize: 32, lineHeight: 1.25, letterSpacing: "-0.2px",
      color: "#5c3b1f",
      align: "center", justify: "bottom",
      padding: [220, 36, 50, 36],
      deco: { below: `<div style="margin-top:14px;font:600 11px/1 'Space Grotesk',sans-serif;letter-spacing:3px;color:#a07a4d">— EST. 2021 —</div>` },
      wm: { color: "#a07a4d", weight: 500, family: "'Lora', serif", italic: true, size: 13 },
    }
  },
  {
    id: "kraft", name: "Kraft Stamp", cat: "indie",
    seed: "BATCH NO. 042\nshipped with\nthe usual care.",
    handle: "@small.batch.co",
    recipe: {
      bg: "#d9be8e",
      texture: "kraft",
      font: "'IBM Plex Mono', monospace", fontWeight: 500,
      fontSize: 22, lineHeight: 1.4, letterSpacing: "0.5px",
      color: "#3a2a18",
      align: "left", justify: "center",
      padding: [40, 36, 60, 36],
      deco: {
        above: SVG.stamp("#7a4a2a", "HANDMADE"),
      },
      decoPlace: "above",
      wm: { color: "#7a4a2a", weight: 700, family: "'IBM Plex Mono', monospace", size: 11, letterSpacing: "3px", upper: true },
    }
  },

  /* ── NEWS & NOTEBOOK ────────────────────────────────────── */
  {
    id: "broadsheet", name: "Broadsheet", cat: "news",
    seed: "Three things\nworth your\nattention today.",
    handle: "@nita.beat",
    recipe: {
      bg: "#ffffff",
      font: "'Playfair Display', serif", fontWeight: 900,
      fontSize: 40, lineHeight: 1.08, letterSpacing: "-0.6px",
      color: "#0d0d0d",
      align: "left", justify: "center",
      padding: [44, 32, 50, 32],
      deco: {
        above: `<div style="font:700 11px/1 'Space Grotesk',sans-serif;letter-spacing:2.5px;color:#b8231f;margin-bottom:18px">— FILED · MAY 17 —</div>`,
        below: `<div style="height:3px;width:48px;background:#b8231f;margin-top:24px"></div>`,
      },
      decoPlace: "above",
      wm: { color: "#666", weight: 600, family: "'Space Grotesk', sans-serif", size: 11, letterSpacing: "2px", upper: true },
    }
  },
  {
    id: "analysis", name: "Analysis Bar", cat: "news",
    seed: "What the new\npolicy actually\ndoes—and what\nit doesn't.",
    handle: "@policy.desk",
    recipe: {
      bg: "#fafafa",
      font: "'Playfair Display', serif", fontWeight: 700,
      fontSize: 32, lineHeight: 1.18, letterSpacing: "-0.3px",
      color: "#0a0a0a",
      align: "left", justify: "center",
      padding: [80, 28, 50, 28],
      deco: {
        bg: `<div style="position:absolute;top:0;left:0;right:0;height:46px;background:#0a0a0a;display:flex;align-items:center;padding:0 22px;color:#fff;font:700 12px/1 'Space Grotesk',sans-serif;letter-spacing:3px;">ANALYSIS · 4 MIN READ</div>`,
        below: `<div style="font:500 12px/1.4 'Lora',serif;font-style:italic;color:#666;margin-top:20px;border-top:1px solid #ddd;padding-top:14px">By the desk · Read in app →</div>`,
      },
      wm: { color: "#0a0a0a", weight: 700, family: "'Space Grotesk', sans-serif", size: 11, letterSpacing: "2px", upper: true },
    }
  },
  {
    id: "pullquote", name: "Pull Quote", cat: "news",
    seed: "The numbers\ntell a different\nstory than the\npress release.",
    handle: "@field.notes",
    recipe: {
      bg: "#ecebe5",
      font: "'Cormorant Garamond', serif", fontWeight: 500, fontStyle: "italic",
      fontSize: 32, lineHeight: 1.25, letterSpacing: "-0.2px",
      color: "#1c1c1c",
      align: "left", justify: "center",
      padding: [54, 32, 70, 32],
      deco: {
        above: `<div style="margin-bottom:12px">${SVG.quoteMark("#1c1c1c")}</div>`,
        below: `<div style="margin-top:24px;font:700 11px/1 'Space Grotesk',sans-serif;letter-spacing:3px;color:#666">— ON THE RECORD</div>`,
      },
      decoPlace: "above",
      wm: { color: "#666", weight: 600, family: "'Space Grotesk', sans-serif", size: 11, letterSpacing: "2px", upper: true },
    }
  },
  {
    id: "data", name: "Data Card", cat: "news",
    seed: "47%\nincrease in fines\nlevied since 2024.",
    handle: "@market.beat",
    recipe: {
      bg: "#fdfcf8",
      gridLines: true,
      font: "'IBM Plex Mono', monospace", fontWeight: 500,
      fontSize: 24, lineHeight: 1.35, letterSpacing: "0px",
      color: "#0c0c0c",
      align: "left", justify: "center",
      padding: [56, 28, 50, 28],
      deco: {
        above: `<div style="font:700 11px/1 'IBM Plex Mono',monospace;letter-spacing:3px;color:#888;margin-bottom:14px">FIG. 04 · ENFORCEMENT DATA</div>`,
        below: `<div style="margin-top:30px;font:500 11px/1.5 'IBM Plex Mono',monospace;color:#888">Source: Ministry filings, FY24–25</div>`,
      },
      decoPlace: "above",
      bigNumber: true,
      wm: { color: "#0c0c0c", weight: 700, family: "'IBM Plex Mono', monospace", size: 11, letterSpacing: "2.5px", upper: true },
    }
  },

  /* ── RISOGRAPH & ZINE ───────────────────────────────────── */
  {
    id: "riso", name: "Riso Two-tone", cat: "zine",
    seed: "ISSUE\nNº 07",
    handle: "@riso.kid",
    recipe: {
      bg: "#f4ecdc",
      texture: "halftone",
      font: "'Archivo Black', sans-serif", fontWeight: 900,
      fontSize: 64, lineHeight: 0.96, letterSpacing: "-2px",
      color: "#ff4d8d",
      align: "left", justify: "center",
      textTransform: "uppercase",
      padding: [50, 24, 70, 24],
      deco: {
        bg: `<div class="deco-abs" style="top:auto;bottom:60px;left:32px;right:32px;height:3px;background:#2c4ea8"></div>`,
        below: `<div style="margin-top:16px;color:#2c4ea8;font:900 18px/1 'Archivo Black',sans-serif;letter-spacing:2px">PRINT IS NOT DEAD</div>`,
      },
      wm: { color: "#2c4ea8", weight: 900, family: "'Archivo Black', sans-serif", size: 11, letterSpacing: "3px", upper: true },
    }
  },
  {
    id: "photocopy", name: "Photocopy", cat: "zine",
    seed: "DIY\nOR\nDIE.",
    handle: "@xerox.dreams",
    recipe: {
      bg: "#ebe6dd",
      texture: "scratch",
      font: "'Archivo Black', sans-serif", fontWeight: 900,
      fontSize: 78, lineHeight: 0.92, letterSpacing: "-3px",
      color: "#0a0a0a",
      align: "center", justify: "center",
      textTransform: "uppercase",
      padding: [30, 20, 40, 20],
      deco: {
        bg: `<div class="deco-abs" style="top:18px;left:18px;font:700 10px/1.3 'IBM Plex Mono',monospace;color:#0a0a0a">FREE / TAKE ONE<br/>VOL. III</div>
             <div class="deco-abs" style="bottom:18px;right:18px;font:700 10px/1.3 'IBM Plex Mono',monospace;color:#0a0a0a;text-align:right">PHOTOCOPY<br/>QUARTERLY</div>`,
      },
      wm: { color: "#0a0a0a", weight: 700, family: "'IBM Plex Mono', monospace", size: 11, letterSpacing: "2px", upper: true },
    }
  },
  {
    id: "tape", name: "Tape & Marker", cat: "zine",
    seed: "field notes\nfrom the\nweekend.",
    handle: "@cut.paste.zine",
    recipe: {
      bg: "#e7dec5",
      texture: "kraft",
      font: "'Caveat', cursive", fontWeight: 700,
      fontSize: 58, lineHeight: 1.05, letterSpacing: "0px",
      color: "#1a1a1a",
      align: "left", justify: "center",
      padding: [70, 36, 70, 36],
      deco: {
        bg: `<span class="deco-tape" style="top:40px;left:-20px;width:140px;background:#ff7aa8;transform:rotate(-8deg)"></span>
             <span class="deco-tape" style="bottom:60px;right:-20px;width:120px;background:#7ab8ff;transform:rotate(12deg)"></span>`,
        below: `<div style="margin-top:14px">${SVG.scribble("#c2261f")}</div>`,
      },
      wm: { color: "#1a1a1a", weight: 700, family: "'Caveat', cursive", size: 22 },
    }
  },
  {
    id: "cutpaper", name: "Cut Paper", cat: "zine",
    seed: "the personal\nis political.",
    handle: "@collage.club",
    recipe: {
      bg: "#f4e8d0",
      font: "'Fraunces', serif", fontWeight: 600,
      fontSize: 44, lineHeight: 1.1, letterSpacing: "-0.5px",
      color: "#1a1a1a",
      align: "center", justify: "center",
      padding: [40, 36, 60, 36],
      deco: {
        bg: `<div class="deco-abs" style="top:38px;left:32px;width:80px;height:80px;background:#ff7a4d;transform:rotate(-6deg);box-shadow:4px 4px 0 #1a1a1a"></div>
             <div class="deco-abs" style="bottom:54px;right:24px;width:60px;height:60px;background:#3b6cd1;border-radius:50%;box-shadow:3px 3px 0 #1a1a1a"></div>
             <div class="deco-abs" style="top:50px;right:60px;width:36px;height:6px;background:#1a1a1a;transform:rotate(20deg)"></div>`,
      },
      wm: { color: "#1a1a1a", weight: 700, family: "'Fraunces', serif", size: 12, letterSpacing: "2px", upper: true },
    }
  },

  /* ── PAGES & VERSE ──────────────────────────────────────── */
  {
    id: "loneline", name: "Lone Line", cat: "verse",
    seed: "—and still,\nthe light\narrives.",
    handle: "@margin.notes",
    recipe: {
      bg: "#f7f1e6",
      font: "'Instrument Serif', serif", fontWeight: 400, fontStyle: "italic",
      fontSize: 44, lineHeight: 1.18, letterSpacing: "-0.4px",
      color: "#1d1a14",
      align: "center", justify: "center",
      padding: [80, 48, 100, 48],
      deco: {
        below: `<div style="margin-top:40px;font:400 12px/1 'Cormorant Garamond',serif;font-style:italic;color:#6b6457">— from the notebook</div>`,
      },
      wm: { color: "#6b6457", weight: 400, family: "'Instrument Serif', serif", italic: true, size: 13 },
    }
  },
  {
    id: "stanza", name: "Stanza", cat: "verse",
    seed: "i found grief\nin the kitchen,\nwashing dishes.\nshe stayed for tea.",
    handle: "@page.seven",
    recipe: {
      bg: "#f4ecdc",
      font: "'Cormorant Garamond', serif", fontWeight: 500, fontStyle: "italic",
      fontSize: 28, lineHeight: 1.4, letterSpacing: "0px",
      color: "#1d1a14",
      align: "left", justify: "center",
      padding: [60, 50, 70, 50],
      deco: {
        bg: `<div class="deco-abs" style="bottom:24px;right:24px;font:500 11px/1 'Cormorant Garamond',serif;color:#9a8e72">— 47 —</div>
             <div class="deco-abs" style="top:30px;left:24px;font:500 10px/1 'Space Grotesk',sans-serif;letter-spacing:3px;color:#9a8e72">CH. III</div>`,
      },
      wm: { color: "#9a8e72", weight: 500, family: "'Cormorant Garamond', serif", italic: true, size: 13 },
    }
  },
  {
    id: "inkwash", name: "Ink Wash", cat: "verse",
    seed: "between\ntwo silences,\na sentence.",
    handle: "@brush.and.ink",
    recipe: {
      bg: linear(160, "#e8e3d6", "#cdc4b0"),
      font: "'DM Serif Display', serif", fontStyle: "italic",
      fontSize: 42, lineHeight: 1.18, letterSpacing: "-0.3px",
      color: "#1d2233",
      align: "center", justify: "center",
      padding: [60, 40, 80, 40],
      deco: {
        above: `<div style="margin-bottom:14px">${SVG.brushStroke()}</div>`,
        below: `<div style="margin-top:14px">${SVG.brushStroke()}</div>`,
      },
      decoPlace: "above",
      wm: { color: "#1d2233", weight: 400, family: "'DM Serif Display', serif", italic: true, size: 13 },
    }
  },
  {
    id: "letterpress", name: "Letterpress", cat: "verse",
    seed: "Chapter 7:\nThe smallest\nvictories.",
    handle: "@bound.in.linen",
    recipe: {
      bg: "#efe9dc",
      texture: "linen",
      font: "'Playfair Display', serif", fontWeight: 900,
      fontSize: 40, lineHeight: 1.12, letterSpacing: "-0.5px",
      color: "#1a1410",
      align: "left", justify: "center",
      padding: [54, 38, 56, 38],
      textShadow: "1px 1px 0 rgba(255,255,255,.6)",
      deco: {
        above: `<div style="font:700 11px/1 'IBM Plex Mono',monospace;letter-spacing:4px;color:#6b5b3a;margin-bottom:24px">— PRESS PROOF · NO. 12 —</div>`,
        below: `<div style="height:1px;width:60%;background:#6b5b3a;opacity:.4;margin-top:30px"></div>`,
      },
      decoPlace: "above",
      wm: { color: "#6b5b3a", weight: 700, family: "'IBM Plex Mono', monospace", size: 11, letterSpacing: "3px", upper: true },
    }
  },
];

/* group templates by category for the gallery */
window.TEMPLATES_BY_CAT = window.CATEGORIES.reduce((acc, c) => {
  acc[c.id] = window.TEMPLATES.filter(t => t.cat === c.id);
  return acc;
}, {});
