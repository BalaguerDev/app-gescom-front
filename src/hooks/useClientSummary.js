import { useMemo } from "react";

/**
 * Hook que calcula métricas clave del cliente:
 * - Días desde la última compra
 * - Ticket medio
 * - Total de pedidos
 */
export const useClientSummary = (client) => {
    return useMemo(() => {
        if (!client) {
            return { diffDays: null, avgTicket: 0, totalOrders: 0 };
        }

        const orders = client.orders || [];

        const lastOrderDate = orders.length
            ? new Date(Math.max(...orders.map((o) => new Date(o.date))))
            : null;

        const diffDays = lastOrderDate
            ? Math.floor((Date.now() - lastOrderDate) / (1000 * 60 * 60 * 24))
            : null;

        const avgTicket =
            orders.length > 0
                ? orders.reduce((sum, o) => sum + (o.total || 0), 0) / orders.length
                : 0;

        return {
            diffDays,
            avgTicket,
            totalOrders: orders.length,
        };
    }, [client]);
};
