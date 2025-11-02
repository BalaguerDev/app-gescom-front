import ClientInactivo from "./ClientInactivo";
import { TrendingUp, TrendingDown } from "lucide-react";

const ClientKPIs = ({ clients = [], clientesInactivos = [], onShowInactivos }) => {
  const total = clients?.length || 0;
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();
  const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;
  const añoAnterior = mesActual === 0 ? añoActual - 1 : añoActual;

  const nuevosClientes = clients.filter(
    (c) => c.createdAt && new Date(c.createdAt).getFullYear() === añoActual
  ).length;

  const clientesActivosMesActual = clients.filter((c) =>
    c.orders?.some((o) => {
      const d = new Date(o.date);
      return d.getMonth() === mesActual && d.getFullYear() === añoActual;
    })
  ).length;

  const clientesActivosMesAnterior = clients.filter((c) =>
    c.orders?.some((o) => {
      const d = new Date(o.date);
      return d.getMonth() === mesAnterior && d.getFullYear() === añoAnterior;
    })
  ).length;

  const crecimientoActivos =
    clientesActivosMesAnterior > 0
      ? ((clientesActivosMesActual - clientesActivosMesAnterior) /
          clientesActivosMesAnterior) *
        100
      : 0;

  const KPIs = [
    {
      id: "inactivos",
      content: (
        <ClientInactivo
          clients={clients}
          clientesInactivos={clientesInactivos}
          onShowInactivos={onShowInactivos}
        />
      ),
    },
    {
      id: "nuevos",
      label: "Clientes nuevos",
      value: nuevosClientes,
      sub: `Alta durante ${añoActual}`,
    },
    {
      id: "activos",
      label: "Clientes activos este mes",
      value: clientesActivosMesActual,
      sub:
        clientesActivosMesAnterior > 0
          ? `${crecimientoActivos.toFixed(1)}% vs mes anterior`
          : "",
      icon:
        clientesActivosMesAnterior > 0 ? (
          crecimientoActivos >= 0 ? (
            <TrendingUp size={16} className="text-green-600" />
          ) : (
            <TrendingDown size={16} className="text-red-600" />
          )
        ) : null,
      trendColor:
        crecimientoActivos >= 0 ? "text-green-600" : "text-red-600",
    },
  ];

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl p-4">
      {/* 🧩 Scroll horizontal en móvil, grid en desktop */}
      <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1">
        {KPIs.map((kpi) => (
          <div
            key={kpi.id}
            className="min-w-[200px] sm:min-w-0 snap-start flex-1 flex flex-col items-center justify-center text-center border border-gray-100 rounded-xl py-3 px-2"
          >
            {kpi.content ? (
              kpi.content
            ) : (
              <>
                <p className="text-xs text-gray-500">{kpi.label}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <p
                    className={`text-2xl font-semibold ${
                      kpi.trendColor || "text-gray-800"
                    }`}
                  >
                    {kpi.value}
                  </p>
                  {kpi.icon}
                </div>
                {kpi.sub && (
                  <p className="text-[11px] text-gray-400 mt-1 truncate max-w-[140px]">
                    {kpi.sub}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientKPIs;
