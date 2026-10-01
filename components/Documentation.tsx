"use client";
import { useState, useRef, useEffect } from "react";
import type { Document, Locale } from "@/content/types";
import { text } from "@/content/copy";
import { Media } from "./Media";
import { Dialog } from "./Dialog";
import {
  orderDocuments,
  type DocumentationPreviews,
} from "@/content/documentation";
export function Documentation({
  items,
  locale,
  project,
  previews = {},
}: {
  items: Document[];
  locale: Locale;
  project: string;
  previews?: DocumentationPreviews;
}) {
  const t = text(locale),
    [all, setAll] = useState(false),
    [active, setActive] = useState<number | null>(null),
    [zoom, setZoom] = useState(false),
    touch = useRef<{ x: number; y: number } | null>(null),
    stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    stage.current?.scrollTo({ left: 0, top: 0, behavior: "instant" });
  }, [active, zoom]);
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (items.some((item) => "document-" + item.id === hash)) {
      setAll(true);
      requestAnimationFrame(() =>
        document.getElementById(hash)?.scrollIntoView(),
      );
    }
  }, [items]);
  const ordered = orderDocuments(items);
  const gallery = ordered.flatMap((item) =>
    (item.images?.length ? item.images : item.image ? [item.image] : []).map(
      (image, index) => ({ item, image, index }),
    ),
  );
  const selected = ordered.slice(0, 6);
  const visible = all ? ordered : selected;
  const move = (direction: number) => {
    setActive((value) =>
      value === null
        ? null
        : (value + direction + gallery.length) % gallery.length,
    );
    setZoom(false);
  };
  const current = active === null ? null : gallery[active];
  if (!items.length)
    return (
      <div className="documentation-empty">
        <span aria-hidden="true">↗</span>
        <p>{t.prepared}</p>
      </div>
    );
  return (
    <>
      <div className="documentation-heading">
        <p>{all ? t.archiveView : t.curated}</p>
        {items.length > selected.length && (
          <button className="text-link" onClick={() => setAll(!all)}>
            {all ? t.showLess : t.allDocs} ({items.length}) ↗
          </button>
        )}
      </div>
      <div className="document-composition" data-count={visible.length}>
        {visible.map((item, i) => (
          <figure
            className={`document-item document-${i < 3 ? i : "archive"} orientation-${item.orientation || "landscape"}`}
            id={"document-" + item.id}
            key={item.id}
            data-fit={
              item.fit ||
              (item.evidence ||
              item.type === "report" ||
              item.orientation === "dashboard" ||
              /analytics|dashboard|spreadsheet|report|website|web screenshot|seo|analisis|laporan/i.test(
                item.category.en,
              )
                ? "contain"
                : "cover")
            }
          >
            <div
              className={
                item.type === "comparison" ? "comparison" : "document-images"
              }
            >
              {(item.images?.length
                ? item.images
                : item.image
                  ? [item.image]
                  : []
              ).map((image, j) => (
                <button
                  className="image-open"
                  key={image + j}
                  aria-label={`${t.openImage}: ${item.title[locale]} ${j + 1}`}
                  onClick={() => {
                    setActive(
                      gallery.findIndex(
                        (g) => g.item.id === item.id && g.index === j,
                      ),
                    );
                    setZoom(false);
                  }}
                >
                  <Media
                    src={previews[image]?.src || image}
                    srcSet={previews[image]?.srcSet}
                    sizes={
                      i === 0
                        ? "(max-width: 700px) 90vw, (max-width: 1279px) 82vw, 940px"
                        : "(max-width: 700px) 90vw, (max-width: 1024px) 40vw, 460px"
                    }
                    alt={item.alt[locale]}
                    fallback={t.prepared}
                  />
                  {item.type === "comparison" && (
                    <span className="comparison-label">
                      {j === 0 ? t.before : t.after}
                    </span>
                  )}
                  <span className="image-open-icon" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>
            <figcaption>
              <span className="caption">
                {t.figure} {String(ordered.indexOf(item) + 1).padStart(2, "0")}{" "}
                / {item.category[locale]}
              </span>
              <h3>{item.title[locale]}</h3>
              <p>{item.caption[locale]}</p>
              <span className="caption">
                {[project, item.period, item.source]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
              {item.file && (
                <a
                  className="text-link"
                  href={item.file}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.document} ↗
                </a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      {current && (
        <Dialog
          title={t.documentation}
          onClose={() => setActive(null)}
          className="lightbox"
          closeLabel={t.close}
          onKeyDown={(e) => {
            // While zoomed, arrows pan the focused image instead of changing it.
            if (zoom && e.target === stage.current) return;
            if (e.key === "ArrowRight") {
              e.preventDefault();
              move(1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="lightbox-content">
            <div
              ref={stage}
              className={"lightbox-stage" + (zoom ? " zoomed" : "")}
              tabIndex={zoom ? 0 : undefined}
              aria-label={
                zoom
                  ? locale === "en"
                    ? "Zoomed image. Scroll to inspect."
                    : "Gambar diperbesar. Gulir untuk melihat detail."
                  : undefined
              }
              onTouchStart={(e) =>
                (touch.current = {
                  x: e.touches[0].clientX,
                  y: e.touches[0].clientY,
                })
              }
              onTouchCancel={() => (touch.current = null)}
              onTouchEnd={(e) => {
                const start = touch.current;
                touch.current = null;
                if (!start || zoom) return;
                const difference = e.changedTouches[0].clientX - start.x;
                const vertical = e.changedTouches[0].clientY - start.y;
                if (
                  Math.abs(difference) > 65 &&
                  Math.abs(difference) > Math.abs(vertical)
                )
                  move(difference < 0 ? 1 : -1);
              }}
            >
              <Media
                key={current.image}
                src={current.image}
                alt={current.item.alt[locale]}
                fallback={t.unavailable}
                eager
              />
            </div>
            <div className="lightbox-meta">
              <span className="caption">
                FIG.{" "}
                {String(ordered.indexOf(current.item) + 1).padStart(2, "0")} /{" "}
                {current.item.category[locale]}
              </span>
              <h3>{current.item.title[locale]}</h3>
              <p>{current.item.caption[locale]}</p>
              <span className="caption">
                {[
                  project,
                  current.item.period,
                  current.item.source,
                  current.item.type === "comparison"
                    ? current.index === 0
                      ? t.before
                      : t.after
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </div>
            <div className="lightbox-controls">
              <button disabled={gallery.length < 2} onClick={() => move(-1)}>
                ← {t.previous}
              </button>
              <span>
                {active! + 1} / {gallery.length}
              </span>
              <button disabled={gallery.length < 2} onClick={() => move(1)}>
                {t.nextImage} →
              </button>
              <button
                aria-pressed={zoom}
                onClick={() => {
                  setZoom(!zoom);
                  if (!zoom)
                    requestAnimationFrame(() =>
                      stage.current?.focus({ preventScroll: true }),
                    );
                }}
              >
                {zoom ? t.fit : t.zoom}
              </button>
              <a href={current.image} target="_blank" rel="noreferrer">
                {t.original} ↗
              </a>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
