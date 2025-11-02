import ClientFamilyChart from "./ClientFamilyChart";
import ClientOrdersList from "./ClientOrdersList";
import ClientCampaigns from "./ClientCampaigns";
import { formatters } from "../../../../utils/formatters.utils";
import { useClientSummary } from "../../../../hooks/useClientSummary";

const ClientOverview = ({ client, onSelectOrder }) => {
  const { diffDays, avgTicket, totalOrders } = useClientSummary(client);

  const KPIs = [
    { label: "Días sin comprar", value: diffDays ?? "–" },
    { label: "Ticket medio", value: formatters.currency(avgTicket) },
    { label: "Pedidos totales", value: totalOrders },
  ];

  return (
    <div className="space-y-8">
      {/* 📊 KPIs del cliente */}
      <section>
        <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1">
          {KPIs.map((kpi, idx) => (
            <div
              key={idx}
              className="min-w-[160px] sm:min-w-0 snap-start flex-1 flex flex-col items-center justify-center text-center border border-gray-100 rounded-xl py-3 px-2"
            >
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {kpi.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 💼 Facturación por familia */}
      <section>
        <ClientFamilyChart client={client} />
      </section>

      {/* 📦 Últimos pedidos */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Últimos pedidos
        </h3>
        <ClientOrdersList pedidos={client.orders || []} onSelect={onSelectOrder} />
      </section>

      {/* 🎯 Campañas recomendadas */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Campañas recomendadas
        </h3>
        <ClientCampaigns client={client} />
      </section>
    </div>
  );
};

export default ClientOverview;
