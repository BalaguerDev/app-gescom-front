export default function OrderDetail({ order }) {
    if (!order)
        return (
            <div className="p-4 text-gray-500 text-center">
                No se ha seleccionado ningún pedido
            </div>
        );

    const formatCurrency = (n) =>
        n?.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

    return (
        <div className="p-4 space-y-3">
            <h3 className="text-md font-semibold text-gray-800">
                Detalle del pedido
            </h3>

            <div className="text-sm text-gray-600">
                <p>
                    <strong>Fecha:</strong>{" "}
                    {new Date(order.date).toLocaleDateString("es-ES")}
                </p>
                <p>
                    <strong>Total:</strong> {formatCurrency(order.total)}
                </p>
            </div>

            <div className="pt-3">
                <p className="text-sm font-medium text-gray-700 mb-3">
                    Líneas del pedido
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-600">
                        <thead>
                            <tr className="text-gray-400 text-xs uppercase">
                                <th className="text-left font-medium pb-2">Producto</th>
                                <th className="text-right font-medium pb-2">Uds</th>
                                <th className="text-right font-medium pb-2">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items?.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-1 pr-2">{item.name}</td>
                                    <td className="text-right py-1 text-gray-700">{item.cantidad}</td>
                                    <td className="text-right py-1 text-gray-800 font-medium">
                                        {formatCurrency(item.total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t border-gray-100">
                                <td></td>
                                <td className="text-right py-2 font-semibold text-gray-700">Total</td>
                                <td className="text-right py-2 font-bold text-gray-900">
                                    {formatCurrency(order.total)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
