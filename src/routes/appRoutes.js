// import CampaignsPage from "@/pages/CampaignsPage";

import ClientsPage from "../pages/Clients";
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
    // {
    //     path: "/campañas",
    //     Component: CampaignsPage,
    //     title: "Campañas",
    //     private: true,
    // },
];

export default routes;
