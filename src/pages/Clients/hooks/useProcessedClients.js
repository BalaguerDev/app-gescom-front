import { useMemo } from "react";

/**
 * Hook que calcula la facturación (mensual o anual) de cada cliente
 * y devuelve la lista ordenada por facturación descendente.
 */
export function useProcessedClients(clients = [], vista = "anual") {
    const now = new Date();
    const currentMonth = now.getMonth();
    const monthIndex = currentMonth + 1;

    const processedClients = useMemo(() => {
        if (!Array.isArray(clients) || !clients.length) return [];

        return clients
            .map((c) => {
                const currentData = c.revenueCurrentYear || [];
                const lastData = c.revenueLastYear || [];

                // 🔹 Anual (enero → mes actual)
                const totalCurrentAnual = currentData
                    .filter((m) => m.month <= monthIndex)
                    .reduce((sum, m) => sum + (m.total || 0), 0);

                const totalLastAnual = lastData
                    .filter((m) => m.month <= monthIndex)
                    .reduce((sum, m) => sum + (m.total || 0), 0);

                // 🔹 Mensual (mes actual vs mismo mes año anterior)
                const totalCurrentMensual =
                    currentData.find((m) => m.month === monthIndex)?.total || 0;
                const totalLastMensual =
                    lastData.find((m) => m.month === monthIndex)?.total || 0;

                const totalCurrent =
                    vista === "anual" ? totalCurrentAnual : totalCurrentMensual;
                const totalLast =
                    vista === "anual" ? totalLastAnual : totalLastMensual;

                const crecimiento =
                    totalLast > 0 ? ((totalCurrent - totalLast) / totalLast) * 100 : 0;

                return { ...c, totalCurrent, totalLast, crecimiento };
            })
            .sort((a, b) => b.totalCurrent - a.totalCurrent);
    }, [clients, vista, monthIndex]);

    return { processedClients, currentMonth };
}
