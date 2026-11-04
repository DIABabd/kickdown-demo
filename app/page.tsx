import { Anmeldung } from "@/components/anmeldung/anmeldung";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Journey } from "@/components/journey/journey";
import { Kontakt } from "@/components/kontakt/kontakt";
import { Showroom } from "@/components/showroom/showroom";
import { Preise } from "@/components/tageslicht/preise";
import { Zeiten } from "@/components/tageslicht/zeiten";
import { Team } from "@/components/team/team";

// The complete homepage, in the order of DESIGN.md 3.1.
export default function Home() {
  return (
    <>
      <Hero>
        <Journey />
        <Preise />
        <Zeiten />
        <Showroom />
        <Team />
        <Kontakt />
        <Anmeldung />
      </Hero>
      <Footer />
    </>
  );
}
