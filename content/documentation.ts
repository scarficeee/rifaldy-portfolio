import type { Document } from "./types";

// Keep a featured image first without dropping its supporting documents.
export function orderDocuments(items: Document[]) {
  return [
    ...items.filter((item) => item.featured),
    ...items.filter((item) => !item.featured),
  ];
}

export type DocumentationPreview = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

export type DocumentationPreviews = Record<string, DocumentationPreview>;
