import { Hero } from "@/components/hero/hero";
import { Journey } from "@/components/journey/journey";
import { Showroom } from "@/components/showroom/showroom";
import { Team } from "@/components/team/team";
import { Preise } from "@/components/tageslicht/preise";
import { Zeiten } from "@/components/tageslicht/zeiten";

// Phase 1: hero, scroll journey, prices, times, showroom and team so far (DESIGN.md 3.1).
export default function Home() {
  return (
    <Hero>
      <Journey />
      <Preise />
      <Zeiten />
      <Showroom />
      <Team />
    </Hero>
  );
}
