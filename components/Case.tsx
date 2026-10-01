import type { Locale, Project } from "@/content/types";
import { projects } from "@/content/projects";
import { text, localPath, periodLabel } from "@/content/copy";
import { Site } from "./Site";
import { PerformanceGraphic } from "./PerformanceGraphic";
import { FieldNotes } from "./FieldNotes";
import { SectionArt } from "./SectionArt";
import { Documentation } from "./Documentation";
import documentationPreviews from "@/.generated/documentation-media.json";
import type { DocumentationPreviews } from "@/content/documentation";
export function Case({
  project: p,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = text(locale),
    next =
      projects[
        (projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length
      ];
  const chapters = [
    ["context", t.context, p.context],
    ["objective", t.objective, p.objective],
    ["role", t.responsibility, p.responsibility],
    ["strategy", t.strategy, p.strategy],
    ["execution", t.execution, p.execution],
  ] as const;
  return (
    <Site locale={locale} project={p} className={"case case-" + p.slug}>
      <header className="case-intro section">
        <SectionArt variant="case" />
        <a className="caption" href={localPath(locale, "/#work")}>
          ← {t.caseIndex}
        </a>
        <div className="case-heading">
          <span>{p.number}</span>
          <div>
            <p className="eyebrow">{p.company}</p>
            <h1>{p.title[locale]}</h1>
          </div>
        </div>
        <dl className="case-facts">
          <div>
            <dt>{p.industry[locale]}</dt>
            <dd>{p.type}</dd>
          </div>
          {p.role && (
            <div>
              <dt>{t.roleLabel}</dt>
              <dd>{p.role[locale]}</dd>
            </div>
          )}
          {p.period && (
            <div>
              <dt>{t.period}</dt>
              <dd>{periodLabel(p.period, locale)}</dd>
            </div>
          )}
        </dl>
        <FieldNotes locale={locale} project={p} inline />
        <nav
          className="chapter-nav"
          aria-label={locale === "en" ? "Case chapters" : "Bagian studi kasus"}
        >
          {chapters
            .filter((c) => c[2])
            .map((c) => (
              <a key={c[0]} href={"#" + c[0]}>
                {c[1]}
              </a>
            ))}
          {p.metrics.length > 0 && <a href="#results">{t.results}</a>}
          <a href="#documentation">{t.documentation}</a>
        </nav>
      </header>
      <div className="case-body section">
        {chapters
          .filter((c) => c[2])
          .map(([id, label, value]) => (
            <section className="case-chapter" id={id} key={id}>
              <h2>{label}</h2>
              <div>
                <p className={id === "context" ? "case-lead" : ""}>
                  {value![locale]}
                </p>
                {id === "role" && p.services.length > 0 && (
                  <div className="scope">
                    <span className="caption">{t.scope}</span>
                    <p>{p.services.map((s) => s[locale]).join(" / ")}</p>
                  </div>
                )}
              </div>
            </section>
          ))}
        {p.metrics.length > 0 && (
          <section className="case-results" id="results">
            <h2>{t.results}</h2>
            <PerformanceGraphic project={p} locale={locale} />
          </section>
        )}
        <section className="case-documentation" id="documentation">
          <div className="section-heading">
            <p className="eyebrow">{t.documentation}</p>
            <h2>{t.archiveIntro}</h2>
          </div>
          <Documentation
            items={p.documentation}
            project={p.company}
            locale={locale}
            previews={Object.fromEntries(
              p.documentation.flatMap((item) =>
                (item.images || (item.image ? [item.image] : [])).flatMap(
                  (src) => {
                    const preview = (
                      documentationPreviews as DocumentationPreviews
                    )[src];
                    return preview ? [[src, preview]] : [];
                  },
                ),
              ),
            )}
          />
        </section>
        {p.reflection && (
          <section className="case-chapter" id="reflection">
            <h2>{t.reflection}</h2>
            <p>{p.reflection[locale]}</p>
          </section>
        )}
      </div>
      <a
        className="next-case section"
        href={localPath(locale, `/work/${next.slug}/`)}
      >
        <span>
          {t.next} / {next.number}
        </span>
        <strong>{next.company}</strong>
        <span aria-hidden="true">↗</span>
      </a>
    </Site>
  );
}
