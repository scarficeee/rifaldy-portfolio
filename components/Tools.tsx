import { SectionArt } from "./SectionArt";
import { stack, toolGroups } from "@/content/tools";
import type { Locale } from "@/content/types";
export function Tools({ locale }: { locale: Locale }) {
  return (
    <section className="tools section" id="tools">
      <SectionArt variant="grid" />
      <div className="section-heading">
        <p className="eyebrow">
          {locale === "en" ? "Tools / Stack" : "Tools / Perangkat"}
        </p>
        <h2>
          {locale === "en"
            ? "The tools behind the work."
            : "Perangkat di balik pekerjaan."}
        </h2>
        <p>
          {locale === "en"
            ? "Chosen for the task. The emphasis stays on reaching people, understanding results and improving the experience."
            : "Dipilih sesuai kebutuhan, untuk menjangkau orang, memahami hasil, dan memperbaiki pengalaman."}
        </p>
      </div>
      <div className="tool-groups">
        {toolGroups.map((group, i) => (
          <section
            className="tool-group"
            key={group.id}
            aria-labelledby={`tools-${group.id}`}
          >
            <h3 id={`tools-${group.id}`}>
              <span>0{i + 1}</span>
              {group.label[locale]}
            </h3>
            <ul className="tool-index">
              {stack
                .filter((tool) => tool.group === group.id)
                .map((tool) => (
                  <li
                    className={
                      "tool-item" + (tool.primary ? " tool-primary" : "")
                    }
                    key={tool.icon}
                  >
                    {tool.icon === "capcut" ? (
                      <img
                        className="tool-brand-image"
                        src="/icons/capcut.ico"
                        alt=""
                        width="28"
                        height="28"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className="tool-icon"
                        style={{
                          maskImage: `url(/icons/${tool.icon}.svg)`,
                          WebkitMaskImage: `url(/icons/${tool.icon}.svg)`,
                        }}
                        aria-hidden="true"
                      />
                    )}
                    <div>
                      <h4>{tool.name}</h4>
                      <p className="tool-note">{tool.note[locale]}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
