import type { Metadata } from "next";
import Link from "next/link";
import { pageTitleId } from "@/components/site/page-ids";
import { PageShell } from "@/components/site/page-shell";
import styles from "@/components/site/page.module.css";
import { Team } from "@/components/team/team";
import { ausbildung } from "@/content/ausbildung";
import { team } from "@/content/team";

export const metadata: Metadata = { title: "Fahrschullehrer Team Fahrschule Kickdown" }; // T1

/** /team – the same team component as the homepage + link to /ausbildungsfahrschule (DESIGN.md 3.2). */
export default function TeamPage() {
  return (
    <PageShell
      page="team" title={team.title} starts="night" ends="night">
      <Team labelledBy={pageTitleId("team")}>
        <p style={{ margin: "32px 0 0" }}>
          <Link href="/ausbildungsfahrschule" className={styles.link} style={{ color: "var(--kd-blau)" }}>
            {ausbildung.title}
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </Team>
    </PageShell>
  );
}
