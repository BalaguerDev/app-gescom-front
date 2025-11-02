import { TypeBadge } from "../../../../components/ui/TypeBadge";
import { formatters } from "../../../../utils/formatters.utils";

export function ClientCard({ client, onClick, vista }) {
    const isPositive = client.crecimiento >= 0;
    const bg = isPositive
        ? "bg-gradient-to-l from-green-100/40"
        : "bg-gradient-to-l from-red-100/40";

    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition ${bg}`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2">
                        <TypeBadge type={client.type} />
                        <div className="font-medium text-gray-900 text-[14px]">
                            {formatters.truncate(client.name, 22)}
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        {vista === "anual" ? "Año anterior: " : "Mes anterior: "}
                        <span className="font-medium text-gray-700">
                            {formatters.currency(client.totalLast)}
                        </span>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                        {formatters.currency(client.totalCurrent)}
                    </div>
                    <div
                        className={`text-xs font-medium ${formatters.growthColor(
                            client.crecimiento
                        )}`}
                    >
                        {client.crecimiento >= 0 ? "+" : ""}
                        {formatters.percentage(client.crecimiento)}
                    </div>
                </div>
            </div>
        </button>
    );
}
