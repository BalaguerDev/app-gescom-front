// components/ClientModal/sections/ClientRecommendations.jsx
import React from "react";

const ClientRecommendations = ({ headerStats }) => {
    const riesgo =
        headerStats.daysWithoutPurchase > 60
            ? "alto"
            : headerStats.daysWithoutPurchase > 30
                ? "medio"
                : "bajo";

    const colorMap = {
        alto: "bg-red-50 border-red-400 text-red-800",
        medio: "bg-yellow-50 border-yellow-400 text-yellow-800",
        bajo: "bg-green-50 border-green-400 text-green-800",
    };

    return (
        <div className="space-y-5">
            <h3 className="text-md font-semibold text-gray-800">🤖 Recomendaciones IA</h3>

            {/* Estado del cliente */}
            <div
                className={`p-4 border-l-4 rounded ${colorMap[riesgo]} shadow-sm transition-all`}
            >
                <p className="text-sm font-medium">
                    ⚠️ Riesgo {riesgo}: {headerStats.daysWithoutPurchase} días sin compra
                </p>
                <p className="text-xs opacity-80 mt-1">
                    {riesgo === "alto"
                        ? "Cliente inactivo. Recomendar visita o llamada inmediata."
                        : riesgo === "medio"
                            ? "Se sugiere contactar esta semana o enviar oferta."
                            : "Cliente activo, sin alertas destacadas."}
                </p>
            </div>

            {/* Campañas sugeridas */}
            <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    📢 Campañas sugeridas
                </h4>
                <ul className="space-y-2">
                    <li className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <p className="font-medium text-sm">Kit Ahorro Energía 2025</p>
                        <p className="text-xs text-gray-500">
                            Descuento del 12% en climatización
                        </p>
                    </li>
                    <li className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <p className="font-medium text-sm">Mantenimiento Preventivo</p>
                        <p className="text-xs text-gray-500">
                            Campaña recomendada para clientes con +30 días sin compra
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ClientRecommendations;
