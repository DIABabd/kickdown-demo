"use client";

import type { FocusEvent, ReactNode } from "react";

/**
 * The vehicle list. On phones it is a sideways-swipe row; browsers only
 * scroll a focused card into view if none of it is visible, so a card
 * peeking in from the edge would stay mostly hidden. This brings the
 * focused card fully into the row (instant with reduced motion, because
 * `behavior` follows the CSS scroll-behavior).
 */
export function BayRow({ className, children }: { className?: string; children: ReactNode }) {
  const onFocus = (e: FocusEvent<HTMLUListElement>) => {
    const item = (e.target as HTMLElement).closest("li");
    item?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <ul className={className} onFocus={onFocus}>
      {children}
    </ul>
  );
}
