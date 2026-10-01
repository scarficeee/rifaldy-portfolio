import type { Locale, Project } from "@/content/types";
import { text, localPath } from "@/content/copy";

/** Each project uses one linear percentage scale; bar length never implies raw counts. */
export function PerformanceGraphic({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = text(locale);
  const values = project.metrics.map((m) =>
    Number(m.value.replace(/[+%,]/g, "")),
  );
  const maximum = Math.max(...values);
  if (!values.length || !Number.isFinite(maximum) || maximum <= 0) return null;
  return (
    <figure className="performance-graphic">
      <figcaption>
        <span>{t.performanceChange}</span>
        <span>{t.percentageScale}</span>
      </figcaption>
      <ul>
        {project.metrics.map((metric, index) => (
          <li key={metric.label}>
            <div className="performance-label">
              <span>{t.metricLabels[metric.label]}</span>
              <strong>{metric.value}</strong>
            </div>
            <div className="performance-track" aria-hidden="true">
              <span style={{ width: `${(values[index] / maximum) * 100}%` }} />
            </div>
            {metric.evidenceId &&
              project.documentation.some((document) => document.id === metric.evidenceId) && (
                <a className="caption performance-evidence" href={localPath(locale, `/work/${project.slug}/#document-${metric.evidenceId}`)}>
                  {t.documentation} ↗
                </a>
              )}
          </li>
        ))}
      </ul>
      <div className="performance-axis" aria-hidden="true">
        <span>0%</span>
        <span>{project.metrics[values.indexOf(maximum)].value}</span>
      </div>
    </figure>
  );
}
