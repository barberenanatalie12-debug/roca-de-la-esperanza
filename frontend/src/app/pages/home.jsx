import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Sermons } from "../components/sermons";
import { VisitMap } from "../components/visit-map";
import { CTA } from "../components/cta";

export default function Home() {
  return (
    <div>
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="sermons">
        <Sermons />
      </div>
      <VisitMap />
      <CTA />
    </div>
  );
}
