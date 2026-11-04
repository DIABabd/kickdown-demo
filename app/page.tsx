import { Hero } from "@/components/hero/hero";
import { Journey } from "@/components/journey/journey";

// Phase 1: hero + scroll journey so far (DESIGN.md 3.1). Other sections come later.
export default function Home() {
  return (
    <Hero>
      <Journey />
    </Hero>
  );
}
