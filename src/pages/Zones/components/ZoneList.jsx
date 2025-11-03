"use client";

import { Plus } from "lucide-react";
import { calcularFacturacionZona } from "../utils/revenueCalculations";
import { PARETO_COLORS, hexToRgba } from "@/config/paretoColors";

export const ZoneList = ({
    zones = [],
    selectedZone,
    setSelectedZone,
    drawingMode,
    setDrawingMode,
    clients = [],
}) => {
    const toggleDrawingMode = () => setDrawingMode(!drawingMode);

    const totalVisibleRevenue = zones.reduce(
        (acc, z) => acc + (calcularFacturacionZona(z, clients) || 0),
        0
    );

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-4">
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Zonas creadas</h3>
                    <p className="text-xs text-gray-500">
                        Facturación total — 💶 {totalVisibleRevenue.toLocaleString("es-ES")} €
                    </p>
                </div>

                <button
                    onClick={toggleDrawingMode}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${drawingMode
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        }`}
                >
                    <Plus className="w-4 h-4" />
                    {drawingMode ? "Cancelar" : "Crear zona"}
                </button>
            </div>

            {zones.length === 0 ? (
                <p className="text-sm text-gray-500">No hay zonas que cumplan los filtros.</p>
            ) : (
                <ul className="space-y-3">
                    {zones.map((zone, i) => {
                        const facturacion = calcularFacturacionZona(zone, clients);

                        const counts = (zone.clients || []).reduce(
                            (acc, c) => {
                                const fullClient = clients.find((cl) => cl.id === c.id);
                                const type = fullClient?.type || c.type || "UNKNOWN";
                                acc[type] = (acc[type] || 0) + 1;
                                return acc;
                            },
                            { A: 0, B: 0, C: 0, PROSPECT: 0, UNKNOWN: 0 }
                        );

                        const totalClients =
                            counts.A + counts.B + counts.C + counts.PROSPECT || 1;

                        const proportions = {
                            A: (counts.A / totalClients) * 100,
                            B: (counts.B / totalClients) * 100,
                            C: (counts.C / totalClients) * 100,
                            PROSPECT: (counts.PROSPECT / totalClients) * 100,
                        };

                        const isSelected = selectedZone?.id === zone.id;
                        const baseColor = zone.color || "#E5E7EB";
                        const backgroundColor = hexToRgba(baseColor, isSelected ? 0.25 : 0.12);
                        const borderColor = isSelected ? baseColor : "#E5E7EB";

                        return (
                            <li
                                key={zone.id || `${zone.name}-${i}`}
                                onClick={() => setSelectedZone(zone)}
                                className="rounded-xl p-3 cursor-pointer transition hover:shadow-sm"
                                style={{ backgroundColor, border: `2px solid ${borderColor}` }}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm text-gray-800">{zone.name}</span>
                                        <span className="text-gray-500 text-xs">
                                            {zone.clients?.length || 0} clientes
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-800 font-semibold">
                                        💶 {facturacion.toLocaleString("es-ES")} €
                                    </span>
                                </div>

                                <div className="flex h-2 w-full rounded-full overflow-hidden my-2 border border-gray-200">
                                    {Object.entries(PARETO_COLORS).map(([key, color]) => (
                                        key !== "UNKNOWN" && (
                                            <div
                                                key={key}
                                                style={{ width: `${proportions[key]}%`, backgroundColor: color }}
                                            />
                                        )
                                    ))}
                                </div>

                                <div className="flex justify-between text-xs text-gray-700 mt-1">
                                    <div className="flex items-center gap-3">
                                        {Object.entries(PARETO_COLORS).map(
                                            ([key, color]) =>
                                                key !== "UNKNOWN" && (
                                                    <span key={key}>
                                                        <span
                                                            className="inline-block w-2.5 h-2.5 rounded-full mr-1"
                                                            style={{ background: color }}
                                                        />
                                                        {counts[key]}
                                                    </span>
                                                )
                                        )}
                                    </div>
                                    <span className="text-gray-500">
                                        Total: {zone.clients?.length || 0}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
