import { useEffect, useRef } from "react";

export function StrideShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const inSectionRef = useRef(false);
  const currentFlavourRef = useRef<{ flavourId: number; color: string }>({
    flavourId: 0,
    color: "#D49B3E",
  });

  useEffect(() => {
    let rafId: number;
    const isVisibleRef = { current: false };

    const updateProgress = () => {
      if (!containerRef.current || !iframeRef.current) return;
      // Skip layout calculation and cross-window messaging when section is not in viewport
      if (!isVisibleRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / total));

      try {
        const cw = iframeRef.current.contentWindow;
        if (cw) {
          if (typeof (cw as any).setExternalScrollProgress === "function") {
            (cw as any).setExternalScrollProgress(progress);
          } else {
            cw.postMessage({ strideProgress: progress }, "*");
          }
        }
      } catch {
        // ignore cross-origin edge cases
      }

      // Check whether user is actively within the bottles section
      const inSection = rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.65;
      if (inSection !== inSectionRef.current) {
        inSectionRef.current = inSection;
        if (inSection) {
          // Entering bottles section -> sync to active bottle color
          window.dispatchEvent(
            new CustomEvent("srsti-water-palette-change", {
              detail: {
                flavourId: currentFlavourRef.current.flavourId,
                color: currentFlavourRef.current.color,
                isDefault: false,
              },
            })
          );
        } else {
          // Leaving bottles section -> revert to default website liquid gold
          window.dispatchEvent(
            new CustomEvent("srsti-water-palette-change", {
              detail: { isDefault: true },
            })
          );
        }
      }
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    // Sleep 3D Three.js engine when outside the viewport; resume smoothly with 300px margin
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        isVisibleRef.current = visible;
        try {
          const cw = iframeRef.current?.contentWindow;
          if (cw) {
            cw.postMessage({ type: visible ? "STRIDE_RESUME" : "STRIDE_PAUSE" }, "*");
          }
        } catch {}
        if (visible) {
          updateProgress();
        }
      },
      { rootMargin: "300px 0px 300px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleFlavourUpdate = (data: { flavourId?: number; color?: string }) => {
      if (data.flavourId != null && data.color) {
        currentFlavourRef.current = {
          flavourId: data.flavourId,
          color: data.color,
        };
      }
      // ONLY apply color change if user is actively in the bottles section!
      if (inSectionRef.current) {
        window.dispatchEvent(
          new CustomEvent("srsti-water-palette-change", {
            detail: {
              flavourId: currentFlavourRef.current.flavourId,
              color: currentFlavourRef.current.color,
              isDefault: false,
            },
          })
        );
      }
    };

    const onMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "STRIDE_FLAVOUR_CHANGE") {
        handleFlavourUpdate(event.data);
      } else if (event.data && event.data.type === "STRIDE_READY") {
        try {
          const cw = iframeRef.current?.contentWindow;
          if (cw) {
            cw.postMessage(
              { type: isVisibleRef.current ? "STRIDE_RESUME" : "STRIDE_PAUSE" },
              "*"
            );
          }
        } catch {}
      }
    };
    window.addEventListener("message", onMessage);

    (window as any).onStrideFlavourChange = (data: any) => {
      handleFlavourUpdate(data);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("message", onMessage);
      delete (window as any).onStrideFlavourChange;
      cancelAnimationFrame(rafId);

      // On unmount, ensure default palette is restored
      window.dispatchEvent(
        new CustomEvent("srsti-water-palette-change", {
          detail: { isDefault: true },
        })
      );
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="stride-experience"
      aria-label="Interactive 3D Artisanal Oil Showcase"
      className="relative w-full h-[400vh] bg-transparent"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-transparent">
        <iframe
          ref={iframeRef}
          src="/stride-showcase.html"
          title="SRSTI 3D Pressing Experience"
          className="h-full w-full border-0 block bg-transparent"
          loading="eager"
          allow="autoplay; fullscreen"
          // @ts-expect-error React allowtransparency legacy attribute
          allowtransparency="true"
          onLoad={() => {
            if (!containerRef.current || !iframeRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            const progress = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
            try {
              const cw = iframeRef.current.contentWindow;
              if (cw && typeof (cw as any).setExternalScrollProgress === "function") {
                (cw as any).setExternalScrollProgress(progress);
              }
            } catch {}

            // Check if user is scrolled inside bottles section on initial load
            const inSection = rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.65;
            inSectionRef.current = inSection;
            if (inSection) {
              window.dispatchEvent(
                new CustomEvent("srsti-water-palette-change", {
                  detail: {
                    flavourId: currentFlavourRef.current.flavourId,
                    color: currentFlavourRef.current.color,
                    isDefault: false,
                  },
                })
              );
            }
          }}
        />
      </div>
    </section>
  );
}
