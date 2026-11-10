import type { Metadata, Viewport } from "next";
import { Archivo, Atkinson_Hyperlegible_Next } from "next/font/google";
import { DebugPanel } from "@/components/site/debug-panel";
import { SiteMotion } from "@/components/site/site-motion";
import { start } from "@/content/start";
import "./globals.css";

// Self-hosted by next/font at build time – no request to Google at runtime.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  display: "swap",
  // next/font has no metric overrides for this family (build warning);
  // the CSS stack falls back to system-ui instead.
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: `${start.title} – Private Demo`,
    template: "%s – Private Demo",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#05070A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${archivo.variable} ${atkinson.variable}`}>
      <body>
        {children}
        <SiteMotion />
        {/* temporary: only renders with ?debug=1 */}
        <DebugPanel />
      </body>
    </html>
  );
}
