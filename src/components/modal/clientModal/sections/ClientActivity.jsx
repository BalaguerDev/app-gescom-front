// components/ClientModal/sections/ClientActivity.jsx
import React from "react";

const ClientActivity = ({ client, setSelectedOrder }) => {
    const formatCurrency = (n) =>
        n?.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

    const orders = client.orders || [];

    return (
        <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-800">📦 Últimos pedidos</h3>
            <div className="border rounded-lg divide-y bg-white shadow-sm">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            onClick={() => setSelectedOrder(order)}
                            className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Pedido #{order.id}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(order.date).toLocaleDateString("es-ES")}
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">
                                {formatCurrency(order.total)}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 p-4 text-center">
                        No hay pedidos recientes
                    </p>
                )}
            </div>
        </div>
    );
};

export default ClientActivity;
