import { formatters } from "../../utils/formatters.utils";

const ClientOrderDetail = ({ pedido }) => {
    if (!pedido) return null;

    return (
        <div className="space-y-4">
            {/* 🗓 Fecha y total */}
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                    Fecha: <span className="font-semibold text-gray-800">
                        {formatters.date(pedido.date)}
                    </span>
                </p>
                <p className="text-sm text-gray-600">
                    Total: <span className="font-semibold text-gray-800">
                        {formatters.currency(pedido.total)}
                    </span>
                </p>
            </div>

            {/* 🧾 Lista de artículos */}
            <ul className="divide-y divide-gray-100">
                {pedido.items?.map((item, idx) => (
                    <li
                        key={idx}
                        className="py-3 px-1 flex justify-between items-center text-sm"
                    >
                        <div className="flex flex-col w-1/2 overflow-hidden">
                            <span className="font-medium text-gray-800 truncate">
                                {item.nombre}
                            </span>
                            <span className="text-xs text-gray-500 truncate">{item.ref}</span>
                        </div>

                        <div className="text-center text-gray-600 w-1/5">
                            {item.cantidad} u.
                        </div>

                        <div className="text-right font-semibold text-gray-900 w-1/4">
                            {formatters.currency(item.precio)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientOrderDetail;
