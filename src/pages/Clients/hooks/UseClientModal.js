import { useState, useMemo } from "react";

export const useClientModal = (client) => {
    const [activeSection, setActiveSection] = useState("contacto");
    const [pedidoDetalle, setPedidoDetalle] = useState(null);

    const ultimosPedidos = useMemo(() => {
        if (!client?.orders) return [];
        // orden descendente por fecha (más reciente primero)
        return [...client.orders].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [client]);

    const campanas = client?.campaigns || client?.campanas || [];

    const tabs = [
        { id: "contacto", label: "Contacto" },
        { id: "pedidos", label: "Pedidos" },
        { id: "campañas", label: "Campañas" },
    ];

    return {
        activeSection,
        setActiveSection,
        pedidoDetalle,
        setPedidoDetalle,
        ultimosPedidos,
        campanas,
        tabs,
    };
};
