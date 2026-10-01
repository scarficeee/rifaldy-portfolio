import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import "@/styles/globals.css";
import "@/styles/professional.css";
import "@/styles/master.css";
import "@/styles/motion.css";
import "@/styles/documentation.css";
import { Motion } from "./Motion";
import { openingScript } from "./motion-preferences";
export function Root({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f2eee6" />
        <script
          dangerouslySetInnerHTML={{
            __html: openingScript,
          }}
        />
      </head>
      <body>
        <Motion />
        {children}
      </body>
    </html>
  );
}
