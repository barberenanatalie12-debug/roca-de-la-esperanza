// Post-build prerender: renders each public route to static HTML so crawlers
// (and social previews) get real content instead of an empty <div id="root">.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
//
// Usage: node scripts/prerender.mjs   (invoked by `npm run build`)
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const SITE = "https://ici-usarocadelaesperanza.org";

const DEFAULT_DESCRIPTION =
  "Iglesia cristiana en Sacramento, CA. Somos parte de ICIAR y damos la bienvenida a todos los que buscan a Dios, comunidad, sanidad y esperanza en Jesús.";

// Per-route <title> and meta description. Every public route must be listed
// here AND in public/sitemap.xml.
const ROUTES = [
  {
    path: "/",
    title: "Iglesia Roca de la Esperanza | Sacramento, CA",
    description: DEFAULT_DESCRIPTION,
  },
  {
    path: "/nosotros",
    title: "Nosotros | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Conoce a la Iglesia Roca de la Esperanza: nuestra historia, nuestro pastor y nuestra misión como iglesia cristiana en Sacramento, CA.",
  },
  {
    path: "/en-que-creemos",
    title: "En Qué Creemos | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Nuestras creencias y doctrina bíblica: lo que enseña y practica la Iglesia Roca de la Esperanza, iglesia cristiana en Sacramento, CA.",
  },
  {
    path: "/ministerios",
    title: "Ministerios | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Ministerios y sociedades de la Iglesia Roca de la Esperanza en Sacramento, CA: varones, damas, jóvenes y niños.",
  },
  {
    path: "/donar",
    title: "Donar | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Apoya la obra de Dios con tu ofrenda o diezmo a la Iglesia Roca de la Esperanza, iglesia cristiana en Sacramento, CA.",
  },
  {
    path: "/sermones",
    title: "Sermones | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Mira y escucha los sermones y predicaciones de la Iglesia Roca de la Esperanza en Sacramento, CA. Cultos los domingos y jueves.",
  },
  {
    path: "/eventos",
    title: "Eventos | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Calendario de eventos y actividades de la Iglesia Roca de la Esperanza, iglesia cristiana en Sacramento, CA.",
  },
  {
    path: "/apoyo-donaciones",
    title: "Apoyo y Donaciones | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Formas de apoyar a la Iglesia Roca de la Esperanza en Sacramento, CA con donaciones y ofrendas.",
  },
  {
    path: "/contacto",
    title: "Contacto | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Contáctanos y visítanos: 4445 Fruitridge Road, Sacramento, CA 95820. Cultos los domingos 3:00 PM y 4:30 PM, y jueves 7:30 PM.",
  },
  {
    path: "/sociedades/varones",
    title: "Sociedad de Varones | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Sociedad de Varones de la Iglesia Roca de la Esperanza en Sacramento, CA: comunión y crecimiento espiritual para hombres.",
  },
  {
    path: "/sociedades/damas",
    title: "Sociedad de Damas | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Sociedad de Damas de la Iglesia Roca de la Esperanza en Sacramento, CA: comunión y crecimiento espiritual para mujeres.",
  },
  {
    path: "/sociedades/jovenes",
    title: "Sociedad de Jóvenes | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Sociedad de Jóvenes de la Iglesia Roca de la Esperanza en Sacramento, CA: un espacio para que los jóvenes crezcan en su fe.",
  },
  {
    path: "/sociedades/ninos",
    title: "Sociedad de Niños | Iglesia Roca de la Esperanza — Sacramento, CA",
    description:
      "Sociedad de Niños de la Iglesia Roca de la Esperanza en Sacramento, CA: enseñanza bíblica para los más pequeños.",
  },
];

function applyMeta(template, route) {
  const url = SITE + (route.path === "/" ? "/" : route.path);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?("\s*\/>)/,
      `$1${route.description}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[\s\S]*?("\s*\/>)/,
      `$1${route.title}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[\s\S]*?("\s*\/>)/,
      `$1${route.description}$2`
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[\s\S]*?("\s*\/>)/,
      `$1${url}$2`
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[\s\S]*?("\s*\/>)/,
      `$1${url}$2`
    );
}

const template = await readFile(path.join(distDir, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html does not contain <div id="root"></div>');
}

const { render } = await import(
  path.join(ssrDir, "entry-server.js")
);

for (const route of ROUTES) {
  const appHtml = await render(route.path);
  const html = applyMeta(template, route).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );
  const outFile =
    route.path === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.path.slice(1), "index.html");
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  console.log(`prerendered ${route.path} -> ${path.relative(root, outFile)}`);
}

await rm(ssrDir, { recursive: true, force: true });
console.log(`done: ${ROUTES.length} routes prerendered`);
