import { useState, useMemo } from "react";

function calcularAcumulado(client, tipo) {
    const currentMonth = new Date().getMonth() + 1;
    const data =
        tipo === "current"
            ? client.revenueCurrentYear || []
            : client.revenuePreviousYear || [];

    return data
        .filter((r) => r.month <= currentMonth)
        .reduce((acc, r) => acc + (r.total || 0), 0);
}

export const useZonesFilters = (logic, classifiedClients) => {
    const [filterType, setFilterType] = useState("ALL");

    // Clientes filtrados
    const filteredClients = useMemo(() => {
        return classifiedClients.filter(
            (c) => filterType === "ALL" || c.type === filterType
        );
    }, [classifiedClients, filterType]);

    // Zonas que contienen esos clientes
    const filteredZones = useMemo(() => {
        if (!Array.isArray(logic.zones)) return [];
        return logic.zones.filter((z) =>
            (z.clients || []).some((zc) =>
                filteredClients.some((fc) => fc.id === zc.id)
            )
        );
    }, [logic.zones, filteredClients]);

    // selectedZone adaptada
    const filteredSelectedZone = useMemo(() => {
        if (!logic.selectedZone) return null;
        const clientsInZone = (logic.selectedZone.clients || []).filter((zc) =>
            filteredClients.some((fc) => fc.id === zc.id)
        );
        return { ...logic.selectedZone, clients: clientsInZone };
    }, [logic.selectedZone, filteredClients]);

    return {
        filterType,
        setFilterType,
        filteredClients,
        filteredZones,
        filteredSelectedZone,
    };
};
