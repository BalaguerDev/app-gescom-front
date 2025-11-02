import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { usePareto } from "@/hooks/usePareto";
import ClientTableContainer from "./components/Table/ClientTableContainer";
import ClientKPIs from "./components/KPI/ClientKPI";
import { useClients } from "./hooks/useClients";
import DataStateHandler from "../../components/ui/DataStateHandler";
import SearchInput from "../../components/ui/SearchInput";
import ToggleVista from "../../components/ui/ToggleVista";
import InactiveCustomersModal from "./components/Inactive/InactiveCustomerModal";

export default function ClientsPage() {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error, reload } = useClients(getAccessTokenSilently);

  const [vista, setVista] = useState("mensual");
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactivosModal, setShowInactivosModal] = useState(false);

  // 🧩 Clasificación Pareto (añade type: A/B/C)
  const { classifiedClients } = usePareto(clients);

  // 💤 Clientes inactivos (>90 días sin pedidos)
  const clientesInactivos = classifiedClients.filter((c) => {
    if (!c.orders?.length) return true;
    const lastOrderDate = Math.max(...c.orders.map((o) => new Date(o.date).getTime()));
    const diffDays = (Date.now() - lastOrderDate) / (1000 * 60 * 60 * 24);
    return diffDays > 90;
  });

  // 🔎 Filtro de búsqueda
  const filteredClients = classifiedClients.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DataStateHandler loading={loading} error={error} onRetry={reload}>
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-900">Resumen Clientes</h2>

        {/* 🔹 KPIs */}
        <ClientKPIs
          clients={classifiedClients}
          clientesInactivos={clientesInactivos}
          onShowInactivos={() => setShowInactivosModal(true)}
        />

        {/* 🔎 Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex-1 min-w-[180px]">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="shrink-0">
            <ToggleVista vista={vista} setVista={setVista} />
          </div>
        </div>

        {/* 📋 Tabla */}
        <ClientTableContainer clients={filteredClients} vista={vista} />

           {/*💤 Modal inactivos */}
        <InactiveCustomersModal
          open={showInactivosModal}
          onClose={() => setShowInactivosModal(false)}
          clientesInactivos={clientesInactivos}
        />
      </div>
    </DataStateHandler>
  );
}
