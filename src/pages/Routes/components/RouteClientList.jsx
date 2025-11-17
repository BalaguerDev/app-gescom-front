// src/components/routes/RouteClientList.jsx
import React from "react";

export default function RouteClientList({ clients, stops, onSelect }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="font-semibold mb-2">Clientes</h3>

      <div className="space-y-2">
        {stops.map(stop => (
          <button
            key={stop.clientId}
            onClick={() => onSelect(stop.client)}
            className="w-full text-left p-3 bg-white shadow rounded hover:bg-gray-100"
          >
            <div className="font-semibold">
              {stop.orderIndex}. {stop.client.name}
            </div>
            <div className="text-xs text-gray-600">
              Llegada {stop.arrivalTime} — Salida {stop.departureTime}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
