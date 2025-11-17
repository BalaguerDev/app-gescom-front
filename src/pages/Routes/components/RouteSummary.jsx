// src/components/routes/RouteSummary.jsx
import React from "react";

export default function RouteSummary({ route }) {
  return (
    <div className="p-4 border-b bg-white">
      <h2 className="text-xl font-semibold">Resumen de ruta</h2>

      <div className="mt-3 space-y-1 text-sm">
        <p>📍 Inicio: {route.startAddress}, {route.startTime}</p>
        <p>🏁 Fin: {route.endAddress}, {route.endTime}</p>
        <p>🚗 Km totales: {route.totalKm} km</p>
        <p>⏱ Conducción: {route.totalDrivingMin} min</p>
        <p>💰 Ingresos estimados: {route.estimatedRevenue} €</p>
      </div>
    </div>
  );
}
