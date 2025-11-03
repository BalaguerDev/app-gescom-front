import { formatters } from "../../../../utils/formatters.utils";
import { PARETO_COLORS } from "@/config/paretoColors";

export function ClientRow({ client, onClick }) {
  const isPositive = client.crecimiento >= 0;
  const bgGradient = isPositive
    ? "bg-gradient-to-l from-green-50/60"
    : "bg-gradient-to-l from-red-50/60";

  // Color del tipo (A/B/C/PROSPECT)
  const color = PARETO_COLORS[client.type] || PARETO_COLORS.C;

  return (
    <div
      onClick={onClick}
      className={`grid grid-cols-[35%,8%,18%,20%,12%] items-center rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md transition-all cursor-pointer ${bgGradient}`}
    >
      {/* 🧾 Nombre y categoría */}
      <div>
        <div className="font-medium text-gray-900 truncate">
          {formatters.truncate(client.name, 28)}
        </div>
        <div className="text-xs text-gray-400 truncate">
          {formatters.truncate(client.category, 35)}
        </div>
      </div>

      {/* 🏷️ Tipo Pareto con color */}
      <div className="flex justify-center items-center">
        <span
          className="flex items-center justify-center text-s w-5 h-5 rounded-full text-[11px] font-normal text-white shadow-sm"
          style={{ backgroundColor: color }}
        >
          {client.type === "PROSPECT" ? "P" : client.type || "?"}
        </span>
      </div>

      {/* 💰 Facturación anterior */}
      <div className="text-right text-gray-600 text-sm">
        {formatters.currency(client.totalLast)}
      </div>

      {/* 💶 Facturación actual */}
      <div className="text-right font-semibold text-gray-900 text-sm">
        {formatters.currency(client.totalCurrent)}
      </div>

      {/* 📈 Crecimiento */}
      <div
        className={`text-right text-sm font-semibold ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {client.crecimiento >= 0 ? "+" : ""}
        {formatters.percentage(client.crecimiento)}
      </div>
    </div>
  );
}
