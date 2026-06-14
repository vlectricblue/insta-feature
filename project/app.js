/* ─────────────────────────────────────────────────────────────
   Instagram Post Design Studio — in-app post & carousel creator
   Single-shot vanilla JS. Renders into #app via innerHTML.
   ───────────────────────────────────────────────────────────── */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const nl2br = (s) => esc(s).replace(/\n/g, "<br/>");

/* ── icons (Instagram-ish) ─────────────────────────────────── */
const ICON = {
  close:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chevDn:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
  chevUp:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>',
  chevR:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>',
  flash:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/><path d="M3 3l18 18" stroke-linecap="round"/></svg>',
  gear:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1A2 2 0 113.4 17l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H2a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H8a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
  Aa:      '<svg viewBox="0 0 24 24" fill="currentColor"><text x="3" y="18" font-family="serif" font-weight="700" font-size="18">A</text><text x="13" y="20" font-family="serif" font-weight="400" font-size="13">a</text></svg>',
  infinity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 12c0-2.5 2-4 4-4s3 1.5 4 3 2 3 4 3 4-1.5 4-4-2-4-4-4-3 1.5-4 3-2 3-4 3-4-1.5-4-4z" transform="scale(.8) translate(2,1)"/></svg>',
  layout:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 3v18M3 12h9"/></svg>',
  sticker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5"/><path d="M16 6l1 1M19 5l.5.5" stroke-linecap="round"/></svg>',
  flip:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 0115-6.7L21 8M21 12a9 9 0 01-15 6.7L3 16M3 3v5h5M21 21v-5h-5"/></svg>',
  heart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.4 8.4 0 01-1 4 8.5 8.5 0 01-7.5 4.5 8.4 8.4 0 01-4-1L3 21l2-5.5a8.5 8.5 0 113.5 11.5z" transform="scale(.95) translate(.5,0)"/></svg>',
  share:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  save:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>',
  more:    '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>',
  undo:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7v6h6M3 13a9 9 0 0115 0"/></svg>',
  redo:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 7v6h-6M21 13a9 9 0 00-15 0"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z"/><path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z" opacity=".7"/></svg>',
  verify:  '<svg viewBox="0 0 24 24" fill="#3897f0"><path d="M12 2l2.5 1.5L17 3l1.5 2.5L21 7l-.5 2.5L22 12l-1.5 2.5.5 2.5-2.5 1.5L17 21l-2.5-.5L12 22l-2.5-1.5L7 21l-1.5-2.5L3 17l.5-2.5L2 12l1.5-2.5L3 7l2.5-1.5L7 3l2.5.5z"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  home:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z"/></svg>',
  reels:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 3l3 6 3-6M10 13.5l5 2.5-5 2.5z" fill="currentColor"/></svg>',
  paperplane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21.5 2.5L2 11l8 2 2 8 9.5-18.5zM10 13l6-6"/></svg>',
  search:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>',
  shop:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7l1.5-3h9L18 7M3 7h18l-1.5 13a2 2 0 0 1-2 1.8H6.5a2 2 0 0 1-2-1.8L3 7zM9 11v2a3 3 0 0 0 6 0v-2"/></svg>',
  align: {
    left:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h12M3 18h15"/></svg>',
    center:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M6 12h12M5 18h14"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M9 12h12M6 18h15"/></svg>',
  },
};

/* ── STATE ─────────────────────────────────────────────────── */
const initialT = TEMPLATES.find(t => t.id === "dawn"); // start with Dawn Blush — warm + serif

let _cardIdSeed = 1;
function makeCard(template, opts = {}) {
  return {
    id: _cardIdSeed++,
    templateId: template.id,
    text: opts.text != null ? opts.text : template.seed,
    overrides: opts.overrides ? JSON.parse(JSON.stringify(opts.overrides)) : {},
    textOffset: opts.textOffset ? { ...opts.textOffset } : { x: 0, y: 0 },
    stickers: opts.stickers ? JSON.parse(JSON.stringify(opts.stickers)) : [],
    isCover: !!opts.isCover,
  };
}

const state = {
  screen: "home",         // home | composer | share | feed
  createSheetOpen: false,
  posted: false,
  previewMode: false,     // composer → feed live preview
  templatesOverlay: false,// full template browser overlay
  mode: "STORY",
  tab: "design",          // design | ai

  /* ── shared across the whole thread ── */
  handle: initialT.handle,
  showWatermark: true,
  aspect: "4:5",          // 1:1 | 4:5 | 9:16
  caption: "",

  /* ── thread of cards ── */
  cards: [makeCard(initialT)],
  activeCardIdx: 0,
  cohesion: "free",       // Brand Kit sync: free | family | locked
  autoNumber: false,      // slide numbering on a carousel

  /* AI */
  aiInput: "",
  aiState: "idle",
  aiResults: [],
  aiSelected: null,
  aiThreadMode: false,    // AI carousel mode: split text into designed slides

  /* tweaks */
  tweaks: {
    appTheme: "dark",
    density: "comfortable",   // comfortable | pro
    artDirection: "editorial",// editorial | bold | playful
    brandPalette: "sand",     // sand | ink | bloom | forest
    aiIntensity: "balanced",  // subtle | balanced | bold
    aiVibe: "particles",
  },

  /* history */
  history: [], hindex: -1,

  /* feed */
  feedLiked: false,
  feedReactions: 0,
};

/* Accessors — these proxy onto the active card so the rest of the
   code base can keep using state.template/text/overrides/etc. */
["template","text","overrides","textOffset","stickers"].forEach(prop => {
  Object.defineProperty(state, prop, {
    enumerable: true, configurable: true,
    get() {
      const c = state.cards[state.activeCardIdx];
      if (!c) return undefined;
      if (prop === "template") return TEMPLATES.find(t => t.id === c.templateId) || TEMPLATES[0];
      return c[prop];
    },
    set(v) {
      const c = state.cards[state.activeCardIdx];
      if (!c) return;
      if (prop === "template") c.templateId = v.id;
      else c[prop] = v;
    },
  });
});

/* ── thread operations ─────────────────────────────────────── */
function addCard(opts = {}) {
  if (state.cards.length >= 10) return;
  // base new card on the active card so style continuity feels right
  const a = state.cards[state.activeCardIdx];
  const baseTemplate = TEMPLATES.find(t => t.id === a.templateId) || initialT;
  const useTemplate = opts.template || baseTemplate;
  const newCard = makeCard(useTemplate, {
    text: opts.text != null ? opts.text : "",
    overrides: state.cohesion === "free" ? {} : a.overrides,
  });
  state.cards.push(newCard);
  state.activeCardIdx = state.cards.length - 1;
  pushHistory();
  render();
}
function removeCard(idx) {
  if (state.cards.length <= 1) return;
  state.cards.splice(idx, 1);
  if (state.activeCardIdx >= state.cards.length) state.activeCardIdx = state.cards.length - 1;
  if (state.activeCardIdx < 0) state.activeCardIdx = 0;
  pushHistory();
  render();
}
function duplicateCard(idx) {
  if (state.cards.length >= 10) return;
  const src = state.cards[idx];
  const tpl = TEMPLATES.find(t => t.id === src.templateId) || initialT;
  const copy = makeCard(tpl, src);
  state.cards.splice(idx + 1, 0, copy);
  state.activeCardIdx = idx + 1;
  pushHistory();
  render();
}
function setActiveCard(idx) {
  if (idx < 0 || idx >= state.cards.length) return;
  state.activeCardIdx = idx;
  render();
}
function moveCard(from, to) {
  if (from === to || from < 0 || to < 0 || from >= state.cards.length || to >= state.cards.length) return;
  const [c] = state.cards.splice(from, 1);
  state.cards.splice(to, 0, c);
  state.activeCardIdx = to;
  pushHistory();
  render();
}
function toggleCover(idx) {
  // only first card can be a cover
  if (idx !== 0) return;
  state.cards[0].isCover = !state.cards[0].isCover;
  pushHistory();
  render();
}
function applyToAllCards(patch) {
  state.cards.forEach((c, i) => {
    if (patch.templateId !== undefined) c.templateId = patch.templateId;
    if (patch.overrides) c.overrides = { ...c.overrides, ...patch.overrides };
  });
}


function snapshot() {
  return JSON.parse(JSON.stringify({
    cards: state.cards,
    activeCardIdx: state.activeCardIdx,
    handle: state.handle, showWatermark: state.showWatermark, aspect: state.aspect,
    cohesion: state.cohesion, autoNumber: state.autoNumber,
  }));
}
function pushHistory() {
  applyCohesion();
  state.history = state.history.slice(0, state.hindex + 1);
  state.history.push(snapshot());
  state.hindex = state.history.length - 1;
}
function applyHistory(snap) {
  state.cards = JSON.parse(JSON.stringify(snap.cards));
  state.activeCardIdx = Math.min(snap.activeCardIdx, state.cards.length - 1);
  state.handle = snap.handle;
  state.showWatermark = snap.showWatermark;
  state.aspect = snap.aspect;
  state.cohesion = snap.cohesion || "free";
  state.autoNumber = !!snap.autoNumber;
}
function undo() {
  if (state.hindex > 0) { state.hindex--; applyHistory(state.history[state.hindex]); render(); }
}
function redo() {
  if (state.hindex < state.history.length - 1) { state.hindex++; applyHistory(state.history[state.hindex]); render(); }
}

