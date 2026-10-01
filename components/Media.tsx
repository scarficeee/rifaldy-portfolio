"use client";
import { useEffect, useRef, useState } from "react";
export function Media({
  src,
  alt,
  fallback,
  portrait = false,
  srcSet,
  sizes,
  eager = false,
}: {
  src: string;
  alt: string;
  fallback: string;
  portrait?: boolean;
  srcSet?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false),
    [failed, setFailed] = useState(false),
    ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setFailed(false);
    setLoaded(false);
    const image = ref.current;
    if (image?.complete) {
      setLoaded(image.naturalWidth > 0);
      setFailed(!image.naturalWidth);
    }
  }, [src]);
  return (
    <div
      className={
        (portrait ? "portrait-media" : "document-media") +
        (!loaded ? " media-pending" : "")
      }
    >
      {!failed && (
        <img
          ref={ref}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          style={{ opacity: loaded ? 1 : 0 }}
          loading={portrait || eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      {!loaded && (
        <div className="media-placeholder">
          <span aria-hidden="true">{portrait ? "R / R" : "—"}</span>
          {failed && <p>{fallback}</p>}
        </div>
      )}
    </div>
  );
}
