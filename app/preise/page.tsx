import type { Metadata } from "next";
import { PAGE_TITLE_ID, PageShell } from "@/components/site/page-shell";
import { Preise } from "@/components/tageslicht/preise";
import { preise } from "@/content/preise";

export const metadata: Metadata = { title: "Fahrschule Kickdown | Preise" }; // P0

/** /preise – the same price component as the homepage (DESIGN.md 3.2). */
export default function PreisePage() {
  return (
    <PageShell title={preise.title} starts="day" ends="day">
      <Preise labelledBy={PAGE_TITLE_ID} />
    </PageShell>
  );
}
