import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — 2048 Play" },
      { name: "description", content: "About 2048 Play: a free, modern online version of the classic 2048 puzzle game." },
      { property: "og:title", content: "About — 2048 Play" },
      { property: "og:description", content: "Learn about 2048 Play and how the game works." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <article className="py-8 prose prose-sm dark:prose-invert max-w-none">
        <h1 className="text-3xl font-extrabold mb-4">About 2048 Play</h1>
        <p>
          2048 Play is a free, browser-based version of the classic <strong>2048</strong> puzzle
          created by Gabriele Cirulli in 2014. Our goal is simple: deliver the smoothest, fastest,
          and most accessible 2048 experience on any device.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2">Why we built it</h2>
        <p>
          We love minimalist puzzle games. 2048 is one of the purest examples — easy to learn,
          impossibly hard to master. We built this version with a clean design, dark mode, swipe
          controls, and automatic score saving so you can pick up where you left off.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2">Features</h2>
        <ul>
          <li>4×4 classic grid</li>
          <li>Keyboard and touch controls</li>
          <li>Best score saved locally</li>
          <li>Auto-resume your last game</li>
          <li>Light and dark themes</li>
          <li>Installable on mobile (PWA)</li>
        </ul>
      </article>
    </SiteLayout>
  );
}
