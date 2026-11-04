// Generates content/impressum.ts and content/datenschutz.ts from CONTENT.md,
// so the legal texts stay word for word (no retyping).
// Run: node scripts/extract-legal.mjs
import { readFileSync, writeFileSync } from "node:fs";

const md = readFileSync(new URL("../CONTENT.md", import.meta.url), "utf8").replace(/\r\n/g, "\n");

/** Old-site page links → new routes (DESIGN.md 3.2). */
const ROUTES = {
  "index.html": "/",
  "team.html": "/team",
  "theoretischer-unterricht.html": "/unterricht#theorie",
  "praktischer-unterricht.html": "/unterricht#praxis",
  "fahrzeuge.html": "/fahrzeuge",
  "ausbildungsfahrschule.html": "/ausbildungsfahrschule",
  "preise.html": "/preise",
  "kontakt.html": "/kontakt",
  "impressum.html": "/impressum",
  "datenschutz.html": "/datenschutz",
};
const mapHref = (href) => ROUTES[href] ?? href;

/** "text [label](url) more" → ["text ", {text, href}, " more"] */
function inline(line) {
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    parts.push({ text: m[1], href: mapHref(m[2]) });
    last = re.lastIndex;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}

/** Content between "### Inhalt (wörtlich)" of a page and the next "---". */
function section(pageHeading) {
  const start = md.indexOf(pageHeading);
  if (start < 0) throw new Error(`${pageHeading} not in CONTENT.md`);
  const body = md.indexOf("### Inhalt (wörtlich)", start) + "### Inhalt (wörtlich)".length;
  const end = md.indexOf("\n---\n", body);
  return md.slice(body, end).trim();
}

function parse(text, skipTitle) {
  const lines = text.split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    i++;
    if (!line) continue;
    const h = line.match(/^(#{4,6}) (.*)$/);
    if (h) {
      if (h[2] === skipTitle) continue; // becomes the page's <h1>
      blocks.push({ t: "h", level: h[1].length - 2, text: h[2] }); // #### → h2, ##### → h3, ###### → h4
      continue;
    }
    // A link spanning several lines/paragraphs: "[Fahrschule Kickdown" … "28199 Bremen](url)"
    if (line.startsWith("[") && !/\]\([^)]+\)/.test(line)) {
      const parts = [line.slice(1)];
      while (i < lines.length) {
        const l = lines[i].trim();
        i++;
        if (!l) continue;
        const end = l.match(/^(.*)\]\(([^)]+)\)$/);
        if (end) {
          parts.push(end[1]);
          blocks.push({ t: "linkblock", lines: parts, href: mapHref(end[2]) });
          break;
        }
        parts.push(l);
      }
      continue;
    }
    if (line.startsWith("- ")) {
      const items = [inline(line.slice(2))];
      while (i < lines.length && (lines[i].trim() === "" || lines[i].trim().startsWith("- "))) {
        const l = lines[i].trim();
        i++;
        if (l) items.push(inline(l.slice(2)));
        else if (!(lines[i] ?? "").trim().startsWith("- ")) break;
      }
      blocks.push({ t: "ul", items });
      continue;
    }
    blocks.push({ t: "p", parts: inline(line) });
  }
  return blocks;
}

function write(file, name, title, blocks) {
  const src = `/**
 * GENERATED from CONTENT.md by scripts/extract-legal.mjs – do not edit by hand.
 * ${title}: old-site text, word for word (links to old .html pages mapped
 * to the new routes). Must be reviewed and adapted before going live.
 */
import type { LegalBlock } from "./legal-types";

export const ${name} = {
  title: ${JSON.stringify(title)},
  blocks: ${JSON.stringify(blocks, null, 2)} satisfies LegalBlock[],
} as const;
`;
  writeFileSync(new URL(`../content/${file}`, import.meta.url), src);
  console.log(`content/${file}: ${blocks.length} blocks`);
}

write("impressum.ts", "impressum", "Impressum", parse(section("## Seite: Impressum"), "Impressum"));
write("datenschutz.ts", "datenschutz", "Datenschutzerklärung", parse(section("## Seite: Datenschutzerklärung"), "Datenschutzerklärung"));
