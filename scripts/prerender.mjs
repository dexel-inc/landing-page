import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Convierte el build de la SPA en HTML estático por ruta.
 *
 * Corre después de los dos `vite build` (cliente y servidor). Para cada ruta
 * pública renderiza el árbol de React en Node, lo inyecta dentro del
 * `<div id="root">` de `dist/index.html` y escribe el resultado en su propia
 * carpeta. Al terminar, `curl` de cualquier URL devuelve el contenido completo
 * en lugar de un contenedor vacío.
 *
 * De paso genera `sitemap.xml` y `robots.txt` a partir de la misma tabla de
 * rutas, para que no puedan quedar desincronizados con lo que existe.
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const serverEntry = pathToFileURL(join(root, "dist-server", "entry-server.js")).href;

// Todo lo que necesita el prerenderizado sale del bundle de servidor, que ya
// pasó por Vite y por tanto tiene resueltas las variables de entorno.
const { render, buildSeo, allRoutes, SITE, ROUTE_KEYS, DEFAULT_LOCALE } = await import(serverEntry);

const escapeAttr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Evita que un `</script>` dentro del contenido corte la etiqueta JSON-LD. */
const escapeJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

function renderHead(seo) {
  const tags = [
    `<title>${escapeAttr(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="robots" content="${escapeAttr(seo.robots)}" />`,
  ];

  // El 404 no lleva canónico ni alternos: no es una página real y no debe
  // reclamar ninguna URL como suya.
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
    'dist/index.html no contiene <div id="root"></div>: el prerenderizado no sabe dónde inyectar.',
  );
}

function renderDocument({ routeKey, locale, path, isRoot }) {
  const seo = buildSeo({ routeKey, locale, isRoot });
  const appHtml = render(path);

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${seo.lang}">`)
    // El <title> de la plantilla se quita antes de inyectar el de la ruta: dos
    // títulos en el mismo documento y el buscador elige el que no queremos.
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
// Vercel sirve este archivo, con estado 404 real, cuando ninguna ruta coincide.
// Sale en español porque un archivo estático no puede saber el idioma; al
// montar en el navegador, el router lo resuelve por la URL o por el navegador.
const notFoundHtml = renderDocument({
  routeKey: ROUTE_KEYS.NOT_FOUND,
  locale: DEFAULT_LOCALE,
  path: "/404",
});
await writeFile(join(distDir, "404.html"), notFoundHtml, "utf8");
console.log("  prerender  404                        → dist/404.html");

// --- sitemap.xml -----------------------------------------------------------
// La raíz queda fuera: su contenido es el mismo que `/es` y su canónico apunta
// allí, así que listar las dos sería pedirle a Google que elija.
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
console.log(`\n  ${written.length} rutas prerenderizadas.`);
