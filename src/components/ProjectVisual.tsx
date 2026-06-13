"use client";

import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import type { Project } from "@/data/projects";

/**
 * Stylized project artwork used in cards, banners and screen slots.
 * Works as a designed placeholder until real screenshots/videos are
 * dropped into the project data — if `project.video` exists it plays
 * on hover, if an `image` is passed it renders that instead.
 */
export default function ProjectVisual({
  project,
  image,
  caption,
  className = "",
  hoverVideo = false,
  fit = "cover",
}: {
  project: Project;
  image?: string;
  caption?: string;
  className?: string;
  hoverVideo?: boolean;
  fit?: "cover" | "contain";
}) {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={`relative overflow-hidden bg-paper-soft ${className}`}
      onMouseEnter={() => hoverVideo && videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {/* tinted wash + blueprint grid */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(150deg, ${project.color}33 0%, ${project.color}0a 55%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={caption ?? t(project.title)}
            className={`absolute inset-0 h-full w-full ${
              fit === "contain"
                ? "object-contain p-8"
                : "object-cover object-top"
            }`}
            loading="lazy"
          />
          {caption && (
            <span className="u-label absolute bottom-4 right-4 rounded-full border border-line bg-paper px-3 py-1.5 text-ink">
              {caption}
            </span>
          )}
        </>
      ) : (
        <>
          {/* giant index numeral */}
          <span
            className="display absolute -bottom-[0.18em] left-[0.04em] select-none leading-none"
            style={{
              fontSize: "min(38cqw, 16rem)",
              color: "transparent",
              WebkitTextStroke: `2px ${project.color}`,
              opacity: 0.65,
            }}
            aria-hidden="true"
          >
            {project.index}
          </span>
          {/* floating monogram chip */}
          <span
            className="display absolute right-[8%] top-[12%] select-none text-[clamp(2rem,9cqw,4.5rem)] leading-none"
            style={{ color: project.color }}
            aria-hidden="true"
          >
            {t(project.title)
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
          {caption && (
            <span className="u-label absolute bottom-4 right-4 rounded-full border border-line bg-paper px-3 py-1.5 text-ink">
              {caption}
            </span>
          )}
        </>
      )}

      {project.video && hoverVideo && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
