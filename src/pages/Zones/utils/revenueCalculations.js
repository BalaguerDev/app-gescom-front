const mesActual = new Date().getMonth() + 1;

export const calcularFacturacionActual = (client) =>
    client?.revenueCurrentYear
        ?.filter((m) => m.month <= mesActual)
        .reduce((acc, m) => acc + m.total, 0) || 0;

export const calcularFacturacionAnterior = (client) =>
    client?.revenueLastYear
        ?.filter((m) => m.month <= mesActual)
        .reduce((acc, m) => acc + m.total, 0) || 0;

export const calcularCrecimiento = (client) => {
    const actual = calcularFacturacionActual(client);
    const anterior = calcularFacturacionAnterior(client);
    if (anterior === 0) return null;
    return ((actual - anterior) / anterior) * 100;
};

export const calcularFacturacionZona = (zone, allClients = []) => {
    if (!zone || !Array.isArray(allClients)) return 0;

    const clientsInZone = allClients.filter((c) =>
        zone.clients?.some((z) => z.id === c.id)
    );

    return clientsInZone.reduce((acc, c) => {
        const total =
            c.revenueCurrentYear?.reduce((sum, r) => sum + (r.total || 0), 0) || 0;
        return acc + total;
    }, 0);
};
// Determina qué clientes están dentro de un polígono
export const getClientsInPolygon = (path, clients) => {
    if (!window.google?.maps?.geometry?.poly?.containsLocation) return [];
    const polygon = new window.google.maps.Polygon({ paths: path });

    return clients.filter((c) => {
        if (!c.lat || !c.lng) return false;
        const point = new window.google.maps.LatLng(c.lat, c.lng);
        return window.google.maps.geometry.poly.containsLocation(point, polygon);
    });
};
