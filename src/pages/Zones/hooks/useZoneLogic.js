import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useClients } from "../../Clients/hooks/useClients";
import { useZonesStore } from "../store/useZoneStore";
import { getClientsInPolygon } from "../utils/revenueCalculations";
import {
    fetchZones,
    createZone,
    deleteZone as deleteZoneAPI,
} from "@/api/zones";

export const useZonesLogic = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { clients, loading, error } = useClients(getAccessTokenSilently);

    const {
        zones,
        setZones,
        addZone,
        deleteZone,
        selectedZone,
        setSelectedZone,
    } = useZonesStore();

    const mapRef = useRef(null);

    const [drawingMode, setDrawingMode] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newZonePath, setNewZonePath] = useState(null);
    const [zoneName, setZoneName] = useState("");
    const [zoneColor, setZoneColor] = useState("#3b82f6");

    // ✅ Cargar zonas SOLO una vez al montar el componente
    useEffect(() => {
        (async () => {
            try {
                const { success, data, error } = await fetchZones(getAccessTokenSilently);
                if (success) {
                    const safeData = Array.isArray(data) ? data : data?.zones || [];
                    setZones(safeData);
                } else {
                    console.warn("⚠️ No se pudieron cargar las zonas:", error);
                    setZones([]);
                }
            } catch (err) {
                console.warn("⚠️ No se pudieron cargar las zonas:", err.message);
                setZones([]);
            }
        })();
        // 👇 dependencias fijas, no incluir setZones (rompe Zustand)
    }, [getAccessTokenSilently]);


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

    const handlePolygonComplete = (polygon) => {
        const path = polygon
            .getPath()
            .getArray()
            .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

        setNewZonePath(path);
        setShowModal(true);
        polygon.setMap(null);
        setDrawingMode(false);
    };

    const handleConfirmNewZone = async () => {
        if (!zoneName.trim()) return alert("Introduce un nombre para la zona.");

        const clientsInside = getClientsInPolygon(newZonePath, clients);

        const clientsWithRevenue = clientsInside.map((c) => {
            const totalRevenue =
                c.revenueCurrentYear?.reduce((acc, r) => acc + (r.total || 0), 0) || 0;
            return {
                id: c.id,
                name: c.name,
                lat: c.lat,
                lng: c.lng,
                totalRevenue,
            };
        });

        const totalZoneRevenue = clientsWithRevenue.reduce(
            (acc, c) => acc + c.totalRevenue,
            0
        );

        const newZone = {
            id: crypto.randomUUID(), // 👈 clave única temporal hasta que venga del backend
            name: zoneName,
            color: zoneColor,
            path: [...newZonePath], // 👈 nueva referencia
            totalRevenue: totalZoneRevenue,
            clients: clientsWithRevenue,
        };

        try {
            const saved = await createZone(getAccessTokenSilently, newZone);
            setZones((prev) => [...prev, saved]);
        } catch (err) {
            console.error("❌ Error guardando zona:", err.message);
            setZones((prev) => [...prev, newZone]);
        }

        fetchZones(getAccessTokenSilently).then(({ success, data }) => {
            if (success && Array.isArray(data)) {
                setZones(data);
            }
        });

        // 🔁 reset modal y estado
        setShowModal(false);
        setDrawingMode(false);
        setZoneName("");
        setZoneColor("#3b82f6");
        setNewZonePath(null);
    };


    const handleDeleteZone = async (id) => {
        try {
            await deleteZoneAPI(getAccessTokenSilently, id);
            deleteZone(id);
        } catch (err) {
            console.error("❌ Error eliminando zona:", err.message);
        }
    };

    return {
        clients,
        loading,
        error,
        zones,
        selectedZone,
        setSelectedZone,
        drawingMode,
        showModal,
        zoneName,
        zoneColor,
        selectedClient,
        setDrawingMode,
        setSelectedClient,
        setShowModal,
        setZoneName,
        setZoneColor,
        onLoad,
        handlePolygonComplete,
        handleConfirmNewZone,
        handleDeleteZone,
    };
};
