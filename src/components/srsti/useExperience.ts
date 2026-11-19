import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { sceneState } from "@/lib/srsti/scene-state";
import { scrollRef } from "@/lib/srsti/smooth-scroll";

/**
 * Wires Lenis smooth scroll to GSAP ScrollTrigger and feeds scroll + pointer
 * data into the shared scene state. Mount once per page.
 */
export function useExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    sceneState.reducedMotion = reduce.matches;
    sceneState.dark = document.documentElement.classList.contains("dark");

    let lastY = window.scrollY;
    const updateScroll = (y: number) => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      sceneState.progress = Math.min(1, Math.max(0, y / max));
      sceneState.viewports = y / window.innerHeight;
      const v = Math.abs(y - lastY);
      sceneState.velocity = sceneState.velocity * 0.85 + v * 0.15;
      lastY = y;
    };

    let lenis: Lenis | null = null;
    let lenisRafId = 0;
    const onNativeScroll = () => updateScroll(window.scrollY);

    if (!reduce.matches) {
      // Responsive, agile lerp (0.20): provides luxurious luxury editorial glide with instant tactile zero-latency response
      lenis = new Lenis({
        lerp: 0.20,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false,
      });
      scrollRef.lenis = lenis;
      lenis.on("scroll", (l: Lenis) => {
        ScrollTrigger.update();
        updateScroll(l.scroll);
      });

      // Drive Lenis on direct hardware rAF to prevent GSAP ticker clock desynchronization
      const raf = (time: number) => {
        lenis?.raf(time);
        lenisRafId = requestAnimationFrame(raf);
      };
      lenisRafId = requestAnimationFrame(raf);
    } else {
      window.addEventListener("scroll", onNativeScroll, { passive: true });
    }
    updateScroll(window.scrollY);

    // velocity decays when scrolling stops
    const decay = gsap.ticker.add(() => {
      if (sceneState.velocity > 0.001) {
        sceneState.velocity *= 0.94;
      } else if (sceneState.velocity !== 0) {
        sceneState.velocity = 0;
      }
    });

    let pointerTicking = false;
    let pendingPointerEvent: PointerEvent | null = null;
    const onPointer = (e: PointerEvent) => {
      pendingPointerEvent = e;
      if (!pointerTicking) {
        pointerTicking = true;
        requestAnimationFrame(() => {
          if (pendingPointerEvent) {
            sceneState.pointer.x = (pendingPointerEvent.clientX / window.innerWidth) * 2 - 1;
            sceneState.pointer.y = -(pendingPointerEvent.clientY / window.innerHeight) * 2 + 1;
            sceneState.pointer.moved = true;
          }
          pointerTicking = false;
        });
      }
    };
    const onDown = (e: PointerEvent) => {
      onPointer(e);
      sceneState.tap = true;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    const onReduce = () => {
      sceneState.reducedMotion = reduce.matches;
    };
    reduce.addEventListener("change", onReduce);

    // re-measure after images and fonts settle
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("load", refresh);
      reduce.removeEventListener("change", onReduce);
      cancelAnimationFrame(lenisRafId);
      gsap.ticker.remove(decay as unknown as gsap.TickerCallback);
      lenis?.destroy();
      scrollRef.lenis = null;
    };
  }, []);
}
