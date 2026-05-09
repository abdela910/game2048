import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScriptOnce,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE_URL = "https://2048play.example.com";
const ADSENSE_CLIENT = "ca-pub-5789369620960870"; // TODO: replace

const themeBootstrap = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-4 text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          Try again
        </button>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "2048 Play",
  description: "Play the classic 2048 puzzle game online — free, fast, and ad-supported.",
  genre: "Puzzle",
  applicationCategory: "Game",
  operatingSystem: "Any (web browser)",
  url: SITE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0f172a" },
      { title: "2048 Play — Free Online 2048 Puzzle Game" },
      { name: "description", content: "Play 2048 online for free. Slide and merge tiles to reach 2048. Mobile-friendly, dark mode, save your best score." },
      { name: "keywords", content: "2048, 2048 game, puzzle, online game, free game, html5 game" },
      { name: "author", content: "2048 Play" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "2048 Play — Free Online Puzzle Game" },
      { property: "og:description", content: "Slide, merge, and reach 2048. Play free in your browser." },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "2048 Play" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "2048 Play" },
      { name: "twitter:description", content: "Play 2048 free online." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
      ...(ADSENSE_CLIENT.includes("XXXX")
        ? []
        : [{
            async: true,
            src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
            crossOrigin: "anonymous" as const,
          }]),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ScriptOnce>{themeBootstrap}</ScriptOnce>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
