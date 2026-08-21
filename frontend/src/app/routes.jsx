import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/layout";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Home from "./pages/home";
import Ministerios from "./pages/ministerios";
import Donar from "./pages/donar";
import Sermones from "./pages/sermones";
import Eventos from "./pages/eventos";
import ApoyoDonaciones from "./pages/apoyo-donaciones";
import Contacto from "./pages/contacto";
import Nosotros from "./pages/nosotros";
import EnQueCreemos from "./pages/en-que-creemos";
import SociedadVarones from "./pages/sociedades/varones";
import SociedadDamas from "./pages/sociedades/damas";
import SociedadJovenes from "./pages/sociedades/jovenes";
import SociedadNinos from "./pages/sociedades/ninos";
import Login from "./pages/Login";
import Admin from "./admin/Admin";

export const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "nosotros", Component: Nosotros },
      { path: "en-que-creemos", Component: EnQueCreemos },
      { path: "ministerios", Component: Ministerios },
      { path: "donar", Component: Donar },
      { path: "sermones", Component: Sermones },
      { path: "eventos", Component: Eventos },
      { path: "apoyo-donaciones", Component: ApoyoDonaciones },
      { path: "contacto", Component: Contacto },
      { path: "sociedades/varones", Component: SociedadVarones },
      { path: "sociedades/damas", Component: SociedadDamas },
      { path: "sociedades/jovenes", Component: SociedadJovenes },
      { path: "sociedades/ninos", Component: SociedadNinos },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <Admin />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/Admin",
    element: <Navigate to="/admin" replace />,
  },
];

// Only create the browser router in the browser — the prerender build imports
// `routes` from Node, where createBrowserRouter would crash on missing window.
export const router =
  typeof document !== "undefined" ? createBrowserRouter(routes) : null;