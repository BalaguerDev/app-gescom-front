import { useMemo } from "react";

/**
 * Hook que calcula la facturación por familia
 * para vista mensual o anual, con crecimiento porcentual.
 */
export const useClientFamilyRevenue = (client, vista = "mensual") => {
    const monthIndex = new Date().getMonth() + 1;

    const familias = useMemo(() => {
        if (!client) return [];

        const currData = client.revenueCurrentYear || [];
        const lastData = client.revenueLastYear || [];

        const filterPeriod = (data) =>
            vista === "anual"
                ? data.filter((m) => m.month <= monthIndex)
                : data.filter((m) => m.month === monthIndex);

        const sumFamilies = (data) =>
            data.reduce((acc, m) => {
                Object.entries(m.families || {}).forEach(([fam, val]) => {
                    acc[fam] = (acc[fam] || 0) + val;
                });
                return acc;
            }, {});

        const currentFamilies = sumFamilies(filterPeriod(currData));
        const lastFamilies = sumFamilies(filterPeriod(lastData));

        const allKeys = Array.from(
            new Set([...Object.keys(currentFamilies), ...Object.keys(lastFamilies)])
        );

        return allKeys.map((fam) => {
            const current = currentFamilies[fam] || 0;
            const last = lastFamilies[fam] || 0;
            const growth = last > 0 ? ((current - last) / last) * 100 : 0;
            return { fam, current, last, growth };
        });
    }, [client, vista]);

    return familias;
};
