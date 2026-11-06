"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ui } from "@/content/start";
import styles from "./site.module.css";

/**
 * Header navigation. From 1024 px the links sit in the header; below that
 * a "Menü" button opens them as a panel. Escape or choosing a link closes
 * the panel and returns focus to the button. Without JavaScript the
 * button can't open the panel, but the phone bottom bar and the footer
 * still link to every section.
 */
export function NavMenu({ listId }: { listId: string }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={styles.nav} aria-label={ui.nav.label}>
      <button
        ref={button}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.menuIcon} data-open={open || undefined} aria-hidden="true" />
        {ui.nav.menu}
      </button>
      <ul id={listId} className={styles.navLinks} data-open={open || undefined}>
        {ui.nav.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={styles.navLink}
              aria-current={pathname === l.href ? "page" : undefined}
              onClick={close}
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <a href={ui.nav.contact.href} className={styles.navCta} onClick={close}>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
              <path
                d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
                fill="currentColor"
              />
            </svg>
            {ui.nav.contact.label}
          </a>
        </li>
      </ul>
    </nav>
  );
}
