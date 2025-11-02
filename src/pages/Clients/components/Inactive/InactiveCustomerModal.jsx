import Modal from "@/components/ui/Modal";
import { Phone } from "lucide-react";
import { formatters } from "../../../../utils/formatters.utils";

const InactiveCustomersModal = ({ open, onClose, clientesInactivos = [] }) => {
  // Ordenar por fecha más antigua de compra
  const sortedClients = [...(clientesInactivos || [])].sort((a, b) => {
    const lastA = a.orders?.length
      ? Math.max(...a.orders.map((o) => new Date(o.date).getTime()))
      : 0;
    const lastB = b.orders?.length
      ? Math.max(...b.orders.map((o) => new Date(o.date).getTime()))
      : 0;
    return lastA - lastB;
  });

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Clientes inactivos (última compra)"
      size="lg"
    >
      {sortedClients.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No hay clientes inactivos actualmente.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {sortedClients.map((c) => {
            const lastOrder =
              c.orders?.length &&
              c.orders.reduce((latest, o) => {
                const d = new Date(o.date);
                return d > latest ? d : latest;
              }, new Date(0));

            const formattedDate = lastOrder
              ? new Date(lastOrder).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              : "Sin compras registradas";

            return (
              <li
                key={c.id}
                className="py-3 flex justify-between items-center hover:bg-gray-50 transition-colors rounded-lg px-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {formatters.truncate(c.name, 25)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Última compra:{" "}
                    {c.orders?.length ? formattedDate : "— Sin pedidos —"}
                  </span>
                </div>

                {c.phone ? (
                  <a
                    href={`tel:${c.phone}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title={`Llamar a ${c.name}`}
                  >
                    <Phone size={20} />
                  </a>
                ) : (
                  <Phone
                    size={20}
                    className="text-gray-300"
                    title="Sin teléfono disponible"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
};

export default InactiveCustomersModal;
