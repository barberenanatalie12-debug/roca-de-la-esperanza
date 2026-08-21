// Server entry used only by the prerender step (see scripts/prerender.mjs).
// Renders a route to an HTML string so the built pages ship real content
// to crawlers instead of an empty <div id="root">.
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routes } from "./app/routes.jsx";
import "./styles/index.css";

const handler = createStaticHandler(routes);

export async function render(path) {
  const request = new Request(`https://ici-usarocadelaesperanza.org${path}`);
  const context = await handler.query(request);
  if (context instanceof Response) {
    throw new Error(`Unexpected redirect while prerendering ${path}`);
  }
  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToString(
    <StaticRouterProvider router={router} context={context} />
  );
}
