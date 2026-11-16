import { ClientOnly } from "@tanstack/react-router";
import { ResadexWater } from "./ResadexWater";

function StaticWaterFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[#b9d6a8]"
    />
  );
}

/** Fixed, full-viewport Resadex liquid-water canvas that sits behind the whole page. */
export function OilBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <ClientOnly fallback={<StaticWaterFallback />}>
        <ResadexWater />
      </ClientOnly>
    </div>
  );
}
