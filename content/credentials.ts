import type { Localized } from "./types";
// Add the actual certificate title, issuer, date and public verification link.
export const credentials: {
  title: Localized;
  issuer: string;
  year?: string;
  url?: string;
}[] = [];
