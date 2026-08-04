import { ImageResponse } from "next/og";
import { getPost } from "@/data/blog";
import { SITE } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog — Alan Buendía";

const INK = "#0b0b0a";
const PAPER = "#e8e4da";
const ACID = "#c7f000";
const MUTE = "#bdb9af";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title.es ?? "Blog";
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          color: PAPER,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* acid spine */}
        <div style={{ width: 16, height: "100%", background: ACID }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ACID,
              fontWeight: 700,
            }}
          >
            Blog · alanbuendia.dev
          </div>

          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 66 : 82,
              lineHeight: 1.02,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {tags.slice(0, 4).map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  border: `1px solid ${MUTE}`,
                  color: MUTE,
                  fontSize: 22,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  padding: "8px 16px",
                }}
              >
                {t}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", fontSize: 24, color: MUTE }}>
              {SITE.name}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
