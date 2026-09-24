import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Turns the SPA build into static HTML per route.
 *
 * Runs after the two `vite build` calls (client and server). For each
 * public route it renders the React tree in Node, injects it inside
 * `dist/index.html`'s `<div id="root">`, and writes the result into its own
 * folder. When it's done, a `curl` on any URL returns the full content
 * instead of an empty container.
 *
 * Along the way it also generates `sitemap.xml` and `robots.txt` from the
 * same route table, so they can never drift out of sync with what actually exists.
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const serverEntry = pathToFileURL(join(root, "dist-server", "entry-server.js")).href;

// Everything prerendering needs comes from the server bundle, which has
// already gone through Vite and therefore has its environment variables resolved.
const { render, buildSeo, allRoutes, SITE, ROUTE_KEYS, DEFAULT_LOCALE } = await import(serverEntry);

const escapeAttr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Keeps a `</script>` inside the content from breaking the JSON-LD tag. */
const escapeJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

function renderHead(seo) {
  const tags = [
    `<title>${escapeAttr(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="robots" content="${escapeAttr(seo.robots)}" />`,
  ];

  // The 404 carries no canonical or alternates: it isn't a real page and
  // shouldn't claim any URL as its own.
  if (seo.alternates.length) {
    tags.push(`<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`);
  }

  for (const alternate of seo.alternates) {
    tags.push(
      `<link rel="alternate" hreflang="${escapeAttr(alternate.hrefLang)}" href="${escapeAttr(alternate.href)}" />`,
    );
  }

  for (const [property, content] of Object.entries(seo.og)) {
    tags.push(`<meta property="${escapeAttr(property)}" content="${escapeAttr(content)}" />`);
  }

  for (const [name, content] of Object.entries(seo.twitter)) {
    tags.push(`<meta name="${escapeAttr(name)}" content="${escapeAttr(content)}" />`);
  }

  if (seo.jsonLd) {
    tags.push(
      `<script type="application/ld+json" id="dexel-structured-data">${escapeJsonLd(seo.jsonLd)}</script>`,
    );
  }

  return tags.map((tag) => `    ${tag}`).join("\n");
}

/** `/es/servicios` → `dist/es/servicios/index.html`; `/` → `dist/index.html`. */
function outputPath(routePath) {
  return routePath === "/"
    ? join(distDir, "index.html")
    : join(distDir, routePath.replace(/^\//, ""), "index.html");
}

const template = await readFile(join(distDir, "index.html"), "utf8");

if (!template.includes('<div id="root"></div>')) {
  throw new Error(
    'dist/index.html does not contain <div id="root"></div>: prerendering doesn\'t know where to inject.',
  );
}

function renderDocument({ routeKey, locale, path, isRoot }) {
  const seo = buildSeo({ routeKey, locale, isRoot });
  const appHtml = render(path);

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${seo.lang}">`)
    // The template's <title> gets removed before injecting the route's own:
    // two titles in the same document and the search engine picks the one we don't want.
    .replace(/\n?\s*<title>[\s\S]*?<\/title>/, "")
    .replace("</head>", `${renderHead(seo)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

const routes = allRoutes();
const written = [];

for (const route of routes) {
  const html = renderDocument(route);

  const file = outputPath(route.path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");

  written.push(route.path);
  console.log(`  prerender  ${route.path.padEnd(26)} → ${file.replace(`${root}/`, "")}`);
}

// --- 404.html --------------------------------------------------------------
// Vercel serves this file, with a real 404 status, when no route matches.
// It comes out in Spanish because a static file can't know the language; once
// mounted in the browser, the router resolves it from the URL or the browser.
const notFoundHtml = renderDocument({
  routeKey: ROUTE_KEYS.NOT_FOUND,
  locale: DEFAULT_LOCALE,
  path: "/404",
});
await writeFile(join(distDir, "404.html"), notFoundHtml, "utf8");
console.log("  prerender  404                        → dist/404.html");

// --- sitemap.xml -----------------------------------------------------------
// The root is left out: its content is the same as `/es` and its canonical
// points there, so listing both would be asking Google to pick one.
const indexable = routes.filter((route) => !route.isRoot);

const urlEntries = indexable
  .map((route) => {
    const seo = buildSeo({ routeKey: route.routeKey, locale: route.locale });
    const alternates = seo.alternates
      .map(
        (alternate) =>
          `    <xhtml:link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.href}" />`,
      )
      .join("\n");

    return `  <url>
    <loc>${seo.canonical}</loc>
${alternates}
    <changefreq>monthly</changefreq>
    <priority>${route.routeKey === "home" ? "1.0" : route.routeKey === "audit" ? "0.9" : "0.8"}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;

await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf8");
console.log(`  sitemap    ${indexable.length} URLs`);

// --- robots.txt ------------------------------------------------------------
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;

await writeFile(join(distDir, "robots.txt"), robots, "utf8");
console.log("  robots     dist/robots.txt");
console.log(`\n  ${written.length} routes prerendered.`);
