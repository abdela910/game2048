import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — 2048 Play" },
      { name: "description", content: "Terms of service for using 2048 Play." },
      { property: "og:title", content: "Terms of Service — 2048 Play" },
      { property: "og:description", content: "Rules for using the 2048 Play website." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <article className="py-8 prose prose-sm dark:prose-invert max-w-none">
        <h1 className="text-3xl font-extrabold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Use of the service</h2>
        <p>
          2048 Play is provided free of charge for personal, non-commercial use. By using this site
          you agree not to attempt to disrupt, reverse-engineer for malicious purposes, or scrape
          the service in ways that degrade its availability.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Intellectual property</h2>
        <p>
          The original 2048 game concept is by Gabriele Cirulli and is licensed under MIT. This
          implementation, design, and content are © 2048 Play.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Disclaimer</h2>
        <p>
          The service is provided "as is" without warranty of any kind. We are not liable for any
          damages arising from your use of the site.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Changes</h2>
        <p>We may update these terms at any time. Continued use of the site constitutes acceptance.</p>
      </article>
    </SiteLayout>
  );
}
