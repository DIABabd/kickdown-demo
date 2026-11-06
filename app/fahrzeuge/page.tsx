import type { Metadata } from "next";
import { Showroom } from "@/components/showroom/showroom";
import { pageTitleId } from "@/components/site/page-ids";
import { PageShell } from "@/components/site/page-shell";
import { fahrzeuge } from "@/content/fahrzeuge";

export const metadata: Metadata = { title: "Fahrschulfahrzeuge" }; // F1

/** /fahrzeuge – the same showroom as the homepage (DESIGN.md 3.2). */
export default function FahrzeugePage() {
  return (
    <PageShell
      page="fahrzeuge" title={fahrzeuge.title} starts="night" ends="night">
      <Showroom labelledBy={pageTitleId("fahrzeuge")} />
    </PageShell>
  );
}
