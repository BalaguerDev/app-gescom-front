import { Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PARETO_COLORS } from "@/config/paretoColors";
import { useZoneClients } from "../hooks/useZoneClients";
import ClientModal from "../../../components/modal/ClientModal";

export const ClientList = ({ selectedZone, deleteZone, setSelectedZone, clients = [] }) => {
    const {
        selectedClient,
        setSelectedClient,
        sortedClients,
        zoneTotal,
        handleDeleteZone,
    } = useZoneClients({ selectedZone, clients, deleteZone, setSelectedZone });

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-4">
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {selectedZone ? (
                            <>
                                Clientes en{" "}
                                <span className="text-blue-600">{selectedZone.name}</span>
                            </>
                        ) : (
                            "Clientes en la zona"
                        )}
                    </h3>
                    {selectedZone && (
                        <p className="text-xs text-gray-500">
                            {sortedClients.length} clientes — 💶 {zoneTotal.toLocaleString("es-ES")} €
                        </p>
                    )}
                </div>

                {selectedZone && (
                    <button
                        onClick={handleDeleteZone}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 transition text-xs font-medium"
                    >
                        <Trash2 className="w-4 h-4" />
                        Eliminar zona
                    </button>
                )}
            </div>

            {!selectedZone ? (
                <p className="text-sm text-gray-500">Selecciona una zona para ver sus clientes.</p>
            ) : sortedClients.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No hay clientes en esta zona.</p>
            ) : (
                <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {sortedClients.map((client) => {
                        const isUp = client.crecimiento >= 0;
                        const color = PARETO_COLORS[client.type] || PARETO_COLORS.C;

                        return (
                            <li
                                key={client.id}
                                onClick={() => setSelectedClient(client)}
                                className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 border shadow-sm hover:shadow-md cursor-pointer
                  ${client.crecimiento == null
                                        ? "bg-gradient-to-l from-gray-100/80 to-white hover:from-gray-200/80"
                                        : client.crecimiento >= 0
                                            ? "bg-gradient-to-l from-green-100/70 to-white hover:from-green-200/80"
                                            : "bg-gradient-to-l from-red-100/70 to-white hover:from-red-200/80"
                                    }
                  ${selectedClient?.id === client.id
                                        ? "ring-2 ring-blue-400"
                                        : "border-gray-100"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-3.5 h-3.5 rounded-full shadow-sm"
                                            style={{ backgroundColor: color }}
                                        />
                                        <div>
                                            <p className="font-medium text-gray-800 truncate leading-tight">
                                                {client.name}
                                            </p>
                                            {client.category && (
                                                <p className="text-[11px] text-gray-500 truncate leading-tight">
                                                    {client.category}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-900 font-semibold">
                                        {client.facturacionActual.toLocaleString("es-ES")} €
                                    </p>
                                </div>

                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <p>
                                        Año anterior: {client.facturacionAnterior.toLocaleString("es-ES")} €
                                    </p>
                                    {client.crecimiento !== null && (
                                        <span
                                            className={`flex items-center gap-1 font-medium ${isUp ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {client.crecimiento.toFixed(1)}%
                                        </span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* 🔹 Modal de detalle cliente */}
            <ClientModal
                client={selectedClient}
                isOpen={!!selectedClient}
                onClose={() => setSelectedClient(null)}
            />
        </div>
    );
};
