import { Anmeldung } from "@/components/anmeldung/anmeldung";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Journey } from "@/components/journey/journey";
import { Kontakt } from "@/components/kontakt/kontakt";
import { Showroom } from "@/components/showroom/showroom";
import { Seam } from "@/components/site/seam";
import { Preise } from "@/components/tageslicht/preise";
import { Zeiten } from "@/components/tageslicht/zeiten";
import { Team } from "@/components/team/team";
import { Willkommen } from "@/components/willkommen/willkommen";

// The complete homepage, in the order of DESIGN.md 3.1.
// Night = how it feels, day = what people read and act on. Every switch
// between the two is marked by the same crisp <Seam /> (asphalt + dashed line).
export default function Home() {
  return (
    <>
      <Hero>
        {/* hero: night */}
        <Seam />
        {/* day */}
        <Willkommen />
        <Seam />
        {/* night */}
        <Journey />
        <Seam />
        {/* day */}
        <Preise />
        <Zeiten />
        <Seam />
        {/* night */}
        <Team />
        <Showroom />
        <Seam />
        {/* day */}
        <Kontakt />
        <Anmeldung />
        <Seam />
      </Hero>
      {/* night */}
      <Footer />
    </>
  );
}
