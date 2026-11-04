import Link from "next/link";
import type { Inline, LegalBlock } from "@/content/legal-types";
import { kontaktUi } from "@/content/kontakt";
import styles from "./page.module.css";

/** Inline text with links: internal → next/link, outbound → new tab (plain link, nothing loaded). */
export function InlineText({ parts }: { parts: readonly Inline[] }) {
  return (
    <>
      {parts.map((p, i) => {
        if (typeof p === "string") return <span key={i}>{p}</span>;
        if (p.href.startsWith("/")) {
          return (
            <Link key={i} href={p.href} className={styles.link}>
              {p.text}
            </Link>
          );
        }
        const external = /^https?:/.test(p.href);
        return (
          <a
            key={i}
            href={p.href}
            className={styles.link}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {p.text}
            {external && <span className="sr-only"> {kontaktUi.newTab}</span>}
          </a>
        );
      })}
    </>
  );
}

/** Renders a legal text (generated from CONTENT.md) – plain, readable, no animation. */
export function LegalBody({ blocks }: { blocks: readonly LegalBlock[] }) {
  return (
    <div className={styles.prose}>
      {blocks.map((b, i) => {
        if (b.t === "h") {
          const Tag = (["h2", "h3", "h4"] as const)[Math.min(2, Math.max(0, b.level - 2))];
          return <Tag key={i}>{b.text}</Tag>;
        }
        if (b.t === "ul") {
          return (
            <ul key={i}>
              {b.items.map((item, j) => (
                <li key={j}>
                  <InlineText parts={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (b.t === "linkblock") {
          const external = /^https?:/.test(b.href);
          return (
            <p key={i}>
              <a
                href={b.href}
                className={styles.link}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {b.lines.map((l, j) => (
                  <span key={j} className={styles.line}>
                    {l}
                  </span>
                ))}
                {external && <span className="sr-only"> {kontaktUi.newTab}</span>}
              </a>
            </p>
          );
        }
        // Lines that end with ":" are labels on the old site (e.g. "Bildquellen:")
        const plain = b.parts.length === 1 && typeof b.parts[0] === "string" ? b.parts[0] : null;
        return (
          <p key={i} className={plain?.endsWith(":") ? styles.label : undefined}>
            <InlineText parts={b.parts} />
          </p>
        );
      })}
    </div>
  );
}
