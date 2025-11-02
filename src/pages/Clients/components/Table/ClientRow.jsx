import { TypeBadge } from "../../../../components/ui/TypeBadge";
import { formatters } from "../../../../utils/formatters.utils";

export function ClientRow({ client, onClick }) {
    const isPositive = client.crecimiento >= 0;
    const bgGradient = isPositive
        ? "bg-gradient-to-l from-green-50/60"
        : "bg-gradient-to-l from-red-50/60";

    return (
        <div
            onClick={onClick}
            className={`grid grid-cols-[35%,8%,18%,20%,12%] items-center rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md transition-all cursor-pointer ${bgGradient}`}
        >
            <div>
                <div className="font-medium text-gray-900 truncate">
                    {formatters.truncate(client.name, 28)}
                </div>
                <div className="text-xs text-gray-400 truncate">
                    {formatters.truncate(client.category, 35)}
                </div>
            </div>
            <div className="text-center">
                <TypeBadge type={client.type} />
            </div>
            <div className="text-right text-gray-600 text-sm">
                {formatters.currency(client.totalLast)}
            </div>
            <div className="text-right font-semibold text-gray-900 text-sm">
                {formatters.currency(client.totalCurrent)}
            </div>
            <div
                className={`text-right text-sm font-semibold ${formatters.growthColor(
                    client.crecimiento
                )}`}
            >
                {client.crecimiento >= 0 ? "+" : ""}
                {formatters.percentage(client.crecimiento)}
            </div>
        </div>
    );
}
