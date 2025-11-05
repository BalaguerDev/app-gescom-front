import { lazy, Suspense } from "react";
import Modal from "@/components/ui/Modal";
import ClientHeader from "./sections/ClientHeader";
import { useClientStats } from "./hooks/useClientStats";
import { useClientModalState } from "./hooks/useClientModalState";
import OrderDetail from "./sections/OrderDetail";

const ClientBilling = lazy(() => import("./sections/ClientBilling"));
const ClientActivity = lazy(() => import("./sections/ClientActivity"));
const ClientRecommendations = lazy(() => import("./sections/ClientRecommendations"));

const TABS = [
  { id: "facturacion", label: "Facturación", C: ClientBilling },
  { id: "actividad", label: "Actividad", C: ClientActivity },
  { id: "recomendaciones", label: "Recomendaciones", C: ClientRecommendations },
];

export default function ClientModal({ client, isOpen, onClose }) {
  const { activeTab, setActiveTab, selectedOrder, setSelectedOrder } = useClientModalState();
  const stats = useClientStats(client);
  if (!client)
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl" title="Sin datos">
        <div className="flex justify-center items-center h-40 text-gray-500">Selecciona un cliente</div>
      </Modal>
    );

  const Tab = TABS.find(t => t.id === activeTab)?.C;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={selectedOrder ? `Pedido #${selectedOrder.id}` : client.name}
      arrowBack={selectedOrder ? () => setSelectedOrder(null) : null}
    >
      {!selectedOrder && <ClientHeader headerStats={stats} activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />}
      <div key={activeTab} className="max-h-[65vh] overflow-y-auto p-1">
        <Suspense fallback={<div className="p-4 text-gray-400">Cargando...</div>}>
          {selectedOrder ? (
            <OrderDetail order={selectedOrder} />
          ) : (
            Tab && <Tab client={client} headerStats={stats} setSelectedOrder={setSelectedOrder} />
          )}
        </Suspense>
      </div>
    </Modal>
  );
}
