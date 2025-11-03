import { useEffect, useRef } from "react";

export const useMapMarkers = (mapRef, clients, setSelectedClient) => {
  const markersRef = useRef([]);

  // 🧹 Limpia marcadores previos
  const clearMarkers = () => {
    markersRef.current.forEach((m) => {
      try {
        m.setMap(null);
      } catch {}
    });
    markersRef.current = [];
  };

  // 🎨 Colores personalizados
  const getColorByType = (type) => {
    switch (type) {
      case "A": return "#16A34A"; // verde
      case "B": return "#F59E0B"; // naranja
      case "C": return "#9CA3AF"; // gris
      case "PROSPECT": return "#2563EB"; // azul
      default: return "#EF4444"; // rojo fallback
    }
  };

  useEffect(() => {
    if (!mapRef.current || !window.google?.maps) return;

    clearMarkers();

    const loadMarkers = async () => {
      try {
        await google.maps.importLibrary("marker");
      } catch {}

      clients.forEach((client) => {
        if (!client.lat || !client.lng) return;

        const color = getColorByType(client.type);

        // ✅ Pin SVG del mismo tamaño y proporción que el default de Google
        const svgMarkup = `
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M20 2C13.3726 2 8 7.37258 8 14C8 22.5 20 38 20 38C20 38 32 22.5 32 14C32 7.37258 26.6274 2 20 2Z"
              fill="${color}" stroke="white" stroke-width="1.5"
            />
            <circle cx="20" cy="15" r="4" fill="white" />
          </svg>
        `;

        // 🧩 Div contenedor con anclaje absoluto al "pico"
        const div = document.createElement("div");
        div.innerHTML = svgMarkup;
        div.style.position = "absolute";
        div.style.width = "40px";
        div.style.height = "40px";
        div.style.transform = "translate(-20px, -38px)"; // 👈 ancla al pico exacto
        div.style.willChange = "transform";

        try {
          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: mapRef.current,
            position: { lat: client.lat, lng: client.lng },
            title: client.name,
            content: div,
            zIndex: client.type === "A" ? 999 : 1,
          });

          marker.addListener("click", () => setSelectedClient(client));
          markersRef.current.push(marker);
        } catch (err) {
          // 🔁 fallback al marcador clásico si falla AdvancedMarkerElement
          const fallback = new google.maps.Marker({
            map: mapRef.current,
            position: { lat: client.lat, lng: client.lng },
            title: client.name,
            icon: {
              url: `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`,
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 38),
            },
          });
          fallback.addListener("click", () => setSelectedClient(client));
          markersRef.current.push(fallback);
        }
      });
    };

    loadMarkers();
    return clearMarkers;
  }, [clients, setSelectedClient, mapRef]);
};
