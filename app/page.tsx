import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Kontakt } from "@/components/kontakt/kontakt";
import { Seam } from "@/components/site/seam";
import { Preise } from "@/components/tageslicht/preise";
import { Zeiten } from "@/components/tageslicht/zeiten";
import { Willkommen } from "@/components/willkommen/willkommen";

/**
 * The homepage, kept short on purpose: hero, a short welcome, prices and
 * times, and a way to get in touch. Team and vehicles have their own full
 * pages (/team, /fahrzeuge), reachable from the header nav and the footer
 * on every page – their content isn't repeated here. The sign-up
 * simulation and the station-by-station "Strecke" journey were removed
 * (DESIGN.md); "Anmelden" is now a call action.
 */
export default function Home() {
  return (
    <>
      <Hero>
        {/* hero: night */}
        <Seam />
        {/* day, through to the end of the page */}
        <Willkommen />
        <Preise />
        <Zeiten />
        <Kontakt />
        <Seam />
      </Hero>
      {/* night */}
      <Footer />
    </>
  );
}
