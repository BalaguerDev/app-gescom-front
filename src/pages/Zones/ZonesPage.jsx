"use client";

import { Loader2 } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useZonesLogic } from "./hooks/useZoneLogic";
import { usePareto } from "@/hooks/usePareto";
import { MapView } from "./components/MapView";
import { ZoneList } from "./components/ZoneList";
import { ClientList } from "./components/ClientList";
import { ZoneModal } from "./components/Modal/ZoneModal";
import { GOOGLE_MAP_LIBRARIES } from "./utils/googleLibraries";
import { ZoneFilters } from "./components/ZoneFilters";
import { useZonesFilters } from "./hooks/useZonesFilters";

export default function ZonesPage() {
  const logic = useZonesLogic();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  const { classifiedClients, getParetoColor } = usePareto(logic.clients);

  // 🔹 Custom hook con toda la lógica de filtros
  const {
    filterType,
    setFilterType,
    filteredClients,
    filteredZones,
    filteredSelectedZone,
  } = useZonesFilters(logic, classifiedClients);

  // 🔹 Datos enriquecidos que se pasan al resto de componentes
  const enhancedLogic = {
    ...logic,
    clients: filteredClients,
    zones: filteredZones,
    selectedZone: filteredSelectedZone,
    getParetoColor,
  };

  // ⏳ Loading / errores
  if (loadError)
    return <p className="text-center text-red-600">Error cargando mapa.</p>;

  if (!isLoaded || logic.loading)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin text-blue-600" size={28} />
      </div>
    );

  // 🧩 Render principal
  return (
    <div className="space-y-6 relative">
      {/* Header + Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          🗺️ Zonas de clientes
        </h2>
        <ZoneFilters
          filterType={filterType}
          setFilterType={setFilterType}
          visibleClients={filteredClients.length}
          totalClients={classifiedClients.length}
        />
      </div>

      {/* 🌍 Mapa */}
      <MapView {...enhancedLogic} />

      {/* 📋 Listados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ZoneList {...enhancedLogic} />
        <ClientList {...enhancedLogic} deleteZone={logic.handleDeleteZone} />
      </div>

      {/* 🪄 Modal nueva zona */}
      {logic.showModal && <ZoneModal {...enhancedLogic} />}
    </div>
  );
}
