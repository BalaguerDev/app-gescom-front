// components/ClientModal/sections/ClientHeader.jsx
const ClientHeader = ({ headerStats, activeTab, setActiveTab, tabs }) => (
  <div className="sticky top-0 z-10 bg-white border-b pb-2 mb-1 shadow-sm">
    {/* --- MÉTRICAS (desktop) --- */}
    <div className="hidden sm:grid sm:grid-cols-4 gap-4 text-sm">
      {[
        { label: "Días sin comprar", value: headerStats.daysWithoutPurchase },
        { label: "Ticket medio", value: headerStats.avgTicket },
        { label: "Pedidos", value: headerStats.ordersCount },
        {
          label: "Tendencia anual",
          value:
            headerStats.growth > 0
              ? `+${headerStats.growth}%`
              : `${headerStats.growth}%`,
          color:
            headerStats.growth >= 0 ? "text-green-600" : "text-red-500",
        },
      ].map((metric, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-gray-500 text-xs uppercase tracking-wide">
            {metric.label}
          </span>
          <span className={`text-base font-semibold ${metric.color || ""}`}>
            {metric.value}
          </span>
        </div>
      ))}
    </div>

    {/* --- MÉTRICAS (mobile) --- */}
    <div className="sm:hidden overflow-x-auto flex gap-4 pb-2 px-1 scrollbar-hide">
      {[
        { label: "Días sin comprar", value: headerStats.daysWithoutPurchase },
        { label: "Ticket medio", value: headerStats.avgTicket },
        { label: "Pedidos", value: headerStats.ordersCount },
        {
          label: "Tendencia anual",
          value:
            headerStats.growth > 0
              ? `+${headerStats.growth}%`
              : `${headerStats.growth}%`,
          color:
            headerStats.growth >= 0 ? "text-green-600" : "text-red-500",
        },
      ].map((metric, i) => (
        <div
          key={i}
          className="min-w-[120px] flex flex-col items-center border rounded-xl py-2 px-3 bg-gray-50 flex-shrink-0"
        >
          <span className="text-gray-500 text-[10px] uppercase tracking-wide">
            {metric.label}
          </span>
          <span className={`text-sm font-semibold ${metric.color || ""}`}>
            {metric.value}
          </span>
        </div>
      ))}
    </div>

    {/* --- PESTAÑAS --- */}
    <div className="justify-center mt-4 border-b border-gray-200 flex overflow-x-auto scrollbar-hide gap-1 px-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-sm font-medium flex-shrink-0 transition-colors ${
            activeTab === tab.id
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

export default ClientHeader;
