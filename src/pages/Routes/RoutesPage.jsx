// src/pages/RoutesPage.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ClientDetail from "./components/ClientDetail";
import { useRoute } from "../../hooks/useRoute";

export default function RoutesPage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const {
    route,
    loadRoute,
    reloadRoute,
    selectedClient,
    setSelectedClient
  } = useRoute();

  // Cargar ruta al cambiar fecha
  useEffect(() => {
    loadRoute({
      userId: 1,
      date,
      startAddress: "Carrer de Pujades 19, Barcelona",
      endAddress: "Carrer de Pujades 19, Barcelona",
    });
  }, [date]);

  // ⭐ AUTO-SELECCIONAR PRIMER CLIENTE
  useEffect(() => {
    if (route?.stops?.length > 0 && !selectedClient) {
      setSelectedClient(route.stops[0].client);
    }
  }, [route]);

  return (
    <div className="h-screen flex flex-col">

      <Header
        date={date}
        setDate={setDate}
        onReload={() =>
          reloadRoute({
            userId: 1,
            date,
            startAddress: "Carrer de Pujades 19, Barcelona",
            endAddress: "Carrer de Pujades 19, Barcelona",
          })
        }
      />

      {/* Layout */}
      <div className="flex flex-1">
        <div className="flex-1">
          <ClientDetail client={selectedClient} routeDate={route?.date} />
        </div>

        <Sidebar
          route={route}
          onSelect={setSelectedClient}
        />
      </div>

    </div>
  );
}
