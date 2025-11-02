import { Home, Users, Megaphone } from "lucide-react";

export const routes = [
    {
        name: "Inicio",
        path: "/",
        icon: Home,
    },
    {
        name: "Clientes",
        path: "/clientes",
        icon: Users,
    },
    {
        name: "Campañas",
        path: "/campañas",
        icon: Megaphone,
    },
];
