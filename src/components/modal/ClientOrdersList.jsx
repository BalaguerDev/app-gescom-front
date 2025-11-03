import { formatters } from "../../utils/formatters.utils";
import { PackageOpen } from "lucide-react";

const ClientOrdersList = ({ pedidos = [], onSelect = () => { } }) => {
    if (!pedidos?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500 text-sm">
                <PackageOpen size={32} className="mb-2 opacity-60" />
                <p>Este cliente no tiene pedidos registrados.</p>
            </div>
        );
    }

    return (
        <ul className="divide-y divide-gray-100">
            {pedidos.map((p) => {
                const diffDays = Math.floor(
                    (Date.now() - new Date(p.date)) / (1000 * 60 * 60 * 24)
                );

                return (
                    <li
                        key={p.id}
                        onClick={() => onSelect(p)}
                        className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                    >
                        {/* Izquierda: info del pedido */}
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-medium text-gray-900">
                                Pedido #{p.id}
                            </span>
                            <span className="text-xs text-gray-500">
                                {formatters.date(p.date)} • {diffDays} día
                                {diffDays !== 1 ? "s" : ""} atrás
                            </span>
                        </div>

                        {/* Derecha: total */}
                        <div className="text-right">
                            <p className="font-semibold text-gray-800">
                                {formatters.currency(p.total)}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default ClientOrdersList;
