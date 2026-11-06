/**
 * Page-scoped element ids.
 *
 * With `cacheComponents`, Next keeps the previously visited page in the DOM
 * (hidden, inside a React Activity boundary) when you navigate. An id that
 * exists on two pages would then be in the document twice, and
 * `aria-labelledby` / `aria-controls` / `<label for>` could resolve to the
 * hidden copy – a screen reader would announce the wrong page's heading.
 *
 * React's `useId()` doesn't help: every route tree has the same shape, so it
 * produces the same ids on every page. Instead each route has a fixed key,
 * and every heading / label id is built from it. Anchor targets (section ids
 * such as `#zeiten` or `#theorie`) are not scoped – links keep working.
 */
export type PageKey =
  | "start"
  | "unterricht"
  | "preise"
  | "fahrzeuge"
  | "team"
  | "ausbildungsfahrschule"
  | "kontakt"
  | "impressum"
  | "datenschutz"
  | "cookie-einstellungen";

/** `<page>-<name>`, unique across the whole site. */
export const pageId = (page: PageKey, name: string) => `${page}-${name}`;

/** id of a page's main heading (homepage hero <h1>, subpage <h1>). */
export const pageTitleId = (page: PageKey) => pageId(page, "title");
