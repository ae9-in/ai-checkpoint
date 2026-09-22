const fs = require("fs");
const path = require("path");

const domain = "https://www.aicheckpoint.in";

const routes = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/register", priority: "0.9", changefreq: "weekly" },
  { path: "/pricing", priority: "0.8", changefreq: "weekly" },
  { path: "/solutions", priority: "0.8", changefreq: "weekly" },
  { path: "/faq", priority: "0.7", changefreq: "weekly" },
  { path: "/resources", priority: "0.7", changefreq: "daily" },
  { path: "/industries", priority: "0.8", changefreq: "weekly" },
  { path: "/industries/retail", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/restaurants", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/healthcare", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/salons", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/gyms", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/education", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/real-estate", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/logistics", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/manufacturing", priority: "0.7", changefreq: "weekly" },
  { path: "/industries/corporate", priority: "0.7", changefreq: "weekly" },
];

const lastmod = new Date().toISOString().split("T")[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

routes.forEach((r) => {
  sitemap += `  <url>
    <loc>${domain}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>
`;
});

sitemap += `</urlset>`;

const outputPath = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap, "utf8");
console.log(`Sitemap generated successfully at: ${outputPath}`);
