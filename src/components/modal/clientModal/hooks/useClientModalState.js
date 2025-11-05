import { useState } from "react";

export const useClientModalState = () => {
    const [activeTab, setActiveTab] = useState("facturacion");
    const [selectedOrder, setSelectedOrder] = useState(null);
    return { activeTab, setActiveTab, selectedOrder, setSelectedOrder };
};
