import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 2048 Play" },
      { name: "description", content: "Get in touch with the 2048 Play team for feedback, bug reports, or partnership inquiries." },
      { property: "og:title", content: "Contact — 2048 Play" },
      { property: "og:description", content: "Reach the 2048 Play team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <article className="py-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold mb-4">Contact us</h1>
        <p className="text-muted-foreground mb-6">
          Have feedback, found a bug, or want to talk advertising? Send us an email — we read every message.
        </p>
        <a
          href="mailto:hello@2048play.example.com"
          className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 h-10 text-sm font-medium"
        >
          hello@2048play.example.com
        </a>
        <h2 className="text-xl font-bold mt-10 mb-2">Response time</h2>
        <p className="text-sm text-muted-foreground">
          We typically respond within 2–3 business days.
        </p>
      </article>
    </SiteLayout>
  );
}
