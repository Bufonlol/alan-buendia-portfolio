import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css?family=Anton:wght@400",
      {
        headers: {
          // Old UA → Google serves TTF/WOFF instead of WOFF2 (Satori compatible)
          "User-Agent":
            "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)",
        },
      }
    ).then((r) => r.text());
    const url = css.match(/url\(([^)]+)\)/)?.[1];
    if (!url) return null;
    return fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const anton = await loadFont();

  const paper = "#F3EFE6";
  const ink = "#181511";
  const accent = "#DD4A12";

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "52px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 5,
          height: "100%",
          backgroundColor: accent,
        }}
      />

      {/* top meta */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 13,
            letterSpacing: "0.14em",
            color: ink,
            opacity: 0.4,
            fontFamily: "sans-serif",
          }}
        >
          FRONTEND DEVELOPER
        </span>
        <span
          style={{
            fontSize: 13,
            letterSpacing: "0.14em",
            color: accent,
            opacity: 0.75,
            fontFamily: "sans-serif",
          }}
        >
          ORIZABA, MX
        </span>
      </div>

      {/* hero name */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: anton ? "Anton" : "Impact, Arial Black, sans-serif",
            fontSize: 172,
            color: ink,
            lineHeight: 0.88,
            letterSpacing: "0.01em",
          }}
        >
          ALAN
        </span>
        <span
          style={{
            fontFamily: anton ? "Anton" : "Impact, Arial Black, sans-serif",
            fontSize: 172,
            color: accent,
            lineHeight: 0.88,
            letterSpacing: "0.01em",
          }}
        >
          BUENDÍA◆
        </span>
      </div>

      {/* bottom */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span
            style={{
              fontSize: 21,
              fontStyle: "italic",
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: ink,
              opacity: 0.5,
            }}
          >
            interfaces que se sienten inevitables
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {["React", "TypeScript", "GSAP", "Three.js"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 12,
                  padding: "5px 15px",
                  border: `1.5px solid rgba(24,21,17,0.22)`,
                  borderRadius: 100,
                  color: ink,
                  fontFamily: "sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.08em",
            color: ink,
            opacity: 0.3,
            fontFamily: "sans-serif",
          }}
        >
          alanbuendia.dev
        </span>
      </div>
    </div>,
    {
      ...size,
      ...(anton
        ? { fonts: [{ name: "Anton", data: anton, weight: 400, style: "normal" }] }
        : {}),
    }
  );
}
