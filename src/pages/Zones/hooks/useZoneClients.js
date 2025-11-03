import { useState, useMemo, useCallback } from "react";
import {
    calcularFacturacionActual,
    calcularFacturacionAnterior,
    calcularCrecimiento,
} from "../utils/revenueCalculations";

/**
 * Hook que gestiona la lógica de clientes dentro de una zona seleccionada.
 */
export const useZoneClients = ({ selectedZone, clients, deleteZone, setSelectedZone }) => {
    const [selectedClient, setSelectedClient] = useState(null);

    // 🧮 Elimina la zona seleccionada
    const handleDeleteZone = useCallback(async () => {
        if (selectedZone && confirm(`¿Eliminar la zona "${selectedZone.name}"?`)) {
            try {
                await deleteZone(selectedZone.id);
                setSelectedZone(null);
            } catch (err) {
                console.error("❌ Error al eliminar zona:", err);
            }
        }
    }, [selectedZone, deleteZone, setSelectedZone]);

    // 💰 Calcula facturación total de la zona
    const zoneTotal = useMemo(() => {
        return (selectedZone?.clients || []).reduce((acc, zc) => {
            const client = clients.find((c) => c.id === zc.id) || zc;
            return acc + (calcularFacturacionActual(client) || 0);
        }, 0);
    }, [selectedZone, clients]);

    // 📊 Lista de clientes ordenada por facturación actual
    const sortedClients = useMemo(() => {
        if (!selectedZone) return [];
        return [...selectedZone.clients]
            .map((zc) => {
                const client = clients.find((c) => c.id === zc.id) || zc;
                return {
                    ...client,
                    facturacionActual: calcularFacturacionActual(client) || 0,
                    facturacionAnterior: calcularFacturacionAnterior(client) || 0,
                    crecimiento: calcularCrecimiento(client),
                };
            })
            .sort((a, b) => b.facturacionActual - a.facturacionActual);
    }, [selectedZone, clients]);

    return {
        selectedClient,
        setSelectedClient,
        sortedClients,
        zoneTotal,
        handleDeleteZone,
    };
};
