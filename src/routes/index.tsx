import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Game2048 } from "@/components/Game2048";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Play 2048 — Free Online Puzzle Game" },
      { name: "description", content: "Play the original 2048 puzzle game online. Combine tiles, beat your high score, works on mobile and desktop." },
      { property: "og:title", content: "Play 2048 — Free Online Puzzle Game" },
      { property: "og:description", content: "Combine tiles to reach 2048. Free, fast, mobile-friendly." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Game2048 />
    </SiteLayout>
  );
}
