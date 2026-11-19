import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import seeds from "@/assets/craft-seeds.webp";
import press from "@/assets/craft-press.webp";
import pour from "@/assets/craft-pour.webp";
import bottle from "@/assets/product-groundnut.webp";
import { FadeUp, SplitReveal } from "./motion";

const STEPS = [
  {
    no: "I",
    title: "The Seed",
    kicker: "Heirloom, single-origin",
    body: "Kadiri groundnuts, black til, West Coast copra — native varieties grown without synthetic inputs and sun-dried on the farms that raise them.",
    image: seeds,
    alt: "Heirloom groundnuts, black sesame and coconut on raw linen",
    metrics: [
      ["14", "Partner farms"],
      ["0", "Hybrid seeds"],
    ],
  },
  {
    no: "II",
    title: "The Kachi Ghani",
    kicker: "Slow-turn wooden press",
    body: "A pestle of seasoned neem turns inside a wooden mortar, crushing seed against seed. The wood absorbs heat; the oil keeps its aroma, colour and nutrients.",
    image: press,
    alt: "Traditional wooden kachi ghani oil press crushing seeds",
    metrics: [
      ["12", "Revolutions / min"],
      ["6 h", "Per 20 kg batch"],
    ],
    wheel: true,
  },
  {
    no: "III",
    title: "Zero Heat",
    kicker: "Below body temperature",
    body: "Where refineries heat oil past 200°C, our press never crosses 35°C. No hexane, no bleaching, no deodorising — just the first, honest pressing.",
    image: pour,
    alt: "Golden cold-pressed oil pouring into a brass bowl",
    metrics: [
      ["< 35°C", "Extraction"],
      ["0%", "Solvents"],
    ],
    thermo: true,
  },
  {
    no: "IV",
    title: "Rest & Bottle",
    kicker: "Sun-settled, unfiltered",
    body: "The oil rests seven days in steel so sediment settles naturally, then is hand-filled into UV-shielding glass and stamped with its batch.",
    image: bottle,
    alt: "SRSTI cold-pressed groundnut oil in a glass bottle",
    metrics: [
      ["7 days", "Natural settling"],
      ["100%", "Batch traced"],
    ],
    product: true,
  },
];

function PressWheel() {
  return (
    <svg data-wheel viewBox="0 0 200 200" className="size-full text-gold" aria-hidden>
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 6"
      />
      <circle cx="100" cy="100" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={100 + 92 * Math.cos((i * Math.PI) / 6)}
          y2={100 + 92 * Math.sin((i * Math.PI) / 6)}
          stroke="currentColor"
          strokeWidth={i % 3 === 0 ? 1 : 0.4}
        />
      ))}
    </svg>
  );
}

export function Craft() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current;
      const sec = section.current;
      if (!el || !sec) return;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
      el.querySelectorAll<HTMLElement>("[data-float]").forEach((n, i) => {
        gsap.fromTo(
          n,
          { y: 60 + i * 10 },
          {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: n,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
      el.querySelectorAll<SVGElement>("[data-wheel]").forEach((w) => {
        gsap.to(w, {
          rotate: 300,
          transformOrigin: "50% 50%",
          ease: "none",
          scrollTrigger: {
            trigger: w,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
      el.querySelectorAll<HTMLElement>("[data-thermo]").forEach((t) => {
        gsap.fromTo(
          t,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: t,
              containerAnimation: tween,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      id="craft"
      aria-labelledby="craft-title"
      className="relative overflow-hidden bg-veil lg:h-screen"
    >
      <div ref={track} className="flex flex-col lg:h-full lg:w-max lg:flex-row lg:items-center">
        {/* intro */}
        <div className="flex shrink-0 flex-col justify-center px-5 py-24 md:px-10 lg:h-full lg:w-[52vw] lg:py-0 lg:pl-[8vw]">
          <p className="eyebrow mb-6">The Wood-Pressed Journey</p>
          <SplitReveal
            as="h2"
            text="Slow is the secret ingredient."
            className="font-display text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.95] tracking-tight"
          />
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              <span id="craft-title" className="sr-only">
                The Craft
              </span>
              <em className="font-display text-2xl not-italic text-foreground">Kachi ghani</em> —
              literally “raw press” — is how India made oil for three thousand years. We never
              stopped.
            </p>
          </FadeUp>
          <p className="mt-12 hidden items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground lg:flex">
            <span className="h-px w-16 bg-gold" /> Keep scrolling
          </p>
        </div>

        {STEPS.map((s) => (
          <article
            key={s.no}
            className="grid shrink-0 items-center gap-8 px-5 pb-20 md:px-10 last:pb-6 lg:h-full lg:w-[78vw] lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-[4vw] lg:pb-0"
            aria-labelledby={`step-${s.no}`}
          >
            <div className="relative h-[62vh] min-h-[380px] overflow-hidden rounded-[2rem] shadow-glass lg:h-[72vh]">
              {s.product ? (
                <div className="grain absolute inset-0 flex items-end justify-center bg-linen">
                  <img
                    data-parallax
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    width={720}
                    height={926}
                    className="h-[92%] w-auto object-contain drop-shadow-2xl"
                  />
                </div>
              ) : (
                <img
                  data-parallax
                  src={s.image}
                  alt={s.alt}
                  loading="lazy"
                  width={1100}
                  height={1375}
                  className="absolute inset-0 h-full w-[125%] max-w-none -translate-x-[10%] object-cover"
                />
              )}
              <span className="absolute left-6 top-5 font-display text-7xl italic text-primary-foreground/90 mix-blend-difference">
                {s.no}
              </span>
              {s.wheel && (
                <div className="absolute -bottom-10 -right-10 size-48 opacity-80 lg:size-64">
                  <PressWheel />
                </div>
              )}
            </div>

            <div data-float className="max-w-md">
              <p className="eyebrow">{s.kicker}</p>
              <h3
                id={`step-${s.no}`}
                className="mt-4 font-display text-5xl font-medium leading-none md:text-6xl"
              >
                {s.title}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {s.body}
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-foreground/10 pt-6">
                {s.metrics.map(([v, l]) => (
                  <div key={l}>
                    <dd className="font-display text-4xl text-gold-gradient">{v}</dd>
                    <dt className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {l}
                    </dt>
                  </div>
                ))}
              </dl>
              {s.thermo && (
                <div className="mt-8 flex items-end gap-4" aria-hidden>
                  <div className="relative h-28 w-2 overflow-hidden rounded-full bg-foreground/10">
                    <div
                      data-thermo
                      className="absolute inset-x-0 bottom-0 h-[32%] origin-bottom rounded-full bg-gold-gradient"
                    />
                  </div>
                  <div className="space-y-6 text-xs text-muted-foreground">
                    <p>Refined oils · 200°C+</p>
                    <p className="text-foreground">SRSTI · under 35°C</p>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
        <div className="hidden shrink-0 lg:block lg:w-[10vw]" aria-hidden />
      </div>
    </section>
  );
}
