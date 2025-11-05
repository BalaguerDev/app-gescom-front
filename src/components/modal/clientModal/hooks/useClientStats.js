// components/ClientModal/hooks/useClientStats.js
import { useMemo } from "react";
import { differenceInDays, parseISO } from "date-fns";

export const useClientStats = (client) => {
  const formatCurrency = (n) =>
    n?.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

  return useMemo(() => {
    if (!client) return null;

    const currentYearTotal = client.totalCurrent || 0;
    const orders = client.orders || [];
    const ordersCount = orders.length;
    const avgTicket =
      ordersCount > 0
        ? orders.reduce((acc, o) => acc + o.total, 0) / ordersCount
        : currentYearTotal / 12;

    const lastOrder = orders[orders.length - 1];
    const daysWithoutPurchase = lastOrder
      ? differenceInDays(new Date(), parseISO(lastOrder.date))
      : "—";

    const revenueCurrent = client.revenueCurrentYear || [];
    const revenueLast = client.revenueLastYear || [];
    const latestMonthNum = new Date().getMonth() + 1;

    const acumCurrent = revenueCurrent
      .filter((m) => m.month <= latestMonthNum)
      .reduce((acc, m) => acc + (m.total || 0), 0);
    const acumLast = revenueLast
      .filter((m) => m.month <= latestMonthNum)
      .reduce((acc, m) => acc + (m.total || 0), 0);

    const growth =
      acumLast > 0 ? (((acumCurrent - acumLast) / acumLast) * 100).toFixed(1) : 0;

    return {
      formatCurrency,
      daysWithoutPurchase,
      avgTicket: formatCurrency(avgTicket),
      ordersCount,
      growth,
    };
  }, [client]);
};
