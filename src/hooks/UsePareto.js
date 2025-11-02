import { useMemo } from "react";

/**
 * Hook que clasifica clientes según el principio de Pareto 80/20
 * 🅰️ Top 20% → aportan la mayor parte de la facturación
 * 🅱️ Siguiente 30%
 * 🅲 Resto (50%)
 *
 * Regla extendida:
 * 🔹 Usa el año anterior hasta que existan al menos 3 meses del año en curso.
 * 🔹 Luego pasa a usar el año vigente para el Pareto.
 */
export const usePareto = (clients = []) => {
  const { classifiedClients, totalBilling, referenceYear } = useMemo(() => {
    if (!Array.isArray(clients) || clients.length === 0) {
      return { classifiedClients: [], totalBilling: 0, referenceYear: null };
    }

    // 📆 Fecha actual
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1–12
    const currentYear = now.getFullYear();

    // 📊 Determinar año de referencia
    // Si hay al menos 3 meses del año vigente => usarlo, si no, usar el anterior
    const useCurrentYear = currentMonth >= 3;
    const referenceYear = useCurrentYear ? currentYear : currentYear - 1;

    // 🔹 Calcular facturación anual (enero–mes actual) según año de referencia
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
        annualRevenue: totalYear > 0 ? totalYear : c.totalCurrent || c.totalLast || 0,
      };
    });

    // 🔸 Ordenar descendente por facturación anual
    const sorted = [...clientsWithAnnual].sort(
      (a, b) => b.annualRevenue - a.annualRevenue
    );

    const totalBilling = sorted.reduce((sum, c) => sum + c.annualRevenue, 0);
    if (totalBilling === 0) {
      return { classifiedClients: [], totalBilling: 0, referenceYear };
    }

    // 🔸 Distribución A/B/C (20% / 30% / 50%)
    const totalClients = sorted.length;
    const topA = Math.ceil(totalClients * 0.2);
    const topB = Math.ceil(totalClients * 0.5); // 20% + 30%

    const classifiedClients = sorted.map((c, i) => {
      let type = "C";
      if (i < topA) type = "A";
      else if (i < topB) type = "B";

      // 🔹 Frecuencias recomendadas de visitas
      const visitsPerMonth = type === "A" ? 3 : type === "B" ? 2 : 1;
      const cooldownDays = type === "A" ? 8 : type === "B" ? 15 : 30;

      return {
        ...c,
        type,
        visitsPerMonth,
        cooldownDays,
      };
    });

    return { classifiedClients, totalBilling, referenceYear };
  }, [clients]);

  return { classifiedClients, totalBilling, referenceYear };
};
