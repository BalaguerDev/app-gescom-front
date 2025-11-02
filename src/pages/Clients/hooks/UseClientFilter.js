import { useMemo } from "react";
import { usePareto } from "@/hooks/usePareto";

export const useClientFilters = (clients = []) => {
    const { classifiedClients } = usePareto(clients || []);

    const inactiveClients = useMemo(() => {
        const now = Date.now();
        return (clients || []).filter((c) => {
            if (!c.orders?.length) return true;
            const lastOrderTs = Math.max(...c.orders.map((o) => new Date(o.date).getTime()));
            const diffDays = (now - lastOrderTs) / (1000 * 60 * 60 * 24);
            return diffDays > 90;
        });
    }, [clients]);

    return { classifiedClients: classifiedClients || [], inactiveClients };
};
