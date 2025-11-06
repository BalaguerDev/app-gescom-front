"use client";

import { useRef } from "react";
import { GoogleMap, DrawingManager, Polygon, InfoWindow } from "@react-google-maps/api";
import { useMapMarkers } from "../hooks/useMapMarkers";
import { PARETO_COLORS } from "@/config/paretoColors";

const containerStyle = {
  width: "100%",
  height: "55vh",
  borderRadius: "16px",
  position: "relative",
};

export const MapView = ({
  clients = [],
  zones = [],
  selectedZone,
  drawingMode,
  selectedClient,
  setSelectedClient,
  setSelectedZone,
  onLoad,
  handlePolygonComplete,
}) => {
  const mapRef = useRef(null);
  useMapMarkers(mapRef, clients, setSelectedClient);
  

  return (
    <div className="relative">
      <GoogleMap
        onLoad={(map) => {
          mapRef.current = map;
          onLoad?.(map);
        }}
        mapContainerStyle={containerStyle}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          clickableIcons: false,
          mapId: import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID",
          gestureHandling: "greedy",
        }}>

        {selectedClient && (
          <InfoWindow
            position={{ lat: selectedClient.lat, lng: selectedClient.lng }}
            onCloseClick={() => setSelectedClient(null)}
          >
            <div className="min-w-[240px] bg-white/90 backdrop-blur-md rounded-xl shadow-lg px-3.5 py-3 text-[13px] relative">

              {/* 🧠 Encabezado: nombre + badge */}
              <div className="flex items-center justify-between pr-6 mb-1.5">
                <p className="font-semibold text-gray-700 text-[14px] leading-tight truncate">
                  {selectedClient.name}
                </p>
                <span
                  className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-[2px] rounded-full text-white shadow-sm"
                  style={{
                    backgroundColor:
                      PARETO_COLORS[selectedClient.type] || "#6B7280",
                  }}
                >
                  {selectedClient.type || "—"}
                </span>
              </div>

              {/* 🏷️ Tipología + Sector */}
              <p className="text-[12px] text-gray-600 mt-1">
                {selectedClient.category && (
                  <>

                    <span className="text-gray-700">Sector: {selectedClient.category}</span>
                  </>
                )}
              </p>

              {/* 💶 Facturación actual */}
              {selectedClient.totalCurrent > 0 && (
                <p className="text-[12px] text-gray-800 mt-2 font-medium">
                  💶 {selectedClient.totalCurrent.toLocaleString("es-ES")} €{" "}
                  <span className="text-gray-500 font-normal text-[11px]">
                    (año actual)
                  </span>
                </p>
              )}
            </div>
          </InfoWindow>
        )}



        {drawingMode && (
          <DrawingManager
            onPolygonComplete={handlePolygonComplete}
            options={{
              drawingMode: "polygon",
              drawingControl: false,
              polygonOptions: {
                fillColor: "#3B82F6",
                fillOpacity: 0.25,
                strokeColor: "#1E40AF",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                editable: true,
                zIndex: 1,
              },
            }}
          />
        )}

        {zones.map((zone) => (
          <Polygon
            key={zone.id}
            paths={zone.path}
            options={{
              fillColor: zone.color,
              strokeColor: zone.color,
              fillOpacity: 0.25,
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        ))}

        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-4 text-xs">
          <p className="font-semibold text-gray-800 mb-2">📊 Clasificación clientes</p>
          {Object.entries(PARETO_COLORS)
            .filter(([k]) => k !== "UNKNOWN")
            .map(([key, color]) => (
              <p key={key} className="flex items-center gap-2 text-gray-700">
                <span
                  className="inline-block w-3.5 h-3.5 rounded-full"
                  style={{ background: color }}
                />
                {key === "A"
                  ? "A — Alta facturación"
                  : key === "B"
                    ? "B — Media facturación"
                    : key === "C"
                      ? "C — Baja facturación"
                      : "P — Prospecto / nuevo cliente"}
              </p>
            ))}
        </div>
      </GoogleMap>
    </div>
  );
};
