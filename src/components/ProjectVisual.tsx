"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import type { Project } from "@/data/projects";

export default function ProjectVisual({
  project,
  image,
  caption,
  className = "",
  fit = "contain",
}: {
  project: Project;
  image?: string;
  caption?: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const { t } = useLang();

  return (
    <div className={`card-notched relative overflow-hidden bg-paper-soft ${className}`}>
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
          <Image
            src={image}
            alt={caption ?? t(project.title)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 88vw, 1900px"
            quality={100}
            unoptimized
            className={`object-top ${
              fit === "contain"
                ? "object-contain p-4 md:p-6"
                : "object-cover object-top"
            }`}
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

    </div>
  );
}
