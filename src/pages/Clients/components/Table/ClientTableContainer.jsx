import { useState } from "react";
import ClientModal from "../Modal/ClientModal";
import { useProcessedClients } from "../../hooks/useProcessedClients";
import { ClientRow } from "./ClientRow";
import { ClientCard } from "./ClientCard";


export default function ClientTableContainer({ clients = [], vista }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [open, setOpen] = useState(false);

  const { processedClients, currentMonth } = useProcessedClients(clients, vista);

  const openClient = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-4">
        {/* 🧾 Encabezados (solo desktop) */}
        <div className="hidden md:grid grid-cols-[35%,8%,18%,20%,12%] text-sm font-semibold text-gray-500 border-b pb-2 mb-3">
          <span>Cliente</span>
          <span className="text-center">Tipo</span>
          <span className="text-right">
            {vista === "anual"
              ? `Año anterior (Ene–${new Date(0, currentMonth).toLocaleString("es-ES", {
                  month: "short",
                })})`
              : "Mismo mes año anterior"}
          </span>
          <span className="text-right">
            {vista === "anual" ? "Año actual" : "Mes actual"}
          </span>
          <span className="text-right">Crec.</span>
        </div>

        {/* 💻 Desktop */}
        <div className="hidden md:flex flex-col gap-2">
          {processedClients.map((client) => (
            <ClientRow
              key={client.id}
              client={client}
              vista={vista}
              onClick={() => openClient(client)}
            />
          ))}
        </div>

        {/* 📱 Móvil */}
        <div className="md:hidden space-y-2">
          {processedClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              vista={vista}
              onClick={() => openClient(client)}
            />
          ))}
        </div>
      </div>

      {/* 🪟 Modal cliente */}
      <ClientModal
        client={selectedClient}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
