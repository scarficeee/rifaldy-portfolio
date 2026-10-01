"use client";
import { useEffect } from "react";
import { Monogram } from "./Monogram";

import { motionEnabled, markInternalNavigation } from "./motion-preferences";
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const frames = new Map<HTMLElement, number>();
    const counted = new WeakSet<HTMLElement>();
    let disposed = false;
    let reveal: IntersectionObserver | undefined;
    let numbers: IntersectionObserver | undefined;
    const settle = () => {
      const enabled = motionEnabled();
      root.dataset.motion = enabled ? "on" : "off";
      if (!enabled) {
        frames.forEach((frame, node) => {
          cancelAnimationFrame(frame);
          node.textContent = node.dataset.countFinal!;
        });
        frames.clear();
      }
    };
    const system = matchMedia("(prefers-reduced-motion: reduce)");
    system.addEventListener("change", settle);
    addEventListener("rr-motion-change", settle);
    settle();

    const ready = () => {
      if (disposed || reveal) return;
      root.dataset.loading = "ready";
      root.dataset.navigation = "ready";
      reveal = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            target.classList.add("is-visible");
            reveal!.unobserve(target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      document
        .querySelectorAll<HTMLElement>(
          ".section-heading,.profile-copy,.portrait,.work-index-row,.career-evolution,.career-timeline>li,.capability-map,.performance-graphic,.impact-record,.contact-composition,.archive-links,.section-art",
        )
        .forEach((node) => {
          node.classList.add("motion-item");
          reveal!.observe(node);
        });
      numbers = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            const node = target as HTMLElement;
            if (!isIntersecting || counted.has(node)) return;
            counted.add(node);
            numbers!.unobserve(node);
            const final = node.dataset.countFinal!;
            const value = Number(final.replace(/[+%,]/g, ""));
            if (!motionEnabled() || !Number.isFinite(value)) return;
            const start = performance.now();
            node.dataset.countState = "running";
            const step = (now: number) => {
              const progress = Math.min(1, (now - start) / 900);
              node.textContent =
                "+" +
                Math.round(
                  value * (1 - Math.pow(1 - progress, 3)),
                ).toLocaleString("en-US") +
                "%";
              if (progress < 1) frames.set(node, requestAnimationFrame(step));
              else {
                node.textContent = final;
                node.dataset.countState = "done";
                frames.delete(node);
              }
            };
            frames.set(node, requestAnimationFrame(step));
          });
        },
        { threshold: 0.6 },
      );
      document
        .querySelectorAll<HTMLElement>(
          ".metrics .metric strong,.performance-label strong",
        )
        .forEach((node) => {
          node.dataset.countFinal = node.textContent || "";
          node.setAttribute("aria-label", node.dataset.countFinal);
          numbers!.observe(node);
        });
    };
    // Fonts may improve the first paint, but slow fonts never block usable content.
    const timeout = setTimeout(ready, 800);
    void document.fonts.ready.then(ready);
    const navigate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href);
      if (url.origin === location.origin && url.pathname !== location.pathname)
        markInternalNavigation(url.pathname);
    };
    const resume = () => {
      root.dataset.loading = "ready";
      root.dataset.navigation = "ready";
    };
    document.addEventListener("click", navigate);
    addEventListener("pageshow", resume);
    return () => {
      disposed = true;
      clearTimeout(timeout);
      reveal?.disconnect();
      numbers?.disconnect();
      frames.forEach(cancelAnimationFrame);
      document.removeEventListener("click", navigate);
      removeEventListener("pageshow", resume);
      removeEventListener("rr-motion-change", settle);
      system.removeEventListener("change", settle);
    };
  }, []);
  return (
    <>
      <div className="opening-screen" aria-hidden="true">
        <div className="opening-brand">
          <div className="rr-mark">
            <Monogram />
          </div>
          <i />
        </div>
      </div>
      <div className="route-progress" aria-hidden="true" />
    </>
  );
}
