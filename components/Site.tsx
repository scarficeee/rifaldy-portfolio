import type { ReactNode } from "react";
import type { Locale, Project } from "@/content/types";
import { text, localPath } from "@/content/copy";
import { FieldNotes } from "./FieldNotes";
import { Chrome } from "./Chrome";
import { Contact } from "./Contact";
export function Site({
  locale,
  children,
  className = "",
  project,
}: {
  locale: Locale;
  children: ReactNode;
  className?: string;
  project?: Project;
}) {
  return (
    <>
      <Chrome locale={locale} />
      <FieldNotes locale={locale} project={project} />
      <main id="main" className={className}>
        {children}
        <Contact locale={locale} />
      </main>
    </>
  );
}
export function CaseLink({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  return (
    <a className="text-link" href={localPath(locale, `/work/${project.slug}/`)}>
      {text(locale).viewCase} <span aria-hidden="true">↗</span>
    </a>
  );
}
export function Metrics({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = text(locale);
  return (
    <div className={"metrics metrics-" + project.slug}>
      {project.metrics.map((metric, i) => (
        <div className={"metric metric-" + i} key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{t.metricLabels[metric.label]}</span>
          {metric.evidenceId &&
            project.documentation.some((d) => d.id === metric.evidenceId) && (
              <a
                className="caption"
                href={localPath(
                  locale,
                  `/work/${project.slug}/#document-${metric.evidenceId}`,
                )}
              >
                {t.documentation} ↗
              </a>
            )}
        </div>
      ))}
    </div>
  );
}
