import { createFileRoute } from "@tanstack/react-router";

import { Collection } from "@/components/srsti/Collection";
import { Craft } from "@/components/srsti/Craft";
import { Footer } from "@/components/srsti/Footer";
import { Header } from "@/components/srsti/Header";
import { Hero } from "@/components/srsti/Hero";
import { OilBackdrop } from "@/components/srsti/OilBackdrop";
import { Purity } from "@/components/srsti/Purity";
import { Rituals } from "@/components/srsti/Rituals";
import { WaterTouchRipple } from "@/components/srsti/WaterTouchRipple";
import { useExperience } from "@/components/srsti/useExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SRSTI — Wood-Pressed Oils & A2 Ghee | Liquid Heritage" },
      {
        name: "description",
        content:
          "Kachi ghani wood-pressed groundnut, coconut and black sesame oils plus A2 Gir cow ghee — pressed under 35°C, traceable to the farm.",
      },
      { property: "og:title", content: "SRSTI — Pure. Unrefined. Liquid Heritage." },
      {
        property: "og:description",
        content:
          "Ultra-premium wood-pressed oils and A2 ghee, pressed under 35°C and traceable batch by batch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useExperience();
  return (
    <>
      <OilBackdrop />
      <WaterTouchRipple />
      <Header />
      <main id="main">
        <Hero />
        <Craft />
        <Collection />
        <Purity />
        <Rituals />
      </main>
      <Footer />
    </>
  );
}
