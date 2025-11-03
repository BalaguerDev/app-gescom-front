import { useState } from "react";
import Modal from "@/components/ui/Modal";
import ClientOverview from "./ClientOverview";
import ClientOrderDetail from "./ClientOrderDetail";

const ClientModal = ({ client, isOpen, onClose }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!client) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Sin datos"
        size="xl"
        arrowBack={onClose}
      >
        <div className="flex justify-center items-center h-40 text-gray-500">
          Selecciona un cliente para ver su información
        </div>
      </Modal>
    );
  }

  const title = selectedOrder
    ? `Pedido #${selectedOrder.id}`
    : client.name;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="xl"
      arrowBack={selectedOrder ? () => setSelectedOrder(null) : null}
    >
      {selectedOrder ? (
        <ClientOrderDetail pedido={selectedOrder} />
      ) : (
        <ClientOverview client={client} onSelectOrder={setSelectedOrder} />
      )}
    </Modal>
  );
};

export default ClientModal;
