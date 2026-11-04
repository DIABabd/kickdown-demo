import { Hero } from "@/components/hero/hero";
import { Journey } from "@/components/journey/journey";
import { Preise } from "@/components/tageslicht/preise";
import { Zeiten } from "@/components/tageslicht/zeiten";

// Phase 1: hero, scroll journey, prices and times so far (DESIGN.md 3.1).
export default function Home() {
  return (
    <Hero>
      <Journey />
      <Preise />
      <Zeiten />
    </Hero>
  );
}
