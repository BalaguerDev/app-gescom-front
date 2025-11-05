// components/ClientModal/sections/ClientBilling.jsx
import React from "react";

const ClientBilling = ({ client }) => {
    const formatCurrency = (n) =>
        n?.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

    const currentMonthNum = new Date().getMonth() + 1;
    const currentMonthName = new Date(
        new Date().getFullYear(),
        currentMonthNum - 1
    )
        .toLocaleString("es-ES", { month: "long" })
        .replace(/^\w/, (c) => c.toUpperCase());

    const latestMonth =
        client.revenueCurrentYear?.find((m) => m.month === currentMonthNum) || null;
    const sameMonthLastYear =
        client.revenueLastYear?.find((m) => m.month === currentMonthNum) || null;

    // Debug opcional
    console.groupCollapsed(`📊 Facturación familias — mes ${currentMonthNum}`);
    console.log("Actual:", latestMonth);
    console.log("Anterior:", sameMonthLastYear);
    console.groupEnd();

    if (!latestMonth) {
        return (
            <div className="p-4 border rounded-xl bg-gray-50 text-center text-sm text-gray-500">
                No hay datos de facturación para este mes ({currentMonthName})
            </div>
        );
    }

    const currentFamilies = latestMonth.families || {};

    return (
        <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-800 mb-2 flex flex-wrap items-center gap-2">
                📊 Facturación por familia — {currentMonthName}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(currentFamilies).map(([key, currentValue]) => {
                    const lastYearValue = sameMonthLastYear?.families?.[key] || 0;
                    const diff = currentValue - lastYearValue;
                    const growthPct =
                        lastYearValue > 0 ? ((diff / lastYearValue) * 100).toFixed(1) : 0;
                    const isPositive = growthPct >= 0;

                    return (
                        <div
                            key={key}
                            className={`relative p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md
              ${isPositive
                                    ? "bg-gradient-to-br from-green-50 to-green-100/40 border-green-200"
                                    : "bg-gradient-to-br from-red-50 to-red-100/40 border-red-200"
                                }`}
                        >
                            {/* Cabecera de familia */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm text-gray-600 capitalize font-medium">
                                    {key}
                                </p>
                                <span
                                    className={`text-xs font-semibold ${isPositive ? "text-green-700" : "text-red-700"
                                        }`}
                                >
                                    {isPositive ? "▲" : "▼"} {growthPct}%
                                </span>
                            </div>

                            {/* Facturación actual */}
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(currentValue)}
                            </p>

                            {/* Comparativa año anterior */}
                            <p className="text-xs text-gray-500 mt-1">
                                vs {formatCurrency(lastYearValue)} en {new Date().getFullYear() - 1}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ClientBilling;
