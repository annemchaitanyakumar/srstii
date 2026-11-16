import { useCallback, useEffect, useState } from "react";

import { sceneState } from "@/lib/srsti/scene-state";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    const apply = () => {
      root.classList.toggle("dark", next);
      sceneState.dark = next;
      setDark(next);
      try {
        localStorage.setItem("srsti-theme", next ? "dark" : "light");
      } catch {
        /* storage unavailable */
      }
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next ? "#0E0D0B" : "#FAF7F2");
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as DocWithVT;
    if (doc.startViewTransition && !reduce && origin) {
      const r = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      );
      const vt = doc.startViewTransition(apply);
      vt.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${origin.x}px ${origin.y}px)`,
                `circle(${r}px at ${origin.x}px ${origin.y}px)`,
              ],
            },
            {
              duration: 900,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => undefined);
    } else {
      root.classList.add("theme-fade");
      apply();
      window.setTimeout(() => root.classList.remove("theme-fade"), 700);
    }
  }, []);

  return { dark, toggle };
}
