import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Journey } from "@/components/journey/journey";
import { Kontakt } from "@/components/kontakt/kontakt";
import { Seam } from "@/components/site/seam";
import { Preise } from "@/components/tageslicht/preise";
import { Zeiten } from "@/components/tageslicht/zeiten";
import { Willkommen } from "@/components/willkommen/willkommen";

/**
 * The homepage: the full-screen hero, the road journey (Anmeldung → Theorie →
 * Fahrstunden → Prüfung, each with its real text and one link), a short
 * welcome, prices and times, and a way to get in touch. Team and vehicles
 * have their own pages (/team, /fahrzeuge), reachable from the header nav
 * and the footer. The sign-up simulation stays removed: "Anmelden" leads to
 * /kontakt, where the visitor can call the school.
 */
export default function Home() {
  return (
    <>
      <Hero>
        {/* the road journey follows the hero directly (the hero fades into it) */}
        <Journey />
        <Seam />
        <Willkommen />
        <Preise page="start" />
        <Zeiten />
        <Kontakt />
        <Seam />
      </Hero>
      <Footer page="start" />
    </>
  );
}
