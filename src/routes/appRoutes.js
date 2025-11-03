
import ClientsPage from "../pages/Clients";
import ZonesPage from "../pages/Zones";
import HomePage from "../pages/Home/HomePage";


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
];

export default routes;
