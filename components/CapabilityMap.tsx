"use client";
import { SectionArt } from "./SectionArt";
import { useState, type CSSProperties } from "react";
import type { Locale } from "@/content/types";
import { text } from "@/content/copy";
const points = [
  [350, 78],
  [563, 180],
  [616, 413],
  [468, 592],
  [232, 592],
  [84, 413],
  [137, 180],
];
const short = {
  en: [
    "Planning · Positioning",
    "Meta Ads · Google Ads",
    "SEO · Search Console",
    "Landing pages · HTML/CSS/JS",
    "Copywriting · Creative",
    "GA4 · Tracking",
    "Setup · Operations",
  ],
  id: [
    "Rencana · Posisi brand",
    "Meta Ads · Google Ads",
    "SEO · Search Console",
    "Landing page · HTML/CSS/JS",
    "Teks · Kreatif",
    "GA4 · Pelacakan",
    "Setup · Operasional",
  ],
};
export function CapabilityMap({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0),
    t = text(locale);
  return (
    <section className="capabilities section" id="capabilities">
      <SectionArt variant="index" />
      <div className="section-heading">
        <p className="eyebrow">{t.capabilities}</p>
        <h2>
          {locale === "en"
            ? "Marketing at the core. Hands-on across the stack."
            : "Berpusat pada pemasaran. Terlibat langsung di setiap tahap."}
        </h2>
        <p>
          {locale === "en"
            ? "Growth is my main focus. These seven capabilities help me connect the plan with the work that makes it happen."
            : "Pertumbuhan bisnis menjadi fokus utama saya. Tujuh bidang ini membantu saya menghubungkan rencana dengan pelaksanaannya."}
        </p>
      </div>
      <div
        className="capability-map"
        aria-label={
          locale === "en"
            ? "Seven capabilities connected to digital marketing and growth"
            : "Tujuh bidang yang terhubung dengan digital marketing dan pertumbuhan"
        }
      >
        <svg
          className="map-connections"
          viewBox="0 0 700 700"
          aria-hidden="true"
        >
          <circle cx="350" cy="350" r="272" className="map-orbit" />
          {points.map(([x, y], i) => (
            <line
              pathLength="1"
              key={i}
              x1="350"
              y1="350"
              x2={x}
              y2={y}
              className={active === i ? "connection active" : "connection"}
            />
          ))}
          <circle cx="350" cy="350" r="110" className="map-inner-orbit" />
        </svg>
        <div className="map-core">
          <span className="caption">
            {locale === "en" ? "The core" : "Fokus utama"}
          </span>
          <strong>
            DIGITAL
            <br />
            MARKETING
          </strong>
          <span className="map-plus">+</span>
          <strong>GROWTH</strong>
        </div>
        {t.capabilityGroups.map(([name], i) => (
          <button
            key={String(name)}
            type="button"
            className="capability-node"
            style={
              {
                "--x": `${points[i][0] / 7}%`,
                "--node-order": i,
                "--y": `${points[i][1] / 7}%`,
              } as CSSProperties
            }
            aria-pressed={active === i}
            aria-controls="capability-detail"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="node-number">0{i + 1}</span>
            <strong>{name as string}</strong>
            <span>{short[locale][i]}</span>
          </button>
        ))}
      </div>
      <div
        className="capability-detail"
        id="capability-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="caption">0{active + 1} / 07</span>
        <h3>{t.capabilityGroups[active][0] as string}</h3>
        <p>{(t.capabilityGroups[active][1] as string[]).join(" · ")}</p>
      </div>
      <p className="map-hint caption">
        {locale === "en"
          ? "Select a capability to explore its role."
          : "Pilih bidang untuk melihat perannya."}
      </p>
    </section>
  );
}
