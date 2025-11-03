import { useMemo } from "react";
import { PARETO_COLORS, getParetoColor } from "../config/paretoColors";

/**
 * Hook que clasifica clientes según el principio de Pareto (80/20)
 *
 * 🅰️ Top 20% → Mayor facturación
 * 🅱️ Siguiente 30%
 * 🅲 Resto (50%)
 * 🆕 Prospectos → sin facturación
 */
export const usePareto = (clients = []) => {
  const { classifiedClients, totalBilling, referenceYear } = useMemo(() => {
    if (!Array.isArray(clients) || clients.length === 0) {
      return { classifiedClients: [], totalBilling: 0, referenceYear: null };
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const referenceYear = currentMonth >= 3 ? currentYear : currentYear - 1;

    // 🔹 Calcular facturación acumulada enero → mes actual
    const clientsWithAnnual = clients.map((c) => {
      const dataKey =
        referenceYear === currentYear
          ? "revenueCurrentYear"
          : "revenueLastYear";

      const revenueData = c[dataKey] || [];
      const totalYear = revenueData
        .filter((m) => m.month <= currentMonth)
        .reduce((sum, m) => sum + (m.total || 0), 0);

      return {
        ...c,
        annualRevenue:
          totalYear > 0 ? totalYear : c.totalCurrent || c.totalLast || 0,
      };
    });

    // 🔸 Si todos los clientes tienen 0 facturación → son prospectos
    const hasRevenue = clientsWithAnnual.some((c) => c.annualRevenue > 0);
    if (!hasRevenue) {
      return {
        classifiedClients: clientsWithAnnual.map((c) => ({
          ...c,
          type: "PROSPECT",
          color: PARETO_COLORS.PROSPECT,
        })),
        totalBilling: 0,
        referenceYear,
      };
    }

    // 🔸 Orden descendente por facturación
    const sorted = [...clientsWithAnnual].sort(
      (a, b) => b.annualRevenue - a.annualRevenue
    );

    const totalBilling = sorted.reduce((sum, c) => sum + c.annualRevenue, 0);
    const totalClients = sorted.length;
    const topA = Math.ceil(totalClients * 0.2);
    const topB = Math.ceil(totalClients * 0.5); // 20% + 30%

    // 🔸 Clasificación A / B / C / Prospect
    const classifiedClients = sorted.map((c, i) => {
      let type = "C";
      if (c.annualRevenue === 0) type = "PROSPECT";
      else if (i < topA) type = "A";
      else if (i < topB) type = "B";

      const visitsPerMonth = type === "A" ? 3 : type === "B" ? 2 : 1;
      const cooldownDays = type === "A" ? 8 : type === "B" ? 15 : 30;

      return {
        ...c,
        type,
        color: getParetoColor(type),
        visitsPerMonth,
        cooldownDays,
      };
    });

    return { classifiedClients, totalBilling, referenceYear };
  }, [clients]);

  // 🔁 Retornamos toda la información útil al resto de la app
  return {
    classifiedClients,
    totalBilling,
    referenceYear,
    getParetoColor,
    PARETO_COLORS,
  };
};