/* ── PHOTO BACKGROUNDS (Stories-like image picker) ─────────── */
const PHOTO_BACKGROUNDS = [
  { id: "cafe",    label: "Cafe table",   url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80" },
  { id: "plants",  label: "Plants",       url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=900&q=80" },
  { id: "books",   label: "Books",        url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=900&q=80" },
  { id: "dawn",    label: "Mountain dawn",url: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=900&q=80" },
  { id: "beach",   label: "Beach",        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
  { id: "journal", label: "Journaling",   url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80" },
  { id: "marble",  label: "Marble",       url: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=900&q=80" },
  { id: "flowers", label: "Pink flowers", url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&q=80" },
];

/* ── STICKERS (animated SVG, GIF-like) ─────────────────────── */
const STICKERS = {
  sparkle: {
    label: "Sparkle",
    svg: `<svg viewBox="0 0 80 80" class="sticker-spin"><defs><radialGradient id="sp1" cx="50%" cy="50%"><stop offset="0%" stop-color="#fff8c4"/><stop offset="60%" stop-color="#ffd166"/><stop offset="100%" stop-color="#ff8a4d"/></radialGradient></defs><path fill="url(#sp1)" d="M40 4l6 22 22 14-22 14-6 22-6-22-22-14 22-14z"/></svg>`,
  },
  heart: {
    label: "Heart",
    svg: `<svg viewBox="0 0 80 80" class="sticker-pulse"><path fill="#ed4956" stroke="#fff" stroke-width="3" d="M40 70 L10 38 a16 16 0 0 1 30-9 a16 16 0 0 1 30 9 z"/></svg>`,
  },
  star: {
    label: "Twinkle",
    svg: `<svg viewBox="0 0 80 80" class="sticker-twinkle"><path fill="#ffd166" stroke="#1a1a1a" stroke-width="2" stroke-linejoin="round" d="M40 8l8 24 24 8-24 8-8 24-8-24-24-8 24-8z"/></svg>`,
  },
  smiley: {
    label: "Smile",
    svg: `<svg viewBox="0 0 80 80" class="sticker-bounce"><circle cx="40" cy="40" r="34" fill="#ffd84d" stroke="#1a1a1a" stroke-width="3"/><circle cx="28" cy="32" r="4" fill="#1a1a1a"/><circle cx="52" cy="32" r="4" fill="#1a1a1a"/><path d="M24 48 Q40 64, 56 48" fill="none" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/></svg>`,
  },
  fire: {
    label: "Fire",
    svg: `<svg viewBox="0 0 80 80" class="sticker-flicker"><path fill="#ff5e3a" stroke="#1a1a1a" stroke-width="2" d="M40 8 C 30 22, 22 28, 22 44 a18 18 0 0 0 36 0 C 58 32, 50 26, 46 14 C 44 22, 40 22, 40 8 z"/><path fill="#ffd166" d="M40 30 C 34 38, 32 42, 32 50 a8 8 0 0 0 16 0 C 48 44, 46 40, 44 36 C 42 40, 40 38, 40 30 z"/></svg>`,
  },
  flower: {
    label: "Flower",
    svg: `<svg viewBox="0 0 80 80" class="sticker-spin-slow"><g><circle cx="40" cy="14" r="10" fill="#ffb1c8"/><circle cx="66" cy="40" r="10" fill="#ffb1c8"/><circle cx="40" cy="66" r="10" fill="#ffb1c8"/><circle cx="14" cy="40" r="10" fill="#ffb1c8"/><circle cx="40" cy="40" r="10" fill="#ffd84d"/></g></svg>`,
  },
  speech: {
    label: "Talk",
    svg: `<svg viewBox="0 0 80 80" class="sticker-wobble"><path fill="#fff" stroke="#1a1a1a" stroke-width="3" d="M14 20 a8 8 0 0 1 8 -8 h36 a8 8 0 0 1 8 8 v24 a8 8 0 0 1 -8 8 H32 l-12 12 v-12 a8 8 0 0 1 -8 -8 z"/><text x="40" y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="14" fill="#1a1a1a">say it.</text></svg>`,
  },
  coffee: {
    label: "Coffee",
    svg: `<svg viewBox="0 0 80 80" class="sticker-bounce"><path d="M22 28 v18 a16 16 0 0 0 32 0 V28 z" fill="#7a4a2a" stroke="#1a1a1a" stroke-width="3"/><path d="M52 32 a8 8 0 0 1 0 16" fill="none" stroke="#1a1a1a" stroke-width="3"/><path class="sticker-steam" d="M30 16 Q 28 12, 30 8 M40 16 Q 38 12, 40 8 M50 16 Q 48 12, 50 8" stroke="#aaa" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  },
};

let _stickerIdSeed = 1;
function addSticker(type) {
  state.stickers.push({
    id: _stickerIdSeed++,
    type,
    x: 0, y: 0,
    scale: 1,
    rotate: (Math.random() - 0.5) * 16,
  });
  pushHistory();
  render();
}
function removeSticker(id) {
  state.stickers = state.stickers.filter(s => s.id !== id);
  pushHistory();
  render();
}

/* ── DERIVED ───────────────────────────────────────────────── */
function effectiveRecipe() {
  return { ...state.template.recipe, ...state.overrides };
}



/* ── CANVAS RENDERING ──────────────────────────────────────── */
function renderCanvas(t = state.template, opts = {}) {
  const r = opts.recipe || { ...t.recipe, ...(opts.useOverrides ? state.overrides : {}) };
  const text = opts.text != null ? opts.text : (opts.thumb ? t.seed : state.text);
  const handle = opts.handle != null ? opts.handle : state.handle;
  const showWm = opts.showWatermark != null ? opts.showWatermark : state.showWatermark;
  const offset = opts.offset || (opts.thumb ? { x:0, y:0 } : state.textOffset);
  const aspect = opts.aspect || (opts.thumb ? "1:1" : state.aspect);

  // background layer
  let bgLayer = "";
  const imgOpacity = (r.bgImageOpacity != null ? r.bgImageOpacity : 0.75);
  if (r.bgImage) {
    if (r.bgImageInset) {
      bgLayer += `<div class="canvas-bg" style="background:${r.bg}"></div>`;
      bgLayer += `<div class="canvas-bg-image" style="background-image:url('${r.bgImage}');background-size:cover;background-position:center;top:${r.bgImageInset.top||0};height:${r.bgImageInset.height||'100%'};left:0;right:0;position:absolute;opacity:${imgOpacity}"></div>`;
    } else {
      bgLayer += `<div class="canvas-bg" style="background:${r.bg}"></div>`;
      bgLayer += `<div class="canvas-bg-image" style="background-image:url('${r.bgImage}');background-size:cover;background-position:center;position:absolute;inset:0;opacity:${imgOpacity}"></div>`;
    }
    if (r.bgOverlay) bgLayer += `<div class="canvas-overlay" style="background:${r.bgOverlay}"></div>`;
    if (r.bgImageDim) bgLayer += `<div class="canvas-overlay" style="background:rgba(0,0,0,${r.bgImageDim})"></div>`;
  } else {
    bgLayer += `<div class="canvas-bg" style="background:${r.bg}"></div>`;
  }
  if (r.texture) bgLayer += `<div class="canvas-tex tex-${r.texture}"></div>`;
  if (r.gridLines) bgLayer += `<div class="canvas-grid"></div>`;
  if (r.noise) bgLayer += `<div class="canvas-noise"></div>`;

  // decoration layer (positioned with text or as background)
  let decoBg = (r.deco && r.deco.bg) || "";

  // text alignment / placement
  const align = r.align || "center";
  const justify = r.justify || "center";
  const pad = r.padding || [40, 32, 40, 32];

  const styleVars = [
    `--c-bg:${r.bg}`,
    `--c-color:${r.color}`,
    `--c-font:${r.font}`,
    `--c-weight:${r.fontWeight}`,
    `--c-size:${r.fontSize}px`,
    `--c-lh:${r.lineHeight}`,
    `--c-ls:${r.letterSpacing || "0"}`,
    `--c-style:${r.fontStyle || "normal"}`,
    `--c-tt:${r.textTransform || "none"}`,
    `--c-align:${align}`,
    `--c-justify:${justify === 'top' ? 'flex-start' : justify === 'bottom' ? 'flex-end' : 'center'}`,
    `--c-pad:${pad[0]}px ${pad[1]}px ${pad[2]}px ${pad[3]}px`,
    `--c-shadow:${r.textShadow || "none"}`,
  ].join(";");

  const decoAbove = r.deco && r.deco.above ? `<div class="deco-above">${r.deco.above}</div>` : "";
  const decoBelow = r.deco && r.deco.below ? `<div class="deco-below">${r.deco.below}</div>` : "";

  // text element (possibly editable + draggable in canvas-edit context)
  const editable = opts.editable ? `contenteditable="true" spellcheck="false"` : "";
  const draggable = opts.draggable ? `data-draggable="text"` : "";
  const dragStyle = (offset.x || offset.y) ? `transform:translate(${offset.x}px,${offset.y}px);` : "";

  // big number variant
  const isEmpty = !text || String(text).trim() === "";
  const displayText = isEmpty ? "Tap to write\u2026" : text;
  const placeholderCls = isEmpty ? " is-placeholder" : "";
  let textHtml;
  if (r.bigNumber && !isEmpty) {
    const [first, ...rest] = text.split("\n");
    textHtml = `<div class="canvas-text" style="${dragStyle}" ${draggable} ${editable}>
      <div style="font-size:96px;line-height:.95;font-weight:700">${nl2br(first)}</div>
      <div style="font-size:20px;margin-top:14px">${nl2br(rest.join("\n"))}</div>
    </div>`;
  } else {
    textHtml = `<div class="canvas-text${placeholderCls}" style="${dragStyle}" ${draggable} ${editable}>${nl2br(displayText)}</div>`;
  }

  // watermark
  let wmHtml = "";
  if (showWm && r.wm && handle) {
    const w = r.wm;
    const wmStyle = [
      `color:${w.color}`,
      `font-family:${w.family}`,
      `font-weight:${w.weight}`,
      `font-size:${w.size}px`,
      `font-style:${w.italic ? 'italic' : 'normal'}`,
      `letter-spacing:${w.letterSpacing || '0'}`,
    ].join(";");
    const handleText = w.upper ? handle.toUpperCase() : handle;
    wmHtml = `<div class="canvas-wm" style="${wmStyle}">${esc(handleText)}</div>`;
  }

  // aspect class
  const aspectCls = `aspect-${aspect.replace(":","x")}`;

  // stickers (only in editor & full-size renders, not thumbs)
  const stickers = opts.thumb ? [] : (opts.stickers != null ? opts.stickers : (state.stickers || []));
  const stickerHtml = stickers.map(s => {
    const def = STICKERS[s.type];
    if (!def) return "";
    const dragAttr = opts.draggable ? `data-draggable-sticker="${s.id}"` : "";
    return `<div class="canvas-sticker" ${dragAttr} style="transform:translate(${s.x}px,${s.y}px) scale(${s.scale}) rotate(${s.rotate}deg)">${def.svg}</div>`;
  }).join("");

  // auto-number badge (thread mode) — top-right
  const autoNumberHtml = opts.autoNumber
    ? `<div class="canvas-number" style="color:${r.color};border-color:${r.color}">${esc(opts.autoNumber)}</div>`
    : "";

  // cover-card mini header — top-center
  const coverHeaderHtml = opts.isCover
    ? `<div class="canvas-cover-tag" style="color:${r.color}">— ${state.cards.length}-slide carousel —</div>`
    : "";

  return `
    <div class="canvas-stage ${aspectCls}" style="${styleVars}" data-tid="${t.id}">
      ${bgLayer}
      ${decoBg ? `<div class="deco-bg-layer">${decoBg}</div>` : ""}
      ${coverHeaderHtml}
      <div class="canvas-inner">
        ${decoAbove}
        ${textHtml}
        ${decoBelow}
      </div>
      ${stickerHtml ? `<div class="canvas-stickers">${stickerHtml}</div>` : ""}
      ${autoNumberHtml}
      ${wmHtml}
    </div>
  `;
}

/* Apply current cohesion mode by syncing inactive cards to the active
   one. Called automatically before every render + history push. */
function applyCohesion() {
  if (state.cohesion === "free") return;
  const a = state.cards[state.activeCardIdx];
  if (!a) return;
  state.cards.forEach(c => {
    if (c === a) return;
    if (state.cohesion === "family") {
      c.templateId = a.templateId;
    } else if (state.cohesion === "locked") {
      c.templateId = a.templateId;
      c.overrides = JSON.parse(JSON.stringify(a.overrides));
    }
  });
}

/* ── MAIN RENDER DISPATCH ──────────────────────────────────── */
function render() {
  applyCohesion();
  const app = $("#app");
  if (state.screen === "home") {
    app.innerHTML = renderHomeScreen();
  } else if (state.screen === "camera") {
    app.innerHTML = renderCameraScreen();
  } else if (state.screen === "composer") {
    app.innerHTML = renderComposer();
  } else if (state.screen === "share") {
    app.innerHTML = renderShareScreen();
  } else if (state.screen === "feed") {
    app.innerHTML = renderFeedScreen();
  }
  attachDragHandlers();
  attachStickerHandlers();
  attachCarouselHandlers();
  attachSwipeGestures();
  fitScaledCanvases();
}

/* Swipe-right gesture on home → opens the camera/create flow.
   Matches the current Instagram interaction (no + button in the tabbar). */
function attachSwipeGestures() {
  const home = $(".home");
  if (!home) return;
  let startX = 0, startY = 0, t0 = 0, tracking = false;
  let pull = $(".home-pull-indicator");
  if (!pull) {
    pull = document.createElement("div");
    pull.className = "home-pull-indicator";
    pull.innerHTML = `<span class="home-pull-arrow">\u2192</span><span class="home-pull-text">Create</span>`;
    home.appendChild(pull);
  }

  function setPull(dx) {
    const clamped = Math.max(0, Math.min(dx, 120));
    pull.style.setProperty("--pull", clamped + "px");
    pull.classList.toggle("ready", clamped >= 60);
  }
  function start(x, y) {
    startX = x; startY = y; t0 = Date.now(); tracking = true;
    setPull(0);
  }
  function move(x, y) {
    if (!tracking) return;
    const dx = x - startX, dy = y - startY;
    if (Math.abs(dy) > 40) { tracking = false; setPull(0); return; }
    if (dx > 6) setPull(dx);
  }
  function end(x) {
    if (!tracking) { setPull(0); return; }
    tracking = false;
    const dx = x - startX;
    const tFlick = Date.now() - t0 < 400;
    const triggered = dx > 70 || (tFlick && dx > 40);
    setPull(0);
    if (triggered) {
      state.screen = "camera";
      state.mode = "DESIGN";
      render();
    }
  }

  home.addEventListener("touchstart", (e) => start(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  home.addEventListener("touchmove",  (e) => move(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  home.addEventListener("touchend",   (e) => end((e.changedTouches[0]||{}).clientX || 0));

  // mouse fallback so desktop users can demo it too
  let down = false;
  home.addEventListener("mousedown", (e) => { if (e.button !== 0) return; down = true; start(e.clientX, e.clientY); });
  document.addEventListener("mousemove", (e) => { if (down) move(e.clientX, e.clientY); });
  document.addEventListener("mouseup",   (e) => { if (down) { down = false; end(e.clientX); } });
}

/* Carousel: update dot indicator as user swipes, and jump on dot click. */
function attachCarouselHandlers() {
  $$(".carousel-track").forEach(track => {
    const dots = track.closest(".feed-post")?.querySelectorAll(".carousel-dot");
    const countEl = track.closest(".carousel-canvas")?.querySelector(".carousel-count");
    if (!dots) return;
    const onScroll = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
      if (countEl) countEl.textContent = `${i+1}/${dots.length}`;
    };
    track.addEventListener("scroll", onScroll);
    dots.forEach((d, idx) => {
      d.addEventListener("click", (e) => {
        e.preventDefault();
        track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
      });
    });
  });
}

/* For canvas-stages embedded in containers that don't match the 320px design
   width, set --scale to the right ratio so transform: scale() fits cleanly. */
function fitScaledCanvases() {
  $$(".post-canvas").forEach(c => {
    const w = c.offsetWidth || 375;
    c.style.setProperty("--post-w", w);
  });
  $$(".card-canvas-wrap").forEach(c => {
    const w = c.offsetWidth || 200;
    c.style.setProperty("--card-w", w);
  });
  // Scroll the active card into the visible portion of the stack.
  const stack = $(".card-stack");
  const active = $(".card-row.active");
  if (stack && active) {
    const stackRect = stack.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (activeRect.top < stackRect.top || activeRect.bottom > stackRect.bottom) {
      stack.scrollTop = active.offsetTop - 12;
    }
  }
}

/* ── HOME (Instagram feed) — entry point ───────────────────── */
function renderHomeScreen() {
  // mock posts plus the user's posted one (if any)
  const mockPosts = [
    {
      user: "ola.studio", verified: true, avatar: "https://i.pravatar.cc/80?img=23",
      kind: "photo",
      photo: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&q=80",
      caption: "softer afternoons. studio is open till 6.",
      likes: 1284, comments: 42, time: "2 h",
    },
    {
      user: "nita.beat", verified: true, avatar: "https://i.pravatar.cc/80?img=47",
      kind: "designed",
      template: TEMPLATES.find(t => t.id === "broadsheet"),
      caption: "made this in-app in 2 minutes — swipe →",
      likes: 318, comments: 21, time: "4 h",
    },
    {
      user: "lemon.tree.cafe", verified: false, avatar: "https://i.pravatar.cc/80?img=15",
      kind: "photo",
      photo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80",
      caption: "fresh batch \u00b7 cardamom buns are back",
      likes: 442, comments: 11, time: "8 h",
    },
  ];
  const stories = ["You","mira","nita","plum","lemon","ola"].map((u,i) => ({
    user: u, ring: i !== 0, src: `https://i.pravatar.cc/80?img=${10+i*7}`
  }));

  return `
  <div class="home">
    <header class="home-header">
      <span class="home-logo">Instagram</span>
      <div class="home-header-right">
        <button class="btn-icon" title="Notes">${ICON.sparkle}</button>
        <button class="btn-icon" title="Likes">${ICON.heart}</button>
        <button class="btn-icon" title="DMs">${ICON.paperplane}</button>
      </div>
    </header>

    <div class="home-body">
      <div class="home-stories">
        ${stories.map((s,i) => `
          <button class="story ${i===0?'story--you':''}" ${i===0?'data-act="open-create-sheet"':''}>
            <div class="story-ring ${i===0?'your':''}">
              <div class="story-inner" style="background-image:url('${s.src}')"></div>
              ${i===0?`<span class="story-plus">+</span>`:""}
            </div>
            <div class="story-name">${i===0?'Your story':s.user}</div>
          </button>
        `).join("")}
      </div>

      ${mockPosts.map(p => renderHomePost(p)).join("")}

      <div style="height:24px"></div>
    </div>

    <!-- Bottom tabbar — current IG layout, no + button.
         Creation is initiated by swiping right on the home feed
         (or tapping "Your story" in the stories row). -->
    <nav class="home-tabbar">
      <button class="tab active" title="Home">${ICON.home}</button>
      <button class="tab" title="Search">${ICON.search}</button>
      <button class="tab" title="Reels">${ICON.reels}</button>
      <button class="tab" title="Shop">${ICON.shop}</button>
      <button class="tab tab-me"><span class="me-dot"></span></button>
    </nav>

    <!-- Edge hint: faint arrow at the left edge to surface the swipe gesture -->
    <button class="home-swipe-edge" data-act="open-create-sheet" title="Swipe right or tap to create">
      <span class="home-swipe-edge-arrow"></span>
      <span class="home-swipe-edge-label">Create</span>
    </button>
  </div>`;
}

function renderHomePost(p) {
  if (p.kind === "photo") {
    return `
      <article class="home-post">
        <header class="post-head">
          <div class="post-avatar" style="background-image:url('${p.avatar}')"></div>
          <div class="post-user">${esc(p.user)} ${p.verified?`<span class="post-verify">${ICON.verify}</span>`:""}</div>
          <button class="btn-icon">${ICON.more}</button>
        </header>
        <div class="post-photo" style="background-image:url('${p.photo}')"></div>
        <div class="post-actions">
          <button class="btn-icon">${ICON.heart}</button>
          <button class="btn-icon">${ICON.comment}</button>
          <button class="btn-icon">${ICON.share}</button>
          <span class="post-actions-spacer"></span>
          <button class="btn-icon">${ICON.save}</button>
        </div>
        <div class="post-likes">${p.likes.toLocaleString()} likes</div>
        <div class="post-caption"><strong>${esc(p.user)}</strong> ${esc(p.caption)}</div>
        <div class="post-comments">View all ${p.comments} comments</div>
        <div class="post-time">${esc(p.time)} ago</div>
      </article>
    `;
  }
  if (p.kind === "designed") {
    return `
      <article class="home-post">
        <header class="post-head">
          <div class="post-avatar" style="background-image:url('${p.avatar}')"></div>
          <div class="post-user">${esc(p.user)} ${p.verified?`<span class="post-verify">${ICON.verify}</span>`:""}</div>
          <button class="btn-icon">${ICON.more}</button>
        </header>
        <div class="post-canvas" style="--post-aspect:4/5;position:relative">
          ${renderCanvas(p.template, { useOverrides: false, aspect: "4:5", thumb: false, text: p.template.seed, handle: "@"+p.user, showWatermark: true })}
          <span style="position:absolute;top:10px;right:10px;display:flex;gap:3px;background:rgba(0,0,0,.45);padding:5px 7px;border-radius:20px"><span style="width:5px;height:5px;border-radius:50%;background:#fff"></span><span style="width:5px;height:5px;border-radius:50%;background:#fff"></span><span style="width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.45)"></span></span>
        </div>
        <div class="post-actions">
          <button class="btn-icon">${ICON.heart}</button>
          <button class="btn-icon">${ICON.comment}</button>
          <button class="btn-icon">${ICON.share}</button>
          <span class="post-actions-spacer"></span>
          <button class="btn-icon">${ICON.save}</button>
        </div>
        <div class="post-likes">${p.likes.toLocaleString()} likes</div>
        <div class="post-caption"><strong>${esc(p.user)}</strong> ${esc(p.caption)}</div>
        <div class="post-comments">View all ${p.comments} comments</div>
        <div class="post-time">${esc(p.time)} ago</div>
      </article>
    `;
  }
  return "";
}

/* ── CAMERA SCREEN (capture entry) ─────────────────────────── */
function renderCameraScreen() {
  return `
  <div class="camera">
    <div class="camera-top">
      <button class="btn-icon" data-act="quit">${ICON.close}</button>
      <button class="btn-icon">${ICON.flash}</button>
      <button class="btn-icon">${ICON.gear}</button>
    </div>
    <div class="camera-leftrail">
      <button class="btn-icon">${ICON.Aa}</button>
      <button class="btn-icon">${ICON.infinity}</button>
      <button class="btn-icon">${ICON.layout}</button>
      <button class="btn-icon">${ICON.sticker}</button>
      <button class="btn-icon">${ICON.chevDn}</button>
    </div>
    <div class="camera-canvas">
      ${state.mode === "DESIGN" ? `
        <div class="threads-cta">
          <div class="glyph">${ICON.layout}</div>
          <h1>Design a post.</h1>
          <p>Build a designed post or carousel right here \u2014 templates, AI, type & color. No Canva round-trip.</p>
          <button class="start" data-act="enter-composer">Open designer</button>
        </div>` : `
        <div class="threads-cta">
          <p style="font-size:13px;color:rgba(255,255,255,.4);max-width:210px">Swipe to <strong style="color:#fff">DESIGN</strong> to lay out a post or carousel in-app.</p>
        </div>
      `}
    </div>
    <div class="camera-bottom">
      <div class="shutter-row">
        <div class="gallery-pill"><img src="https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=120&q=80" alt=""/></div>
        <button class="shutter"></button>
        <div class="story-thumb"><img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=120&q=80" alt=""/></div>
        <button class="flip">${ICON.flip}</button>
      </div>
      <div class="mode-switch" data-mode-switch>
        <button class="${state.mode==='POST'?'active':''}" data-mode="POST">POST</button>
        <button class="${state.mode==='STORY'?'active':''}" data-mode="STORY">STORY</button>
        <button class="${state.mode==='REEL'?'active':''}" data-mode="REEL">REEL</button>
        <button class="mode-threads ${state.mode==='DESIGN'?'active':''}" data-mode="DESIGN">
          DESIGN
          <span class="mode-new-dot"></span>
        </button>
      </div>
    </div>
  </div>`;
}

/* ── COMPOSER ──────────────────────────────────────────────── */
function renderComposer() {
  const isCarousel = state.cards.length > 1;
  return `
  <div class="composer ${isCarousel?'is-thread':''}">
    <header class="comp-header">
      <button class="btn-icon" data-act="back-to-home">${ICON.close}</button>
      <div class="comp-title">
        ${isCarousel
          ? `New post <span class="comp-title-sub">Carousel · ${state.cards.length}/10</span>`
          : `New post`}
      </div>
      <button class="comp-next" data-act="go-share">Next</button>
    </header>

    <div class="comp-surface-tag-row">
      <div class="comp-surface-tag">
        <span class="comp-surface-dot"></span>
        Design${isCarousel ? ` · ${state.cards.length} slides` : ''}
      </div>
      <button class="comp-preview-btn" data-act="preview-feed" title="See how it looks in feed">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/></svg>
        Preview
      </button>
    </div>

    ${isCarousel ? renderCardStack() : renderSingleCardStage()}

    <nav class="comp-tabs">
      <button class="${state.tab==='design'?'active':''}" data-tab="design">Design</button>
      <button class="${state.tab==='ai'?'active':''}" data-tab="ai">
        AI <span class="ai-tab-icon">${ICON.sparkle}</span>
      </button>
    </nav>

    <section class="comp-panel">
      ${state.tab === "ai" ? renderAITab() : renderDesignTab()}
    </section>
    ${state.templatesOverlay ? renderTemplatesOverlay() : ''}
  </div>
  `;
}

function renderSingleCardStage() {
  return `
    <div class="comp-stage">
      ${renderCanvasForCard(state.cards[0], { draggable: true, editable: true })}
      <div class="comp-stage-tools">
        <button class="comp-undo ${state.hindex<=0?'disabled':''}" data-act="undo" title="Undo">${ICON.undo}</button>
        <button class="comp-undo ${state.hindex>=state.history.length-1?'disabled':''}" data-act="redo" title="Redo">${ICON.redo}</button>
      </div>
      <button class="comp-make-thread" data-act="add-card" title="Add another slide to make a carousel">
        ${ICON.sparkle} Make it a carousel
      </button>
    </div>
  `;
}

function renderCardStack() {
  return `
    <div class="card-stack">
      <div class="card-stack-tools">
        <button class="comp-undo ${state.hindex<=0?'disabled':''}" data-act="undo" title="Undo">${ICON.undo}</button>
        <button class="comp-undo ${state.hindex>=state.history.length-1?'disabled':''}" data-act="redo" title="Redo">${ICON.redo}</button>
      </div>
      ${state.cards.map((c, idx) => renderCardRow(c, idx)).join("")}
      <div class="card-add-row">
        <button class="card-add-btn ${state.cards.length>=10?'disabled':''}" data-act="add-card">
          <span class="card-add-plus">+</span>
          <span>Add slide <span class="card-add-count">${state.cards.length}/10</span></span>
        </button>
      </div>
    </div>
  `;
}

function renderCardRow(c, idx) {
  const tpl = TEMPLATES.find(t => t.id === c.templateId) || initialT;
  const isActive = idx === state.activeCardIdx;
  const isCover = c.isCover && idx === 0;
  const n = idx + 1, total = state.cards.length;
  return `
    <div class="card-row ${isActive?'active':''} ${isCover?'is-cover':''}" data-card-idx="${idx}">
      <div class="card-row-aside">
        <span class="card-num">${n}/${total}</span>
        ${isCover ? `<span class="card-cover-tag">COVER</span>` : ""}
        <div class="card-thread-line"></div>
      </div>
      <button class="card-canvas-wrap" data-pick-card="${idx}">
        ${renderCanvasForCard(c, { stackPreview: true, draggable: isActive, editable: isActive, autoNumberOverride: state.autoNumber ? `${n}/${total}` : null, isCoverRender: isCover })}
      </button>
      <div class="card-row-actions">
        ${idx === 0 ? `
          <button class="card-action-btn ${isCover?'active':''}" data-act="toggle-cover" title="${isCover?'Unmark cover':'Mark as cover'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z M4 9h16"/></svg>
          </button>` : ""}
        <button class="card-action-btn" data-duplicate-card="${idx}" title="Duplicate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M3 16V5a2 2 0 0 1 2-2h11"/></svg>
        </button>
        ${state.cards.length > 1 ? `
          <button class="card-action-btn danger" data-remove-card="${idx}" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/></svg>
          </button>` : ""}
      </div>
    </div>
  `;
}

/* Convenience wrapper: renders a canvas with all the per-card data. */
function renderCanvasForCard(c, opts = {}) {
  const tpl = TEMPLATES.find(t => t.id === c.templateId) || initialT;
  const recipe = { ...tpl.recipe, ...c.overrides };
  // cover-card visual variation: bigger type + a tiny series header
  if (opts.isCoverRender) {
    recipe.fontSize = Math.round((recipe.fontSize || 36) * 1.18);
  }
  return renderCanvas(tpl, {
    ...opts,
    recipe,
    text: c.text,
    offset: c.textOffset,
    stickers: c.stickers,
    autoNumber: opts.autoNumberOverride,
    isCover: opts.isCoverRender,
  });
}

/* Initials helper for avatar bubbles in plain mode */
function initialsOf(handle) {
  const s = (handle || "yn").replace(/^@/, '').trim();
  return s.slice(0, 2).toUpperCase() || "YN";
}
/* ── TEMPLATES ─────────────────────────────────────────────
   Compact one-row picker inside the Design tab. "All templates"
   opens the full categorized overlay (renderTemplatesOverlay). */
function renderTemplatesSection() {
  // a short curated row — first two of each category — keeps it tight
  const featured = CATEGORIES.flatMap(c => (TEMPLATES_BY_CAT[c.id] || []).slice(0, 2));
  return `
    <div class="d-section d-templates-compact">
      <div class="d-templates-head">
        <span class="d-templates-title">Templates</span>
        <button class="d-templates-more" data-act="open-templates">All templates ${ICON.chevR}</button>
      </div>
      <div class="t-cat-row t-row-compact">
        ${featured.map(t => `
          <button class="t-card ${state.template.id===t.id?'selected':''}" data-pick-template="${t.id}">
            <div class="t-thumb">${renderCanvas(t, { thumb: true })}</div>
            <div class="t-card-name">${t.name}</div>
          </button>
        `).join("")}
        <button class="t-card t-card--more" data-act="open-templates">
          <div class="t-more-thumb"><span class="t-more-plus">+</span><span class="t-more-label">${TEMPLATES.length} more</span></div>
        </button>
      </div>
    </div>
  `;
}

/* Full-screen template browser overlay */
function renderTemplatesOverlay() {
  return `
    <div class="tpl-overlay">
      <header class="tpl-overlay-head">
        <button class="btn-icon" data-act="close-templates" title="Close">${ICON.chevDn}</button>
        <div class="tpl-overlay-title">Templates</div>
        <span class="tpl-overlay-spacer"></span>
      </header>
      <div class="tpl-overlay-body">
        <div class="t-search">
          <span class="t-search-ic">${ICON.search}</span>
          <input class="t-search-input" placeholder="Search templates" disabled />
        </div>
        ${CATEGORIES.map(cat => `
          <div class="t-cat">
            <div class="t-cat-head">
              <h3>${cat.label}</h3>
              <span class="t-cat-blurb">${cat.blurb}</span>
            </div>
            <div class="t-cat-row">
              ${TEMPLATES_BY_CAT[cat.id].map(t => `
                <button class="t-card ${state.template.id===t.id?'selected':''}" data-pick-template="${t.id}">
                  <div class="t-thumb">${renderCanvas(t, { thumb: true })}</div>
                  <div class="t-card-name">${t.name}</div>
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
        <div style="height:24px"></div>
      </div>
    </div>
  `;
}

/* ── DESIGN TAB ────────────────────────────────────────────── */
const FONT_OPTIONS = [
  { label: "Editorial", v: "'Playfair Display', serif", w: 700 },
  { label: "Soft Serif", v: "'Fraunces', serif", w: 500 },
  { label: "Literary", v: "'Cormorant Garamond', serif", w: 500 },
  { label: "Display", v: "'DM Serif Display', serif", w: 400 },
  { label: "Book", v: "'Lora', serif", w: 500 },
  { label: "Pages", v: "'Instrument Serif', serif", w: 400 },
  { label: "Bold Sans", v: "'Archivo Black', sans-serif", w: 900 },
  { label: "Condensed", v: "'Anton', sans-serif", w: 400 },
  { label: "Display Caps", v: "'Bebas Neue', sans-serif", w: 400 },
  { label: "Modern", v: "'Space Grotesk', sans-serif", w: 600 },
  { label: "Mono", v: "'IBM Plex Mono', monospace", w: 500 },
  { label: "Hand", v: "'Caveat', cursive", w: 700 },
];
const BG_PRESETS = [
  { type: "solid", value: "#f5ecdf" },
  { type: "solid", value: "#0a0a0a" },
  { type: "solid", value: "#ffffff" },
  { type: "solid", value: "#1f2e26" },
  { type: "solid", value: "#c2261f" },
  { type: "solid", value: "#3a1c40" },
  { type: "gradient", value: "linear-gradient(160deg, #f6d4bd, #d77a72)" },
  { type: "gradient", value: "linear-gradient(160deg, #ff5e3a, #a8138a)" },
  { type: "gradient", value: "linear-gradient(170deg, #cdd6c4, #aab59a)" },
  { type: "gradient", value: "linear-gradient(160deg, #142c45, #0a1020)" },
  { type: "gradient", value: "linear-gradient(140deg, #fdf6e3, #f1c40f 90%)" },
  { type: "gradient", value: "linear-gradient(160deg, #f4ecdc, #d8b06d)" },
];
const TEXT_COLORS = ["#0a0a0a","#fff8eb","#5a4634","#fff","#d8b06d","#c2261f","#1d2233","#3d4d36","#ff4d8d","#ffd60a"];

function renderDesignTab() {
  const r = effectiveRecipe();
  const isCarousel = state.cards.length > 1;
  const cohesionLabels = {
    free:   "Off · every slide styled independently",
    family: "Soft · shared template, colors & fonts can vary",
    locked: "Strict · all slides locked to one look",
  };
  const cohesionNames = {
    free:   "Off",
    family: "Soft match",
    locked: "Locked",
  };
  return `
  <div class="d-tab">
    ${isCarousel ? `
      <div class="d-thread-bar">
        <div class="d-thread-bar-row">
          <div class="d-thread-bar-label">Editing slide</div>
          <div class="d-thread-bar-value">${state.activeCardIdx + 1} / ${state.cards.length}</div>
        </div>
        <div class="d-thread-bar-pickers">
          ${state.cards.map((_, i) => `
            <button class="d-thread-dot ${i===state.activeCardIdx?'active':''}" data-pick-card="${i}">${i+1}</button>
          `).join("")}
        </div>
      </div>

      <details class="d-section" open>
        <summary>Brand Kit & carousel</summary>
        <div class="d-cohesion">
          <div class="d-cohesion-label">Brand Kit sync</div>
          <div class="d-row d-cohesion-row">
            ${["free","family","locked"].map(c => `
              <button class="d-cohesion-chip ${state.cohesion===c?'selected':''}" data-set-cohesion="${c}">
                ${cohesionNames[c]}
              </button>
            `).join("")}
          </div>
          <p class="d-hint">${cohesionLabels[state.cohesion]} \u2014 keeps a multi-slide post visually consistent.</p>
        </div>
        <label class="d-toggle">
          <input type="checkbox" ${state.autoNumber?'checked':''} data-act="toggle-auto-number"/>
          <span>Number each slide (1/${state.cards.length})</span>
        </label>
        <label class="d-toggle">
          <input type="checkbox" ${state.cards[0]?.isCover?'checked':''} data-act="toggle-cover"/>
          <span>Slide 1 is the cover (bigger hook type)</span>
        </label>
      </details>
    ` : ""}

    ${renderTemplatesSection()}

    <div class="d-text-field">
      <textarea data-input="text" placeholder="Type your post...">${esc(state.text)}</textarea>
    </div>

    <details class="d-section">
      <summary>Photo background</summary>
      <div class="d-row d-photo-row">
        <label class="d-photo-chip d-photo-upload" title="Upload your own photo">
          <input type="file" accept="image/*" data-upload-bg hidden/>
          <span class="d-photo-upload-plus">+</span>
          <span class="d-photo-upload-label">Upload</span>
        </label>
        ${PHOTO_BACKGROUNDS.map(p => `
          <button class="d-photo-chip ${r.bgImage===p.url?'selected':''}" data-set-bg-image="${esc(p.url)}" title="${esc(p.label)}" style="background-image:url('${p.url}')"></button>
        `).join("")}
      </div>
      ${r.bgImage ? `
        <div class="d-slider">
          <label>Image opacity <span data-show="op">${Math.round((r.bgImageOpacity != null ? r.bgImageOpacity : 0.75) * 100)}%</span></label>
          <input type="range" min="0.2" max="1" step="0.05" value="${r.bgImageOpacity != null ? r.bgImageOpacity : 0.75}" data-set="bgImageOpacity"/>
        </div>
        <div class="d-slider">
          <label>Darken photo <span data-show="dim">${Math.round((r.bgImageDim || 0) * 100)}%</span></label>
          <input type="range" min="0" max="0.8" step="0.05" value="${r.bgImageDim || 0}" data-set="bgImageDim"/>
        </div>
        <p class="d-hint">Lower opacity keeps your text readable over busy photos.</p>
        <button class="d-reset" data-act="remove-bg-image">Remove photo</button>
      ` : `<p class="d-hint">Upload your own photo or pick one, then lay your text over it. Opacity starts at 75% so text stays readable.</p>`}
    </details>

    <details class="d-section">
      <summary>Stickers & GIFs</summary>
      <div class="d-row d-sticker-row">
        ${Object.entries(STICKERS).map(([id, def]) => `
          <button class="d-sticker-chip" data-add-sticker="${id}" title="${esc(def.label)}">
            <div class="d-sticker-svg">${def.svg}</div>
          </button>
        `).join("")}
      </div>
      <p class="d-hint">Tap to add. Drag on the canvas to position.</p>
      ${state.stickers.length > 0 ? `
        <div class="d-sticker-placed">
          <div class="d-sticker-placed-label">On canvas (${state.stickers.length}):</div>
          ${state.stickers.map(s => `
            <button class="d-sticker-placed-chip" data-remove-sticker="${s.id}" title="Remove">
              <span class="d-sticker-placed-svg">${STICKERS[s.type].svg}</span>
              <span class="d-sticker-x">${ICON.close}</span>
            </button>
          `).join("")}
        </div>
      ` : ""}
    </details>

    <details class="d-section">
      <summary>Background</summary>
      <div class="d-row d-bg-row">
        ${BG_PRESETS.map(b => `
          <button class="d-bg-chip ${r.bg===b.value?'selected':''}" data-set-bg="${esc(b.value)}" style="background:${b.value}"></button>
        `).join("")}
      </div>
    </details>

    <details class="d-section">
      <summary>Typography</summary>
      <div class="d-row d-font-row">
        ${FONT_OPTIONS.map(f => `
          <button class="d-font-chip ${r.font===f.v?'selected':''}" data-set-font="${esc(f.v)}" data-set-weight="${f.w}" style="font-family:${f.v};font-weight:${f.w}">${f.label}</button>
        `).join("")}
      </div>
      <div class="d-slider">
        <label>Size <span data-show="size">${r.fontSize}px</span></label>
        <input type="range" min="14" max="120" step="2" value="${r.fontSize}" data-set="fontSize"/>
      </div>
      <div class="d-slider">
        <label>Line height <span data-show="lh">${(r.lineHeight).toFixed(2)}</span></label>
        <input type="range" min="0.9" max="1.8" step="0.05" value="${r.lineHeight}" data-set="lineHeight"/>
      </div>
      <div class="d-row d-color-row">
        ${TEXT_COLORS.map(c => `
          <button class="d-color-chip ${r.color===c?'selected':''}" data-set-color="${c}" style="background:${c}"></button>
        `).join("")}
      </div>
      <div class="d-row d-align-row">
        ${["left","center","right"].map(a => `
          <button class="d-align-chip ${r.align===a?'selected':''}" data-set-align="${a}">${ICON.align[a]}</button>
        `).join("")}
      </div>
    </details>

    <details class="d-section">
      <summary>Layout & position</summary>
      <div class="d-row d-just-row">
        ${["top","center","bottom"].map(j => `
          <button class="d-just-chip ${r.justify===j?'selected':''}" data-set-justify="${j}">${j[0].toUpperCase()+j.slice(1)}</button>
        `).join("")}
      </div>
      <div class="d-row d-aspect-row">
        ${["1:1","4:5","9:16"].map(a => `
          <button class="d-aspect-chip ${state.aspect===a?'selected':''}" data-set-aspect="${a}">${a}</button>
        `).join("")}
      </div>
      <p class="d-hint">Drag the text on the canvas to reposition.</p>
      ${(state.textOffset.x || state.textOffset.y) ? `<button class="d-reset" data-act="reset-offset">Reset position</button>` : ""}
    </details>

    <details class="d-section">
      <summary>Brand watermark</summary>
      <div class="d-row d-wm-row">
        <label class="d-toggle">
          <input type="checkbox" data-toggle="watermark" ${state.showWatermark?'checked':''}/>
          <span>Show handle on post</span>
        </label>
      </div>
      <div class="d-text-field d-text-field--small">
        <input data-input="handle" value="${esc(state.handle)}" placeholder="@yourhandle"/>
      </div>
    </details>

    <div style="height:24px"></div>
  </div>`;
}

/* ── AI TAB ────────────────────────────────────────────────── */
const AI_PROMPTS = [
  "Healing isn't linear, and that's okay. You can be soft and strong at the same time.",
  "Three things worth your attention this week — filed from the field.",
  "Fresh croissants out at 9. Get there before my regulars do.",
  "Consistency beats motivation. Show up when no one's clapping.",
];

function renderAITab() {
  const generating = state.aiState === "generating";
  const showResults = state.aiState === "results";
  const threadChunks = splitTextIntoCards(state.aiInput);
  return `
  <div class="ai-tab">
    <div class="ai-mode-toggle">
      <button class="ai-mode-pill ${!state.aiThreadMode?'active':''}" data-act="ai-mode-single">Single post</button>
      <button class="ai-mode-pill ${state.aiThreadMode?'active':''}" data-act="ai-mode-thread">
        Carousel
        ${threadChunks.length>=2 ? `<span class="ai-mode-count">${threadChunks.length} slides</span>` : ""}
      </button>
    </div>
    <div class="ai-top">
      <div class="ai-input-wrap">
        <textarea class="ai-input" placeholder="${state.aiThreadMode ? "Paste a longer idea \u2014 we'll split it into a designed carousel\u2026" : "Paste your text. AI will design 6 directions for you\u2026"}" data-input="aiInput" ${generating?'disabled':''}>${esc(state.aiInput)}</textarea>
        <div class="ai-chips">
          <span class="ai-chip-label">Or try:</span>
          ${AI_PROMPTS.map((p,i) => `
            <button class="ai-chip" data-ai-prompt="${i}">${esc(p.slice(0, 38))}\u2026</button>
          `).join("")}
        </div>
        ${state.aiThreadMode && threadChunks.length >= 2 ? `
          <div class="ai-thread-preview">
            <div class="ai-thread-preview-label">Will create ${threadChunks.length} slides:</div>
            <div class="ai-thread-preview-list">
              ${threadChunks.map((c,i) => `<span class="ai-thread-chip">${i+1}. ${esc(c.slice(0,30))}\u2026</span>`).join("")}
            </div>
          </div>
        ` : ""}
      </div>
      <button class="ai-go ${generating?'is-loading':''} ${!state.aiInput.trim()?'disabled':''}" data-act="ai-generate" ${generating?'disabled':''}>
        ${generating ? `<span class="ai-go-dots"><span></span><span></span><span></span></span> Designing\u2026` : `${ICON.sparkle} Generate`}
      </button>
    </div>

    ${generating ? renderAIMagic() : ""}

    ${showResults ? `
      <div class="ai-results">
        <div class="ai-results-head">
          <span>${state.aiResults.length} directions \u00b7 made for your words${state.aiThreadMode ? ` \u00b7 applied across all ${threadChunks.length} slides` : ""}</span>
        </div>
        <div class="ai-results-grid">
          ${state.aiResults.map(rid => {
            const t = TEMPLATES.find(x => x.id === rid);
            const r = { ...t.recipe };
            return `
              <button class="ai-result ${state.aiSelected===rid?'selected':''}" data-pick-ai="${rid}">
                <div class="ai-result-canvas">${renderCanvas(t, { recipe: r, text: state.aiThreadMode && threadChunks[0] ? threadChunks[0] : (state.aiInput || t.seed), thumb: false, handle: state.handle, showWatermark: false, aspect: "1:1" })}</div>
                <div class="ai-result-meta">
                  <div class="ai-result-name">${t.name}</div>
                  <div class="ai-result-mood">${moodLabel(t)}</div>
                </div>
              </button>
            `;
          }).join("")}
        </div>
        <button class="ai-regen" data-act="ai-generate">${ICON.sparkle} Generate again</button>
        <div style="height:24px"></div>
      </div>
    ` : ""}

    ${(!generating && !showResults) ? `
      <div class="ai-empty">
        <div class="ai-empty-ill">${ICON.sparkle}</div>
        <p>${state.aiThreadMode ? "Paste a longer idea. We\u2019ll split it into a carousel and design every slide so they read as one piece." : "Type or paste your post. We\u2019ll design 6 distinct visual directions tuned to your words."}</p>
        <div class="ai-empty-tags">
          <span>typography</span><span>color</span><span>layout</span><span>mood</span>${state.aiThreadMode?'<span>carousel split</span>':'<span>audience</span>'}
        </div>
      </div>
    ` : ""}
  </div>`;
}

function moodLabel(t) {
  const map = {
    healing: "Wellness · gentle",
    drive:   "Motivation · bold",
    indie:   "Indie business · warm",
    news:    "Editorial · sharp",
    zine:    "Zine · raw",
    verse:   "Literary · quiet",
  };
  return map[t.cat] || "—";
}

function renderAIMagic() {
  const vibe = state.tweaks.aiVibe;
  if (vibe === "sweep") {
    return `<div class="ai-magic ai-magic--sweep"><div class="sweep-bar"></div><div class="ai-magic-text">Designing…</div></div>`;
  }
  if (vibe === "aurora") {
    return `<div class="ai-magic ai-magic--aurora"><div class="aurora a1"></div><div class="aurora a2"></div><div class="aurora a3"></div><div class="ai-magic-text">Tuning palette…</div></div>`;
  }
  // particles default
  const particles = Array.from({ length: 28 }, (_, i) => {
    const left = Math.random() * 100;
    const delay = (Math.random() * 1.6).toFixed(2);
    const dur = (1.8 + Math.random() * 1.6).toFixed(2);
    const size = (3 + Math.random() * 6).toFixed(1);
    const hue = Math.floor(Math.random() * 60) + 280;
    return `<span class="ai-particle" style="left:${left}%;animation-delay:${delay}s;animation-duration:${dur}s;width:${size}px;height:${size}px;background:hsl(${hue},80%,75%)"></span>`;
  }).join("");
  return `
    <div class="ai-magic">
      <div class="ai-magic-stage">
        ${particles}
        <div class="ai-magic-orb"></div>
        <div class="ai-magic-orb ai-magic-orb--2"></div>
      </div>
      <div class="ai-magic-steps">
        <div class="ai-step">Reading tone…</div>
        <div class="ai-step ai-step-2">Choosing typography…</div>
        <div class="ai-step ai-step-3">Mixing 6 worlds…</div>
      </div>
    </div>
  `;
}

/* ── SHARE SCREEN ──────────────────────────────────────────── */
function renderShareScreen() {
  const isThread = state.cards.length > 1;
  return `
  <div class="share">
    <header class="share-header">
      <button class="btn-icon" data-act="back-to-composer">${ICON.chevDn}</button>
      <div class="share-title">${isThread ? `New post \u00b7 ${state.cards.length} slides` : 'New post'}</div>
      <button class="share-go" data-act="post-it">Share</button>
    </header>
    <div class="share-body">
      <div class="share-preview-row">
        ${isThread ? `
          <div class="share-thread-strip">
            ${state.cards.map((c, i) => `
              <div class="share-thread-card-wrap">
                <span class="share-thread-num">${i+1}</span>
                <div class="share-preview">${renderCanvasForCard(c, { aspect: state.aspect, autoNumberOverride: state.autoNumber ? `${i+1}/${state.cards.length}` : null, isCoverRender: c.isCover && i===0 })}</div>
              </div>
            `).join("")}
          </div>
        ` : `
          <div class="share-preview">${renderCanvasForCard(state.cards[0], { aspect: state.aspect })}</div>
        `}
        <textarea class="share-caption" placeholder="Write a caption\u2026" data-input="caption">${esc(state.caption)}</textarea>
      </div>

      ${isThread ? `
        <div class="share-carousel-note">
          <span class="share-carousel-note-ic">${ICON.layout}</span>
          <span>Posts as one swipeable carousel \u00b7 ${state.cards.length} slides</span>
        </div>
      ` : ""}

      <div class="share-list">
        <div class="share-row"><span>Tag people</span><span class="chev">${ICON.chevR}</span></div>
        <div class="share-row"><span>Add location</span><span class="chev">${ICON.chevR}</span></div>
        <div class="share-row"><span>Add music</span><span class="chev">${ICON.chevR}</span></div>
        <div class="share-row"><span>Audience <em>Everyone</em></span><span class="chev">${ICON.chevR}</span></div>
        <div class="share-divider"></div>
        <div class="share-row"><span>Also share to <em>Facebook</em></span><span class="chev">${ICON.chevR}</span></div>
        <div class="share-row"><span>Advanced settings</span><span class="chev">${ICON.chevR}</span></div>
      </div>
    </div>
  </div>`;
}

/* ── FEED SCREEN ───────────────────────────────────────────── */
function renderFeedScreen() {
  const isThread = state.cards.length > 1;
  const preview = state.previewMode;
  return `
  <div class="feed ${preview?'is-preview':''}">
    ${preview ? `
      <div class="preview-bar">
        <button class="preview-back" data-act="back-to-composer">${ICON.chevDn} Back to editing</button>
        <span class="preview-tag">Live feed preview</span>
      </div>
    ` : ''}
    <header class="feed-header">
      <span class="feed-logo">Instagram</span>
      <div class="feed-header-right">
        <button class="btn-icon">${ICON.heart}</button>
        <button class="btn-icon">${ICON.paperplane}</button>
      </div>
    </header>
    <div class="feed-body">
      <div class="feed-stories">
        ${["You","mira","nita","plum","lemon"].map((u,i)=>`
          <div class="story">
            <div class="story-ring ${i===0?'your':''}">
              <div class="story-inner" style="background-image:url('https://i.pravatar.cc/80?img=${10+i*7}')"></div>
              ${i===0?`<span class="story-plus">+</span>`:""}
            </div>
            <div class="story-name">${u}</div>
          </div>
        `).join("")}
      </div>
      ${isThread ? renderThreadFeedPost() : renderSingleFeedPost()}
      <div class="feed-bottom-cta">
        ${preview
          ? `<button class="feed-restart feed-restart--preview" data-act="back-to-composer">${ICON.chevUp} Back to editing</button>`
          : `<button class="feed-restart" data-act="restart">Compose another</button>`}
      </div>
    </div>
    <nav class="feed-tabbar">
      <span>${ICON.home}</span>
      <span>${ICON.search}</span>
      <span>${ICON.reels}</span>
      <span>${ICON.paperplane}</span>
      <span class="me"></span>
    </nav>
  </div>`;
}

function renderSingleFeedPost() {
  const c = state.cards[0];
  return `
    <article class="feed-post">
      <header class="post-head">
        <div class="post-avatar" style="background-image:url('https://i.pravatar.cc/80?img=12')"></div>
        <div class="post-user">${esc(state.handle.replace(/^@/,''))} <span class="post-verify">${ICON.verify}</span></div>
        <button class="btn-icon">${ICON.more}</button>
      </header>
      <div class="post-canvas" style="--post-aspect:${state.aspect.replace(":","/")}">${renderCanvasForCard(c, { aspect: state.aspect })}</div>
      <div class="post-actions">
        <button class="btn-icon" data-act="like" title="Like">${state.feedLiked?ICON.heartFilled:ICON.heart}</button>
        <button class="btn-icon">${ICON.comment}</button>
        <button class="btn-icon">${ICON.share}</button>
        <span class="post-actions-spacer"></span>
        <button class="btn-icon">${ICON.save}</button>
      </div>
      <div class="post-likes">${(state.feedLiked?1:0) + state.feedReactions + 412} likes</div>
      <div class="post-caption">
        <strong>${esc(state.handle.replace(/^@/,''))}</strong> ${esc(state.caption || "")}
        ${state.caption ? "" : `<span style="color:#888">Add a caption to your post...</span>`}
      </div>
      <div class="post-comments">View all 47 comments</div>
      <div class="post-time">Just now</div>
    </article>
  `;
}
function renderThreadFeedPost() {
  return renderCarouselFeedPost();
}
/* Carousel — IG-native, swipeable cards in one post with dots */
function renderCarouselFeedPost() {
  const handle = state.handle.replace(/^@/,'');
  return `
    <article class="feed-post feed-carousel-post">
      <header class="post-head">
        <div class="post-avatar" style="background-image:url('https://i.pravatar.cc/80?img=12')"></div>
        <div class="post-user">${esc(handle)} <span class="post-verify">${ICON.verify}</span></div>
        <button class="btn-icon">${ICON.more}</button>
      </header>
      <div class="post-canvas carousel-canvas" style="--post-aspect:${state.aspect.replace(":","/")}">
        <div class="carousel-track" data-carousel>
          ${state.cards.map((c, i) => `
            <div class="carousel-slide">
              ${renderCanvasForCard(c, { aspect: state.aspect, autoNumberOverride: state.autoNumber ? `${i+1}/${state.cards.length}` : null, isCoverRender: c.isCover && i===0 })}
            </div>
          `).join("")}
        </div>
        <div class="carousel-count">1/${state.cards.length}</div>
      </div>
      <div class="carousel-dots">
        ${state.cards.map((_, i) => `<span class="carousel-dot ${i===0?'active':''}" data-carousel-jump="${i}"></span>`).join("")}
      </div>
      <div class="post-actions">
        <button class="btn-icon" data-act="like">${state.feedLiked?ICON.heartFilled:ICON.heart}</button>
        <button class="btn-icon">${ICON.comment}</button>
        <button class="btn-icon">${ICON.share}</button>
        <span class="post-actions-spacer"></span>
        <button class="btn-icon">${ICON.save}</button>
      </div>
      <div class="post-likes">${412 + (state.feedLiked?1:0)} likes</div>
      <div class="post-caption">
        <strong>${esc(handle)}</strong> ${esc(state.caption || `a post in ${state.cards.length} slides.`)}
      </div>
      <div class="post-comments">View all 47 comments</div>
      <div class="post-time">Just now</div>
    </article>
  `;
}
/* ── EVENTS ────────────────────────────────────────────────── */
function on(ev, sel, fn) {
  document.addEventListener(ev, e => {
    const t = e.target.closest(sel);
    if (t) fn(e, t);
  });
}

// click handlers
on("click", "[data-act]", (e, t) => {
  const act = t.dataset.act;
  if (act === "open-create") { state.screen = "camera"; state.mode = "DESIGN"; render(); }
  if (act === "open-create-sheet") { state.screen = "camera"; state.mode = "DESIGN"; render(); }
  if (act === "close-create-sheet") { state.createSheetOpen = false; render(); }
  if (act === "enter-composer") { state.screen = "composer"; render(); }
  if (act === "back-to-home") { state.screen = "home"; state.createSheetOpen = false; render(); }
  if (act === "back-to-camera") { state.screen = "camera"; state.mode = "STORY"; render(); }
  if (act === "go-share") { state.screen = "share"; render(); }
  if (act === "preview-feed") { state.previewMode = true; state.posted = false; state.screen = "feed"; render(); }
  if (act === "open-templates") { state.templatesOverlay = true; render(); }
  if (act === "close-templates") { state.templatesOverlay = false; render(); }
  if (act === "back-to-composer") { state.screen = "composer"; state.previewMode = false; render(); }
  if (act === "post-it") { state.screen = "feed"; state.posted = true; state.previewMode = false; render(); }
  if (act === "restart") {
    Object.assign(state, { screen: "home", caption: "", feedLiked: false, feedReactions: 0, createSheetOpen: false, previewMode: false });
    render();
  }
  if (act === "undo") undo();
  if (act === "redo") redo();
  if (act === "reset-offset") { state.textOffset = { x: 0, y: 0 }; pushHistory(); render(); }
  if (act === "like") {
    state.feedLiked = !state.feedLiked;
    if (state.feedLiked) burstHeart(t);
    render();
  }
  if (act === "ai-generate") generateAI();
  if (act === "quit") { state.screen = "home"; render(); }
  if (act === "remove-bg-image") {
    state.overrides.bgImage = null;
    state.overrides.bgImageDim = null;
    pushHistory(); render();
  }
  if (act === "add-card") { addCard(); }
  if (act === "toggle-cover") { toggleCover(0); }
  if (act === "toggle-auto-number") { state.autoNumber = !state.autoNumber; pushHistory(); render(); }
  if (act === "ai-mode-single") { state.aiThreadMode = false; render(); }
  if (act === "ai-mode-thread") { state.aiThreadMode = true; render(); }
});

on("click", "[data-pick-card]", (e, t) => {
  const idx = parseInt(t.dataset.pickCard);
  setActiveCard(idx);
});
on("click", "[data-duplicate-card]", (e, t) => {
  e.stopPropagation();
  duplicateCard(parseInt(t.dataset.duplicateCard));
});
on("click", "[data-remove-card]", (e, t) => {
  e.stopPropagation();
  removeCard(parseInt(t.dataset.removeCard));
});
on("click", "[data-set-cohesion]", (e, t) => {
  state.cohesion = t.dataset.setCohesion;
  pushHistory(); render();
});

on("click", "[data-set-bg-image]", (e, t) => {
  state.overrides.bgImage = t.dataset.setBgImage;
  state.overrides.bgImageDim = state.overrides.bgImageDim || 0.35;
  pushHistory(); render();
});
on("click", "[data-add-sticker]", (e, t) => {
  addSticker(t.dataset.addSticker);
});
on("click", "[data-remove-sticker]", (e, t) => {
  removeSticker(parseInt(t.dataset.removeSticker));
});

on("click", "[data-mode]", (e, t) => {
  state.mode = t.dataset.mode;
  render();
});

on("click", "[data-tab]", (e, t) => { state.tab = t.dataset.tab; render(); });

on("click", "[data-pick-template]", (e, t) => {
  const id = t.dataset.pickTemplate;
  const tpl = TEMPLATES.find(x => x.id === id);
  if (!tpl) return;
  state.template = tpl;
  state.overrides = {};
  state.text = tpl.seed;
  state.handle = tpl.handle;
  state.textOffset = { x:0, y:0 };
  state.templatesOverlay = false; // close the browser after a pick
  pushHistory();
  render();
});

on("click", "[data-set-bg]", (e, t) => {
  state.overrides.bg = t.dataset.setBg;
  state.overrides.bgImage = null;
  pushHistory(); render();
});
on("click", "[data-set-font]", (e, t) => {
  state.overrides.font = t.dataset.setFont;
  state.overrides.fontWeight = parseInt(t.dataset.setWeight) || 500;
  pushHistory(); render();
});
on("click", "[data-set-color]", (e, t) => {
  state.overrides.color = t.dataset.setColor;
  pushHistory(); render();
});
on("click", "[data-set-align]", (e, t) => {
  state.overrides.align = t.dataset.setAlign;
  pushHistory(); render();
});
on("click", "[data-set-justify]", (e, t) => {
  state.overrides.justify = t.dataset.setJustify;
  pushHistory(); render();
});
on("click", "[data-set-aspect]", (e, t) => {
  state.aspect = t.dataset.setAspect;
  pushHistory(); render();
});

on("input", "[data-input]", (e, t) => {
  const key = t.dataset.input;
  state[key] = t.value;
  if (key === "text" || key === "handle") {
    // don't push history on every keystroke; debounce
    clearTimeout(t.__d); t.__d = setTimeout(pushHistory, 600);
  }
  // live update canvas without full re-render for text
  if (key === "text" || key === "handle") {
    updateCanvasLive();
  }
  // live update AI generate button state
  if (key === "aiInput") {
    const btn = $(".ai-go");
    if (btn) btn.classList.toggle("disabled", !state.aiInput.trim());
  }
});

on("input", "[data-set]", (e, t) => {
  const key = t.dataset.set;
  const val = parseFloat(t.value);
  state.overrides[key] = val;
  // update visible label
  if (key === "fontSize") {
    const show = $(`[data-show="size"]`); if (show) show.textContent = Math.round(val) + "px";
  } else if (key === "lineHeight") {
    const show = $(`[data-show="lh"]`); if (show) show.textContent = val.toFixed(2);
  } else if (key === "bgImageDim") {
    const show = $(`[data-show="dim"]`); if (show) show.textContent = Math.round(val * 100) + "%";
  }
  // live update canvas
  const c = $(".comp-stage .canvas-stage");
  if (c) {
    if (key === "fontSize") c.style.setProperty("--c-size", val + "px");
    if (key === "lineHeight") c.style.setProperty("--c-lh", val);
    if (key === "bgImageDim") {
      // re-render canvas overlay only
      const overlay = c.querySelector(".canvas-bg-image + .canvas-overlay");
      if (overlay) overlay.style.background = `rgba(0,0,0,${val})`;
    }
  }
  clearTimeout(t.__d); t.__d = setTimeout(pushHistory, 400);
});

on("change", "[data-toggle='watermark']", (e, t) => {
  state.showWatermark = t.checked;
  pushHistory(); render();
});

on("click", "[data-ai-prompt]", (e, t) => {
  const i = parseInt(t.dataset.aiPrompt);
  state.aiInput = AI_PROMPTS[i];
  render();
});

on("click", "[data-pick-ai]", (e, t) => {
  const id = t.dataset.pickAi;
  state.aiSelected = id;
  const tpl = TEMPLATES.find(x => x.id === id);
  if (!tpl) return;

  if (state.aiThreadMode) {
    const chunks = splitTextIntoCards(state.aiInput);
    if (chunks.length >= 2) {
      state.cards = chunks.map((txt, i) => makeCard(tpl, { text: txt, isCover: i === 0 }));
      state.activeCardIdx = 0;
      // when AI applies a template to all cards, lean toward "family" cohesion
      state.cohesion = "family";
    } else {
      // fall back to single
      state.template = tpl;
      state.overrides = {};
      state.text = state.aiInput || tpl.seed;
      state.textOffset = { x:0, y:0 };
    }
  } else {
    state.template = tpl;
    state.overrides = {};
    state.text = state.aiInput || tpl.seed;
    state.textOffset = { x:0, y:0 };
  }
  state.handle = tpl.handle;
  state.tab = "design";
  pushHistory();
  render();
});

/* split a longer text into ~card-sized chunks for thread mode */
function splitTextIntoCards(text) {
  if (!text || !text.trim()) return [];
  // paragraph split first
  let chunks = text.split(/\n\s*\n+/).map(s => s.trim()).filter(Boolean);
  if (chunks.length < 2) {
    // fall back to sentence-grouping
    const sentences = text.split(/(?<=[.!?\u2014])\s+/).map(s => s.trim()).filter(Boolean);
    const cardCount = Math.min(6, Math.max(2, Math.ceil(sentences.length / 2)));
    const per = Math.ceil(sentences.length / cardCount);
    chunks = [];
    for (let i = 0; i < sentences.length; i += per) {
      chunks.push(sentences.slice(i, i + per).join(" "));
    }
  }
  return chunks.slice(0, 16);
}

/* ── AI generation flow ────────────────────────────────────── */
function generateAI() {
  if (!state.aiInput.trim()) return;
  state.aiState = "generating";
  state.aiResults = [];
  render();
  const intensity = state.tweaks.aiIntensity || "balanced";
  setTimeout(() => {
    let results;
    if (intensity === "subtle") {
      // stay close to the current look — mostly same category, gentle variety
      const curCat = state.template.cat;
      results = uniqPick((TEMPLATES_BY_CAT[curCat] || []).map(t => t.id), 4);
      if (results.length < 4) {
        results = results.concat(uniqPick(TEMPLATES.filter(t => t.cat !== curCat).map(t => t.id), 4 - results.length));
      }
    } else if (intensity === "bold") {
      // maximum range — six fully distinct directions from anywhere
      results = uniqPick(TEMPLATES.map(t => t.id), 6);
    } else {
      // balanced — one from each category
      results = CATEGORIES.map(c => {
        const pool = TEMPLATES_BY_CAT[c.id];
        return pool[Math.floor(Math.random() * pool.length)].id;
      });
    }
    state.aiResults = results;
    state.aiState = "results";
    render();
  }, 2100);
}

function uniqPick(arr, n) {
  const a = [...new Set(arr)];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, Math.min(n, a.length));
}

/* ── live canvas updates (for text typing) ─────────────────── */
function updateCanvasLive() {
  const txtEl = $(".comp-stage .canvas-text");
  if (txtEl && !state.template.recipe.bigNumber) {
    txtEl.innerHTML = nl2br(state.text);
  } else {
    // big number — needs full re-render of canvas only
    const stage = $(".comp-stage .canvas-stage");
    if (stage) {
      const wrap = $(".comp-stage");
      const tools = $(".comp-stage-tools", wrap);
      wrap.innerHTML = renderCanvas(state.template, { draggable: true, useOverrides: true });
      if (tools) wrap.appendChild(tools);
      attachDragHandlers();
    }
  }
  const wm = $(".comp-stage .canvas-wm");
  if (wm) wm.textContent = state.template.recipe.wm?.upper ? state.handle.toUpperCase() : state.handle;
}

/* ── drag to reposition text ───────────────────────────────── */
function attachDragHandlers() {
  const txt = $(".comp-stage [data-draggable='text']");
  if (!txt) return;
  let startX = 0, startY = 0, baseX = 0, baseY = 0, dragging = false;
  let moved = 0; // total movement, used to suppress click after a drag

  function isEditing() {
    return document.activeElement === txt;
  }

  function down(e) {
    // Don't initiate drag while editing — let contenteditable handle clicks.
    if (isEditing()) return;
    const ev = e.touches ? e.touches[0] : e;
    startX = ev.clientX; startY = ev.clientY;
    baseX = state.textOffset.x; baseY = state.textOffset.y;
    dragging = true; moved = 0;
    txt.classList.add("dragging");
  }
  function move(e) {
    if (!dragging) return;
    const ev = e.touches ? e.touches[0] : e;
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
    if (moved > 4) e.preventDefault?.();
    state.textOffset.x = baseX + dx;
    state.textOffset.y = baseY + dy;
    txt.style.transform = `translate(${state.textOffset.x}px, ${state.textOffset.y}px)`;
  }
  function up() {
    if (!dragging) return;
    dragging = false;
    txt.classList.remove("dragging");
    if (moved > 4) {
      pushHistory();
    } else {
      // treated as a click — focus into edit mode
      txt.focus();
      // place caret at end
      try {
        const range = document.createRange();
        range.selectNodeContents(txt);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges(); sel.addRange(range);
      } catch (e) {}
    }
  }

  // contenteditable input → sync state
  txt.addEventListener("input", () => {
    const t = txt.innerText.replace(/\n+$/, "");
    state.text = t;
    // update placeholder visibility live
    txt.classList.toggle("is-placeholder", !t || !t.trim());
    clearTimeout(txt.__d); txt.__d = setTimeout(pushHistory, 600);
  });
  // On focus: clear placeholder content so user types fresh
  txt.addEventListener("focus", () => {
    if (txt.classList.contains("is-placeholder")) {
      txt.textContent = "";
      txt.classList.remove("is-placeholder");
    }
    showEditingBar(true);
  });
  txt.addEventListener("blur", () => {
    // restore placeholder if empty
    if (!txt.innerText.trim()) {
      txt.textContent = "Tap to write\u2026";
      txt.classList.add("is-placeholder");
      state.text = "";
    }
    showEditingBar(false);
  });

  txt.addEventListener("mousedown", down);
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
  txt.addEventListener("touchstart", down, { passive: true });
  document.addEventListener("touchmove", move, { passive: false });
  document.addEventListener("touchend", up);
}

/* Show/hide the "Done" floating bar over the canvas while editing. */
function showEditingBar(show) {
  let bar = $(".comp-editing-bar");
  if (show && !bar) {
    bar = document.createElement("div");
    bar.className = "comp-editing-bar";
    bar.innerHTML = `<button class="comp-editing-done">Done</button>`;
    document.querySelector(".comp-stage, .card-stack")?.appendChild(bar);
    bar.querySelector(".comp-editing-done").addEventListener("click", () => {
      const t = $(".comp-stage [data-draggable='text']");
      t?.blur();
    });
  } else if (!show && bar) {
    bar.remove();
  }
}

/* ── drag stickers ─────────────────────────────────────────── */
function attachStickerHandlers() {
  $$(".comp-stage [data-draggable-sticker]").forEach(el => {
    const id = parseInt(el.dataset.draggableSticker);
    const s = state.stickers.find(s => s.id === id);
    if (!s) return;
    let startX = 0, startY = 0, baseX = 0, baseY = 0, dragging = false;

    function down(e) {
      const ev = e.touches ? e.touches[0] : e;
      startX = ev.clientX; startY = ev.clientY;
      baseX = s.x; baseY = s.y;
      dragging = true;
      el.classList.add("dragging");
      e.preventDefault();
      e.stopPropagation();
    }
    function move(e) {
      if (!dragging) return;
      const ev = e.touches ? e.touches[0] : e;
      s.x = baseX + (ev.clientX - startX);
      s.y = baseY + (ev.clientY - startY);
      el.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.scale}) rotate(${s.rotate}deg)`;
    }
    function up() {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("dragging");
      pushHistory();
    }
    el.addEventListener("mousedown", down);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    el.addEventListener("touchstart", down, { passive: false });
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", up);

    // double-click to remove
    el.addEventListener("dblclick", (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeSticker(id);
    });
  });
}

/* ── like burst ────────────────────────────────────────────── */
function burstHeart(btn) {
  const r = btn.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const el = document.createElement("span");
    el.className = "heart-particle";
    el.textContent = "❤";
    el.style.left = (r.left + r.width/2) + "px";
    el.style.top = (r.top + r.height/2) + "px";
    el.style.setProperty("--dx", ((Math.random()-.5)*60).toFixed(0)+"px");
    el.style.setProperty("--dy", -(20 + Math.random()*40).toFixed(0)+"px");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }
}

/* ── TWEAKS PANEL ──────────────────────────────────────────── */
/* Expressive controls — these reshape the whole feel of the post,
   not single pixels. Art direction = type personality, Brand palette
   = the color world, Density = how the editor itself feels. */
const ART_DIRECTIONS = {
  editorial: { label: "Editorial", font: "'Playfair Display', serif", fontWeight: 700, textTransform: "none", letterSpacing: "0", fontStyle: "normal" },
  bold:      { label: "Bold",      font: "'Archivo Black', sans-serif", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.4px", fontStyle: "normal" },
  playful:   { label: "Playful",   font: "'Caveat', cursive", fontWeight: 700, textTransform: "none", letterSpacing: "0", fontStyle: "normal" },
};
const BRAND_PALETTES = {
  sand:   { label: "Sand",   bg: "#f5ecdf", color: "#5a4634", swatch: "#f5ecdf" },
  ink:    { label: "Ink",    bg: "#0a0a0a", color: "#fff8eb", swatch: "#0a0a0a" },
  bloom:  { label: "Bloom",  bg: "linear-gradient(160deg, #f6d4bd, #d77a72)", color: "#fff8eb", swatch: "linear-gradient(135deg,#f6d4bd,#d77a72)" },
  forest: { label: "Forest", bg: "#1f2e26", color: "#cdd6c4", swatch: "#1f2e26" },
};

function applyArtDirection(id) {
  const a = ART_DIRECTIONS[id];
  if (!a) return;
  state.tweaks.artDirection = id;
  state.cards.forEach(c => {
    c.overrides = { ...c.overrides, font: a.font, fontWeight: a.fontWeight, textTransform: a.textTransform, letterSpacing: a.letterSpacing, fontStyle: a.fontStyle };
  });
  pushHistory();
}
function applyBrandPalette(id) {
  const p = BRAND_PALETTES[id];
  if (!p) return;
  state.tweaks.brandPalette = id;
  state.cards.forEach(c => {
    c.overrides = { ...c.overrides, bg: p.bg, bgImage: null, bgImageDim: null, color: p.color };
  });
  pushHistory();
}
function applyTweakBody() {
  document.body.dataset.theme = state.tweaks.appTheme;
  document.body.dataset.density = state.tweaks.density;
  document.body.dataset.art = state.tweaks.artDirection;
}

function renderTweaks() {
  const t = state.tweaks;
  $("#tweaks-root").innerHTML = `
    <button class="tw-fab" data-act="tw-toggle" title="Tweaks">
      ${ICON.sparkle}
    </button>
    <div class="tw-panel ${t.__open?'open':''}">
      <header><span>Tweaks</span><button class="btn-icon" data-act="tw-toggle">${ICON.close}</button></header>
      <div class="tw-body">
        <div class="tw-section">
          <div class="tw-label">Art direction</div>
          <div class="tw-options">
            ${Object.entries(ART_DIRECTIONS).map(([v,a])=>`<button class="${t.artDirection===v?'active':''}" data-tw-art="${v}" style="font-family:${a.font};font-weight:${a.fontWeight}">${a.label}</button>`).join("")}
          </div>
          <div class="tw-note">Re-letters every slide \u2014 the post's whole voice.</div>
        </div>
        <div class="tw-section">
          <div class="tw-label">Brand palette</div>
          <div class="tw-options tw-options--swatch">
            ${Object.entries(BRAND_PALETTES).map(([v,p])=>`<button class="tw-swatch ${t.brandPalette===v?'active':''}" data-tw-palette="${v}" title="${p.label}"><span class="tw-swatch-dot" style="background:${p.swatch}"></span>${p.label}</button>`).join("")}
          </div>
          <div class="tw-note">Recolors the carousel as one brand kit.</div>
        </div>
        <div class="tw-section">
          <div class="tw-label">Editor density</div>
          <div class="tw-options">
            ${[["comfortable","Comfortable"],["pro","Pro"]].map(([v,l])=>`<button class="${t.density===v?'active':''}" data-tw="density" data-tw-v="${v}">${l}</button>`).join("")}
          </div>
          <div class="tw-note">Pro tightens the toolbars for power editing.</div>
        </div>
        <div class="tw-section">
          <div class="tw-label">App theme</div>
          <div class="tw-options">
            ${["dark","light"].map(v=>`<button class="${t.appTheme===v?'active':''}" data-tw="appTheme" data-tw-v="${v}">${v}</button>`).join("")}
          </div>
        </div>
        <div class="tw-section">
          <div class="tw-label">AI suggestion intensity</div>
          <div class="tw-options">
            ${[["subtle","Subtle"],["balanced","Balanced"],["bold","Bold"]].map(([v,l])=>`<button class="${t.aiIntensity===v?'active':''}" data-tw="aiIntensity" data-tw-v="${v}">${l}</button>`).join("")}
          </div>
          <div class="tw-note">Subtle stays near your current look; Bold explores the widest range.</div>
        </div>
        <div class="tw-section">
          <div class="tw-label">AI loading vibe</div>
          <div class="tw-options">
            ${["particles","sweep","aurora"].map(v=>`<button class="${t.aiVibe===v?'active':''}" data-tw="aiVibe" data-tw-v="${v}">${v}</button>`).join("")}
          </div>
        </div>
        <div class="tw-section">
          <div class="tw-label">Jump to screen</div>
          <div class="tw-options">
            ${[["home","Home"],["composer","Designer"],["share","Share"],["feed","Feed"]].map(([v,l])=>`<button class="${state.screen===v?'active':''}" data-tw-go="${v}">${l}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}
on("click", "[data-act='tw-toggle']", () => {
  state.tweaks.__open = !state.tweaks.__open;
  renderTweaks();
});
on("click", "[data-tw]", (e, t) => {
  state.tweaks[t.dataset.tw] = t.dataset.twV;
  applyTweakBody();
  renderTweaks();
  render();
});
on("click", "[data-tw-art]", (e, t) => {
  applyArtDirection(t.dataset.twArt);
  applyTweakBody();
  renderTweaks();
  render();
});
on("click", "[data-tw-palette]", (e, t) => {
  applyBrandPalette(t.dataset.twPalette);
  renderTweaks();
  render();
});
on("click", "[data-tw-go]", (e, t) => {
  state.screen = t.dataset.twGo;
  renderTweaks();
  render();
});

/* ── INIT ──────────────────────────────────────────────────── */
function init() {
  // First push of history
  pushHistory();
  applyTweakBody();
  render();
  renderTweaks();
}
init();
