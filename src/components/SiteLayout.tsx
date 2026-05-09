import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { AdSlot } from "./AdSlot";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg tracking-tight">
            <span className="text-primary">2048</span> Play
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2 text-sm">
            <Link to="/" className="px-2 py-1 rounded hover:bg-accent" activeOptions={{ exact: true }} activeProps={{ className: "px-2 py-1 rounded bg-accent font-medium" }}>Play</Link>
            <Link to="/about" className="px-2 py-1 rounded hover:bg-accent" activeProps={{ className: "px-2 py-1 rounded bg-accent font-medium" }}>About</Link>
            <Link to="/contact" className="px-2 py-1 rounded hover:bg-accent" activeProps={{ className: "px-2 py-1 rounded bg-accent font-medium" }}>Contact</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Top banner ad */}
      <div className="max-w-6xl w-full mx-auto px-4">
        <AdSlot slot="1111111111" label="Sponsored" />
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="min-w-0">{children}</div>
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <AdSlot slot="2222222222" format="rectangle" label="Sponsored" />
          </div>
        </aside>
      </main>

      {/* Bottom banner ad */}
      <div className="max-w-6xl w-full mx-auto px-4">
        <AdSlot slot="3333333333" label="Sponsored" />
      </div>

      <footer className="border-t border-border mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-muted-foreground flex flex-wrap justify-between gap-4">
          <p>© {new Date().getFullYear()} 2048 Play. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
