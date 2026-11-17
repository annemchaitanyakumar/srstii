import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stride")({
  head: () => ({
    meta: [
      { title: "SRSTI 3D Experience — 100% Raw Cold Pressed Oils" },
      {
        name: "description",
        content: "Experience SRSTI single-origin cold pressed oils in immersive 3D. Traditional neem-wood ghani extraction, unrefined and pure.",
      },
      { property: "og:title", content: "SRSTI 3D Experience — Cold Pressed Oils" },
    ],
  }),
  component: StrideWrapper,
});

function StrideWrapper() {
  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen overflow-hidden bg-[#1c1a1f]">
      <iframe
        src="/stride.html"
        title="Stride Experience"
        className="h-full w-full border-0"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
