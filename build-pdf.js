/**
 * Build the PDF carousel from captured phone frames.
 *
 * One portrait page per scene: dark background, phone frame centered,
 * a title + caption strip. Reads carousel-frames/*.png.
 *
 * Output: Instagram-Post-Design-Studio.pdf
 * Usage:  node build-pdf.js
 */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const FRAMES = path.join(__dirname, "carousel-frames");
const OUT = path.join(__dirname, "Instagram-Post-Design-Studio.pdf");

/* Page = phone aspect (460×940 → ~0.49) on a portrait page with margins. */
const PAGE_W = 720;
const PAGE_H = 1280;

/* Per-slide copy — keep it short, benefit-led. */
const SLIDES = [
  { file: "01-home.png", kicker: "POST DESIGN STUDIO",
    title: "Design posts inside Instagram",
    body: "No Canva round-trip. Templates, type, AI — right where you post." },
  { file: "02-designer.png", kicker: "WRITE",
    title: "Start with your words",
    body: "Type your message and watch it land on a designed canvas instantly." },
  { file: "03-templates.png", kicker: "TEMPLATES",
    title: "Pick a look in seconds",
    body: "Curated templates across moods — healing, drive, indie, editorial." },
  { file: "04-typography.png", kicker: "TYPOGRAPHY",
    title: "Make it yours",
    body: "Fonts, size, color, alignment. Text auto-fits so it never overflows." },
  { file: "05-photo-bg.png", kicker: "PHOTO BACKGROUNDS",
    title: "Drop in any photo",
    body: "Upload your own or pick a preset. 75% opacity keeps text readable." },
  { file: "06-ai-directions.png", kicker: "AI",
    title: "Six directions, instantly",
    body: "Paste your text and AI designs distinct visual takes tuned to it." },
  { file: "07-carousel-stack.png", kicker: "CAROUSELS",
    title: "Build a multi-slide story",
    body: "Brand-kit cohesion keeps every slide consistent — cover to close." },
  { file: "08-feed-preview.png", kicker: "PREVIEW",
    title: "See it live before posting",
    body: "Swipe the carousel in a real feed preview. No surprises." },
  { file: "09-posted.png", kicker: "SHARE",
    title: "Post it. Done.",
    body: "Add a caption and share — straight to the feed as a carousel." },
];

const COL = {
  bg:     "#0a0a0a",
  panel:  "#141414",
  text:   "#ffffff",
  sub:    "#9a9a9a",
  accent: "#ff5e3a",
  kicker: "#ff7d5c",
};

function drawSlide(doc, slide, idx, total) {
  if (idx > 0) doc.addPage();

  // background
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(COL.bg);

  // subtle top gradient bar
  const grad = doc.linearGradient(0, 0, PAGE_W, 0);
  grad.stop(0, "#b95cf6").stop(0.6, "#ff5e9e").stop(1, "#ffb84d");
  doc.rect(0, 0, PAGE_W, 6).fill(grad);

  // ── phone frame ──
  const imgPath = path.join(FRAMES, slide.file);
  const img = doc.openImage(imgPath); // gives intrinsic .width/.height
  const maxImgH = 820;
  const maxImgW = PAGE_W - 220;
  let w = img.width, h = img.height;
  const scale = Math.min(maxImgW / w, maxImgH / h);
  w *= scale; h *= scale;
  const x = (PAGE_W - w) / 2;
  const y = 150;

  // soft shadow behind phone
  doc.save();
  doc.opacity(0.5);
  doc.roundedRect(x + 6, y + 14, w, h, 44 * scale).fill("#000000");
  doc.restore();
  doc.image(imgPath, x, y, { width: w, height: h });

  // ── text block ──
  const tx = 90;
  const tw = PAGE_W - 180;
  let ty = y + h + 56;

  doc.fillColor(COL.kicker).font("Helvetica-Bold").fontSize(15)
     .text(slide.kicker, tx, ty, { characterSpacing: 2, width: tw });
  ty += 30;

  doc.fillColor(COL.text).font("Helvetica-Bold").fontSize(36)
     .text(slide.title, tx, ty, { width: tw, lineGap: 2 });
  ty = doc.y + 12;

  doc.fillColor(COL.sub).font("Helvetica").fontSize(18)
     .text(slide.body, tx, ty, { width: tw, lineGap: 4 });

  // ── footer: progress dots + page number ──
  const dotsY = PAGE_H - 56;
  const dotR = 5, gap = 18;
  const dotsW = total * gap - (gap - dotR * 2);
  let dx = (PAGE_W - dotsW) / 2;
  for (let i = 0; i < total; i++) {
    doc.circle(dx + i * gap, dotsY, dotR)
       .fill(i === idx ? COL.accent : "#333333");
  }
  doc.fillColor("#555555").font("Helvetica").fontSize(12)
     .text(`${idx + 1} / ${total}`, PAGE_W - 90, dotsY - 6, { width: 60, align: "right" });
}

function main() {
  const doc = new PDFDocument({ size: [PAGE_W, PAGE_H], margin: 0 });
  doc.pipe(fs.createWriteStream(OUT));
  SLIDES.forEach((s, i) => drawSlide(doc, s, i, SLIDES.length));
  doc.end();
  console.log("✅  PDF written →", OUT, `(${SLIDES.length} slides)`);
}

main();
