import type Lenis from "lenis";

/** The single Lenis instance (null when reduced motion or before mount). */
export const scrollRef: { lenis: Lenis | null } = { lenis: null };

export function scrollToTarget(target: string | number) {
  if (scrollRef.lenis) {
    scrollRef.lenis.scrollTo(target, { duration: 1.6 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else {
    document.querySelector(target)?.scrollIntoView();
  }
}
