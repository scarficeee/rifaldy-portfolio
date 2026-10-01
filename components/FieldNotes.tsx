"use client";
import { useEffect, useState } from "react";
import type { Locale, Project } from "@/content/types";
import { projects } from "@/content/projects";
import { text, localPath } from "@/content/copy";
export function FieldNotes({
  locale,
  project,
  inline = false,
}: {
  locale: Locale;
  project?: Project;
  inline?: boolean;
}) {
  const [context, setContext] = useState("intro"),
    [progress, setProgress] = useState(0);
  useEffect(() => {
    if (inline) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - innerHeight;
      setProgress(height > 0 ? Math.min(1, Math.max(0, scrollY / height)) : 0);
      {
        const nodes = [
          ...document.querySelectorAll<HTMLElement>(
            "main section[id], main article[data-project], footer#contact",
          ),
        ];
        const current = nodes
          .filter((n) => n.getBoundingClientRect().top <= innerHeight * 0.32)
          .at(-1);
        setContext(
          height > 0 && scrollY >= height - 8
            ? "contact"
            : current?.id || "intro",
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [project, inline]);
  const t = text(locale),
    p =
      context === "contact"
        ? undefined
        : project || projects.find((p) => "work-" + p.slug === context),
    en = locale === "en";
  const labels: Record<string, string> = {
    intro: en ? "Current focus" : "Fokus saat ini",
    profile: en ? "Profile" : "Profil",
    impact: t.impact,
    work: t.work,
    approach: t.approach,
    experience: t.experience,
    capabilities: t.capabilities,
    tools: en ? "Tools / Stack" : "Tools / Perangkat",
    archive: t.documentation,
    contact: en ? "Contact" : "Kontak",
  };
  const tag = p
    ? `${en ? "CASE" : "KASUS"} ${p.number}`
    : context === "profile"
      ? en
        ? "PROFILE"
        : "PROFIL"
      : context === "capabilities"
        ? "STACK"
        : context === "contact"
          ? en
            ? "CONTACT"
            : "KONTAK"
          : en
            ? "FIELD NOTES"
            : "CATATAN";
  const selected = p?.metrics.find((m) => m.label === "leads");
  const evidence = p?.metrics.find(
    (m) => m.evidenceId && p.documentation.some((d) => d.id === m.evidenceId),
  );
  return (
    <aside
      className={
        "field-notes " + (inline ? "field-notes-inline" : "field-notes-rail")
      }
      aria-label={en ? "Field notes" : "Catatan singkat"}
    >
      <p className="field-signature">RR / {tag}</p>
      <div className="field-body" key={p?.slug || context}>
        <span className="caption">{p ? t.scope : labels[context]}</span>
        <h2>
          {p
            ? p.company
            : context === "contact"
              ? en
                ? "Let’s talk."
                : "Mari berbicara."
              : context === "capabilities"
                ? en
                  ? "Marketing at the core."
                  : "Berpusat pada pemasaran."
                : "Full-Stack Digital Marketing"}
        </h2>
        <p className="field-scope">
          {p
            ? p.services
                .slice(0, 4)
                .map((s) => s[locale])
                .join(" / ")
            : context === "capabilities"
              ? en
                ? "7 connected capabilities."
                : "7 bidang yang terhubung."
              : context === "contact"
                ? en
                  ? "A project, a role, or a collaboration."
                  : "Proyek, peluang kerja, atau kolaborasi."
                : "Growth / Web / Search / Content / Analytics"}
        </p>
        {selected && (
          <div className="field-result">
            <strong>{selected.value}</strong>
            <span>{t.metricLabels[selected.label]}</span>
            <div className="field-mini-chart" aria-hidden="true">
              {p!.metrics.map((m) => (
                <i
                  key={m.label}
                  style={{
                    height:
                      (Number(m.value.replace(/[+%,]/g, "")) /
                        Math.max(
                          ...p!.metrics.map((n) =>
                            Number(n.value.replace(/[+%,]/g, "")),
                          ),
                        )) *
                        100 +
                      "%",
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {p && !project && (
          <a className="text-link" href={localPath(locale, `/work/${p.slug}/`)}>
            {t.viewCase} ↗
          </a>
        )}
        {project && p && p.metrics.length > 0 && (
          <a className="text-link" href="#results">
            {en ? "View results" : "Lihat hasil"} ↗
          </a>
        )}
        {p && evidence && (
          <a
            className="text-link"
            href={localPath(
              locale,
              `/work/${p.slug}/#document-${evidence.evidenceId}`,
            )}
          >
            {t.documentation} ↗
          </a>
        )}
        {!p && context !== "contact" && (
          <div className="field-context">
            <span className="caption">
              {en ? "Now viewing" : "Sedang dilihat"}
            </span>
            <p>{labels[context]}</p>
          </div>
        )}
        {!p && context === "intro" && (
          <div className="field-selected">
            <span className="caption">
              {en ? "Selected impact / Japanect" : "Hasil pilihan / Japanect"}
            </span>
            <strong>
              +120% <small>{t.metricLabels.awareness}</small>
            </strong>
            <strong>
              +80% <small>{t.metricLabels.leads}</small>
            </strong>
          </div>
        )}
        {!p && context !== "intro" && context !== "contact" && (
          <div className="field-principle">
            <span className="caption">
              {en ? "Working principle" : "Prinsip kerja"}
            </span>
            <p>
              {en
                ? "Plan. Execute. Measure. Improve."
                : "Rencanakan. Jalankan. Ukur. Perbaiki."}
            </p>
          </div>
        )}
        {context === "contact" && (
          <a className="text-link" href="#contact">
            {t.brief} ↗
          </a>
        )}
      </div>
      {!inline && (
        <div className="field-reading">
          <div className="field-progress" aria-hidden="true">
            <span style={{ height: `${progress * 100}%` }} />
            <i style={{ top: `${progress * 100}%` }} />
          </div>
          <div>
            <span className="caption">
              {en ? "Reading progress" : "Progres membaca"}
            </span>
            <p>{String(Math.round(progress * 100)).padStart(2, "0")}%</p>
          </div>
        </div>
      )}
      {!inline && !project && (
        <nav
          className="field-index"
          aria-label={en ? "Case index" : "Indeks studi kasus"}
        >
          {projects.map((item) => (
            <a
              key={item.slug}
              href={`#work-${item.slug}`}
              aria-label={item.company}
              aria-current={p?.slug === item.slug ? "location" : undefined}
            >
              {item.number}
            </a>
          ))}
        </nav>
      )}
      <p className="field-location">
        <span className="location-dot" aria-hidden="true" /> BDG / Bandung,
        Indonesia
        <br />
        GMT+7
      </p>
    </aside>
  );
}
