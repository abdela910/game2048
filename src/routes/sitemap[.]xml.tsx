import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://2048play.example.com";
const URLS = ["/", "/about", "/contact", "/privacy", "/terms"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map((u) => `  <url><loc>${SITE}${u}</loc><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.6"}</priority></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
