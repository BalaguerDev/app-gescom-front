import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useClients } from "../../../hooks/useClients";
import {
  fetchZones,
  autoGenerateZones,
  deleteZone as deleteZoneAPI,
  createZone as createZoneAPI,
} from "@/api/zones";

export const useZonesLogic = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { clients, loading, error } = useClients(getAccessTokenSilently);
  const mapRef = useRef(null);

  // 🔹 Estado local (persistencia = backend)
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const [zoneColor, setZoneColor] = useState("#3b82f6");

  // ✅ Evita ejecución doble por React.StrictMode
  const isLoadedRef = useRef(false);

  // ✅ Cargar zonas o generarlas si no existen
  useEffect(() => {
    if (isLoadedRef.current) return; // 🚫 Previene llamada doble
    isLoadedRef.current = true;

    (async () => {
      try {
        console.log("🔄 Cargando zonas desde backend...");
        const response = await fetchZones(getAccessTokenSilently);

        // 🧠 Normalizamos estructura del backend
        const zonesFromAPI =
          Array.isArray(response?.data?.zones)
            ? response.data.zones
            : Array.isArray(response?.zones)
            ? response.zones
            : [];

        if (Array.isArray(zonesFromAPI) && zonesFromAPI.length > 0) {
          console.log(`✅ ${zonesFromAPI.length} zonas cargadas correctamente`);
          setZones(zonesFromAPI);
          return; // 🚫 No generar nuevas
        }

        console.warn("⚠️ No hay zonas existentes → generando automáticas...");
        const autoResponse = await autoGenerateZones(getAccessTokenSilently);
        const autoZones =
          Array.isArray(autoResponse?.data?.zones)
            ? autoResponse.data.zones
            : Array.isArray(autoResponse?.zones)
            ? autoResponse.zones
            : [];

        if (autoZones.length > 0) {
          console.log(`🆕 ${autoZones.length} zonas generadas automáticamente`);
          setZones(autoZones);
        } else {
          console.warn("⚠️ No se generaron zonas nuevas.");
        }
      } catch (err) {
        console.error("❌ Error cargando zonas:", err);
      }
    })();
  }, [getAccessTokenSilently]);

  // 🔹 Crear zona manualmente
  const handleCreateZone = async (zoneData) => {
    try {
      const response = await createZoneAPI(getAccessTokenSilently, zoneData);
      const zone = response.zone || response.data?.zone;
      if (zone) {
        setZones((prev) => [...prev, zone]);
        console.log(`✅ Zona creada: ${zone.name}`);
      }
    } catch (err) {
      console.error("❌ Error creando zona:", err);
    }
  };

  // 🔹 Eliminar zona
  const handleDeleteZone = async (id) => {
    try {
      await deleteZoneAPI(getAccessTokenSilently, id);
      setZones((prev) => prev.filter((z) => z.id !== id));
      console.log(`🗑️ Zona ${id} eliminada`);
    } catch (err) {
      console.error("❌ Error eliminando zona:", err.message);
    }
  };

  // 🔹 Ajustar mapa
  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (clients.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        clients.forEach(
          (c) => c.lat && c.lng && bounds.extend({ lat: c.lat, lng: c.lng })
        );
        map.fitBounds(bounds);
      }
    },
    [clients]
  );

  return {
    clients,
    zones,
    selectedZone,
    setSelectedZone,
    drawingMode,
    setDrawingMode,
    selectedClient,
    setSelectedClient,
    showModal,
    setShowModal,
    zoneName,
    setZoneName,
    zoneColor,
    setZoneColor,
    handleDeleteZone,
    handleCreateZone,
    onLoad,
    loading,
    error,
  };
};
