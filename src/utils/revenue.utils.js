// src/utils/revenue.utils.js

export function computeRevenueData(client, routeDateString) {
  if (!client?.revenueCurrentYear || !client?.revenueLastYear) {
    return { families: [], ytd: {}, monthTotal: {}, lastYearMonthTotal: {} };
  }

  const date = new Date(routeDateString);
  const month = date.getMonth() + 1; // 1-12

  // --- MES ACTUAL ---
  const currentMonth = client.revenueCurrentYear.find(m => m.month === month);
  const lastYearMonth = client.revenueLastYear.find(m => m.month === month);

  const families = [];
  const allFamilies = new Set();

  // recojo todas las familias que existan
  client.revenueCurrentYear.forEach(m => Object.keys(m.families).forEach(f => allFamilies.add(f)));
  client.revenueLastYear.forEach(m => Object.keys(m.families).forEach(f => allFamilies.add(f)));

  allFamilies.forEach(family => {
    families.push({
      family,
      current: currentMonth?.families?.[family] ?? 0,
      lastYear: lastYearMonth?.families?.[family] ?? 0
    });
  });

  // --- YTD (enero hasta mes actual) ---
  const ytdCurrent = client.revenueCurrentYear
    .filter(m => m.month <= month)
    .reduce((sum, m) => sum + m.total, 0);

  const ytdLastYear = client.revenueLastYear
    .filter(m => m.month <= month)
    .reduce((sum, m) => sum + m.total, 0);

  return {
    families,
    monthTotal: {
      current: currentMonth?.total ?? 0,
      lastYear: lastYearMonth?.total ?? 0
    },
    ytd: {
      current: ytdCurrent,
      lastYear: ytdLastYear
    }
  };
}
