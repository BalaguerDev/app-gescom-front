
import ClientsPage from "../pages/Clients";
import ZonesPage from "../pages/Zones";
import HomePage from "../pages/Home/HomePage";
import BillingPage from "../pages/Billing/BillingPage";
import RoutesPage from "../pages/Routes/components/RoutesPage";


const routes = [
    {
        path: "/",
        Component: HomePage,
        title: "Inicio",
        private: true,
    },
    {
        path: "/clientes",
        Component: ClientsPage,
        title: "Clientes",
        private: true,
    },
    {
        path: "/zonas",
        Component: ZonesPage,
        title: "Mapa",
        private: true,
    },
    {
        path: "/facturacion",
        Component: BillingPage,
        title: "Facturación",
        private: true,
    },
    {
        path: "/rutas",
        Component: RoutesPage,
        title: "Rutero",
        private: true,
    },
];

export default routes;
