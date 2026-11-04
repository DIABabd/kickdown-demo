/** Block structure for the legal pages (generated from CONTENT.md). */
export type Inline = string | { text: string; href: string };

export type LegalBlock =
  | { t: "h"; level: number; text: string }
  | { t: "p"; parts: Inline[] }
  | { t: "ul"; items: Inline[][] }
  | { t: "linkblock"; lines: string[]; href: string };
