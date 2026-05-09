import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — 2048 Play" },
      { name: "description", content: "How 2048 Play handles data, cookies, local storage, and advertising." },
      { property: "og:title", content: "Privacy Policy — 2048 Play" },
      { property: "og:description", content: "Our privacy practices and how we use cookies and ads." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteLayout>
      <article className="py-8 prose prose-sm dark:prose-invert max-w-none">
        <h1 className="text-3xl font-extrabold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Data we store</h2>
        <p>
          2048 Play does not require an account. Your <strong>best score</strong>, current game,
          and theme preference are stored locally in your browser via <code>localStorage</code>.
          We do not transmit this data to our servers.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Cookies and advertising</h2>
        <p>
          This site displays ads served by <strong>Google AdSense</strong>. Google and its partners
          may use cookies to serve ads based on your prior visits to this and other websites. You
          may opt out of personalized advertising by visiting{" "}
          <a className="underline" href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a>.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Analytics</h2>
        <p>
          We may collect anonymous, aggregated usage statistics (page views, device type) to improve
          the game. No personally identifiable information is collected.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Children</h2>
        <p>
          The game is suitable for all ages. We do not knowingly collect data from children under 13.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Contact</h2>
        <p>For privacy questions, email <a className="underline" href="mailto:hello@2048play.example.com">hello@2048play.example.com</a>.</p>
      </article>
    </SiteLayout>
  );
}
