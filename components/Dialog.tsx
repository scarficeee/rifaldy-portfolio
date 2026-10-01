"use client";
import { useEffect, useRef, type ReactNode, type KeyboardEvent } from "react";
export function Dialog({
  title,
  onClose,
  children,
  className = "",
  onKeyDown,
  closeLabel = "Close",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = ref.current!;
    const previous = document.activeElement as HTMLElement;
    const position = { top: window.scrollY, left: window.scrollX };
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      window.scrollTo({ ...position, behavior: "instant" });
      previous?.focus({ preventScroll: true });
    };
  }, []);
  function close() {
    const node = ref.current!;
    node.classList.add("closing");
    const reduced =
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off";
    setTimeout(onClose, reduced ? 0 : 160);
  }
  return (
    <dialog
      onKeyDown={onKeyDown}
      ref={ref}
      className={className}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close();
        }
      }}
    >
      <div className="dialog-bar">
        <span>{title}</span>
        <button onClick={close} aria-label={closeLabel}>
          ×
        </button>
      </div>
      {children}
    </dialog>
  );
}
