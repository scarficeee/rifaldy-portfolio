"use client";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import { text, localPath } from "@/content/copy";
import { Dialog } from "./Dialog";
import { Monogram } from "./Monogram";
import { motionEnabled, markInternalNavigation } from "./motion-preferences";
const ids = ["profile", "work", "approach", "experience", "contact"];
export function Chrome({ locale }: { locale: Locale }) {
  const t = text(locale),
    [menu, setMenu] = useState(false),
    [activeSection, setActiveSection] = useState(""),
    [theme, setTheme] = useState("paper"),
    [motion, setMotion] = useState(true);
  useEffect(() => {
    try {
      setTheme(localStorage.getItem("rr-theme") || "paper");
      setMotion(motionEnabled());
      localStorage.setItem("rr-language", locale);
      const saved = sessionStorage.getItem("rr-language-scroll");
      if (saved) {
        sessionStorage.removeItem("rr-language-scroll");
        const { path, position } = JSON.parse(saved);
        if (location.pathname === path)
          requestAnimationFrame(() =>
            window.scrollTo({ top: position, behavior: "instant" }),
          );
      }
    } catch {}
  }, [locale]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    const system = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(motionEnabled());
    sync();
    system.addEventListener("change", sync);
    return () => system.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (location.pathname.includes("/work/")) {
      setActiveSection("work");
      return;
    }
    let pending = false;
    const update = () => {
      pending = false;
      const marker = window.innerHeight * 0.3;
      const current = ids
        .filter((id) => {
          const node = document.getElementById(id);
          return node && node.getBoundingClientRect().top <= marker;
        })
        .at(-1);
      setActiveSection(
        scrollY >= document.documentElement.scrollHeight - innerHeight - 8
          ? "contact"
          : current || "",
      );
    };
    const scroll = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  const changeLanguage = (target: Locale) => {
    try {
      localStorage.setItem("rr-language", target);
      const path = location.pathname.replace(/^\/id(?=\/|$)/, "") || "/";
      const next = localPath(target, path);
      sessionStorage.setItem(
        "rr-language-scroll",
        JSON.stringify({ path: next, position: window.scrollY }),
      );
      markInternalNavigation(next);
      location.assign(next + location.hash);
    } catch {
      location.assign(localPath(target));
    }
  };
  const options = (
    <div className="preferences">
      <div className="languages" aria-label="Language / Bahasa">
        {(["en", "id"] as const).map((l) => (
          <button
            key={l}
            aria-pressed={locale === l}
            onClick={() => changeLanguage(l)}
            lang={l}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          const next = theme === "ink" ? "paper" : "ink";
          setTheme(next);
          try {
            localStorage.setItem("rr-theme", next);
          } catch {}
        }}
      >
        {t.reading}
        <span>{theme === "ink" ? t.ink : t.paper}</span>
      </button>
      <button
        onClick={() => {
          setMotion(!motion);
          try {
            localStorage.setItem("rr-motion", !motion ? "on" : "off");
          } catch {}
          dispatchEvent(new Event("rr-motion-change"));
          setMotion(motionEnabled());
        }}
      >
        {t.motion}
        <span>{motion ? t.on : t.off}</span>
      </button>
    </div>
  );
  const nav = (
    <nav aria-label={t.menu}>
      {ids.map((id, i) => (
        <a
          key={id}
          aria-current={activeSection === id ? "location" : undefined}
          href={localPath(locale, "/#" + id)}
          onClick={() => setMenu(false)}
        >
          <span>0{i + 1}</span>
          {t.nav[i]}
        </a>
      ))}
    </nav>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <aside className="side-index">
        <a
          className="rr-mark"
          href={localPath(locale)}
          aria-label={"Rifaldy Rizqya — " + t.home}
        >
          <Monogram />
        </a>
        {nav}
        <div className="side-bottom">
          <p>Growth, by design.</p>
          {options}
          <small>Bandung, Indonesia</small>
        </div>
      </aside>
      <header className="mobile-header">
        <a href={localPath(locale)}>RIFALDY RIZQYA</a>
        <div className="mobile-actions">
          <button
            onClick={() => changeLanguage(locale === "en" ? "id" : "en")}
            aria-label="Switch language / Ganti bahasa"
          >
            {locale.toUpperCase()} / {locale === "en" ? "ID" : "EN"}
          </button>
          <button onClick={() => setMenu(true)}>{t.menu} +</button>
        </div>
      </header>
      {menu && (
        <Dialog
          closeLabel={t.close}
          title={t.menu}
          onClose={() => setMenu(false)}
          className="menu-dialog"
        >
          {nav}
          {options}
        </Dialog>
      )}
    </>
  );
}
