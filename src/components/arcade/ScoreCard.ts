type Lang = "es" | "en";

const PAPER = "#f3efe6";
const INK = "#181511";
const ACCENT = "#dd4a12";
const MUTED = "#8b8474";

export async function renderScoreCard(score: number, hi: number, lang: Lang): Promise<Blob> {
  await Promise.all([
    document.fonts.load('400 100px Anton'),
    document.fonts.load('700 32px Archivo'),
    document.fonts.ready,
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, 1200, 1200);

  // notched frame, matching the .card-notched clip-path used across the site
  ctx.beginPath();
  ctx.moveTo(60, 60);
  ctx.lineTo(1080, 60);
  ctx.lineTo(1140, 120);
  ctx.lineTo(1140, 1140);
  ctx.lineTo(60, 1140);
  ctx.closePath();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.textAlign = "left";

  // monogram, hard-offset shadow (matches Signature.tsx)
  ctx.font = "400 160px Anton";
  ctx.fillStyle = INK;
  ctx.fillText("AB◆", 106, 226);
  ctx.fillStyle = ACCENT;
  ctx.fillText("AB◆", 100, 220);

  ctx.font = "700 32px Archivo";
  ctx.fillStyle = INK;
  ctx.fillText(lang === "es" ? "PUNTOS" : "SCORE", 100, 420);

  ctx.font = "400 260px Anton";
  ctx.fillStyle = INK;
  ctx.fillText(String(score).padStart(4, "0"), 100, 680);

  if (score > 0 && score >= hi) {
    ctx.font = "700 32px Archivo";
    ctx.fillStyle = ACCENT;
    ctx.fillText(lang === "es" ? "NUEVO RECORD" : "NEW HIGH SCORE", 100, 740);
  }

  // rotated sticker badge (matches StickerBadge.tsx)
  ctx.save();
  ctx.translate(960, 980);
  ctx.rotate((-6 * Math.PI) / 180);
  ctx.fillStyle = ACCENT;
  ctx.beginPath();
  ctx.arc(0, 0, 110, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PAPER;
  ctx.font = "700 26px Archivo";
  ctx.textAlign = "center";
  ctx.fillText("BUENDIA", 0, -8);
  ctx.fillText("BREAKER", 0, 22);
  ctx.restore();

  ctx.textAlign = "left";
  ctx.font = "700 24px Archivo";
  ctx.fillStyle = MUTED;
  ctx.fillText("ALANBUENDIA.DEV / ARCADE", 100, 1090);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/png");
  });
}

export async function shareScoreCard(score: number, hi: number, lang: Lang) {
  const blob = await renderScoreCard(score, hi, lang);
  const file = new File([blob], "buendia-breaker-score.png", { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "Buendía Breaker" });
      return;
    } catch {
      // user cancelled the native share sheet — fall back to a plain download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "buendia-breaker-score.png";
  a.click();
  URL.revokeObjectURL(url);
}
