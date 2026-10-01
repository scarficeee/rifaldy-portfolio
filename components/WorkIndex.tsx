import type { Locale } from "@/content/types";
import { projects } from "@/content/projects";
import { text, localPath } from "@/content/copy";
import { SectionArt } from "./SectionArt";
export function WorkIndex({ locale }: { locale: Locale }) {
  const t = text(locale);
  return (
    <section id="work" className="work work-index section">
      <SectionArt variant="index" />
      <div className="section-heading">
        <p className="eyebrow">{t.work}</p>
        <h2>{t.workIntro}</h2>
      </div>
      <div className="work-index-list">
        {projects.map((p) => (
          <article
            key={p.slug}
            id={`work-${p.slug}`}
            data-project={p.slug}
            className="work-index-row"
          >
            <span className="work-index-number">{p.number}</span>
            <div className="work-index-identity">
              <h3>
                <a href={localPath(locale, `/work/${p.slug}/`)}>{p.company}</a>
              </h3>
              <p>{p.role?.[locale]}</p>
              <span>{p.index.capabilities[locale]}</span>
            </div>
            <div className="work-index-output">
              <p>{p.index.output[locale]}</p>
              {p.metrics.length > 0 && (
                <div className="micro-metrics">
                  {p.metrics.map((metric) => (
                    <span key={metric.label}>
                      <span>
                        {t.metricLabels[metric.label]} <b>{metric.value}</b>
                      </span>
                      <i aria-hidden="true">
                        <i
                          style={{
                            width:
                              (Number(metric.value.replace(/[+%,]/g, "")) /
                                Math.max(
                                  ...p.metrics.map((m) =>
                                    Number(m.value.replace(/[+%,]/g, "")),
                                  ),
                                )) *
                                100 +
                              "%",
                          }}
                        />
                      </i>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <a
              className="text-link work-index-link"
              href={localPath(locale, `/work/${p.slug}/`)}
              aria-label={`${t.viewCase}: ${p.company}`}
            >
              {t.viewCase}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
