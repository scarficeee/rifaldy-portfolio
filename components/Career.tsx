import type { Locale } from "@/content/types";
import { career } from "@/content/career";
import { text, localPath } from "@/content/copy";
import { SectionArt } from "./SectionArt";
export function Career({ locale }: { locale: Locale }) {
  const t = text(locale);
  return (
    <section className="experience section" id="experience">
      <SectionArt variant="career" />
      <div className="section-heading">
        <p className="eyebrow">{t.experience}</p>
        <h2>
          {locale === "en"
            ? "A connected path to digital marketing."
            : "Perjalanan yang terhubung ke digital marketing."}
        </h2>
        <p>
          {locale === "en"
            ? "Tour operations taught me to think about the whole customer journey. Marketing, copy, data and web work gave me more ways to shape it."
            : "Operasional tur mengajarkan saya untuk melihat perjalanan pelanggan secara utuh. Pemasaran, penulisan teks, data, dan web memberi saya lebih banyak cara untuk membentuknya."}
        </p>
      </div>
      <div
        className="career-evolution"
        aria-label={
          locale === "en" ? "Career progression" : "Perkembangan karier"
        }
      >
        {(locale === "en"
          ? [
              "Tourism & operations",
              "Digital marketing foundation",
              "Copy, data & performance",
              "SEO, web & full-stack execution",
              "Brand & marketing leadership",
            ]
          : [
              "Pariwisata & operasional",
              "Dasar digital marketing",
              "Teks, data & performa",
              "SEO, web & pelaksanaan full-stack",
              "Kepemimpinan brand & pemasaran",
            ]
        ).map((s, i) => (
          <span key={s}>
            <small>{2022 + i}</small>
            {s}
          </span>
        ))}
      </div>
      <ol className="career-timeline">
        {career.map((entry, i) => (
          <li
            key={entry.name + entry.role.en}
            className={entry.slug ? "career-featured" : "career-foundation"}
          >
            <div className="career-marker">
              {(i === 0 ||
                career[i - 1].start.slice(0, 4) !==
                  entry.start.slice(0, 4)) && (
                <strong>{entry.start.slice(0, 4)}</strong>
              )}
              <p>{entry.period[locale]}</p>
            </div>
            <div className="career-company">
              <h3>{entry.name}</h3>
              <p>{entry.role[locale]}</p>
              {entry.overlap && (
                <span className="career-overlap">{entry.overlap[locale]}</span>
              )}
            </div>
            <div className="career-context">
              <span className="caption">{entry.tags[locale]}</span>
              <p>{entry.note[locale]}</p>
              {entry.slug && (
                <a
                  className="text-link"
                  href={localPath(locale, `/work/${entry.slug}/`)}
                >
                  {t.viewCase} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
