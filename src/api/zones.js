import { handleApiError, safeJson } from "@/utils/api.utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

/**
 * 🔹 Obtener todas las zonas del usuario autenticado
 */
export async function fetchZones(getAccessTokenSilently) {
    try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${API_URL}/zones`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Error ${res.status}: al cargar las zonas`);

        const data = await safeJson(res);
        return { success: true, data };
    } catch (error) {
        return handleApiError(error, "fetchZones");
    }
}

/**
 * 🔹 Crear una nueva zona
 */
export async function createZone(getAccessTokenSilently, zoneData) {
    try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${API_URL}/zones`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(zoneData),
        });

        if (!res.ok) throw new Error(`Error ${res.status}: al crear la zona`);

        const data = await safeJson(res);
        return { success: true, data };
    } catch (error) {
        return handleApiError(error, "createZone");
    }
}

/**
 * 🔹 Eliminar zona por ID
 */
export async function deleteZone(getAccessTokenSilently, id) {
    try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${API_URL}/zones/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Error ${res.status}: al eliminar la zona`);

        const data = await safeJson(res);
        return { success: true, data };
    } catch (error) {
        return handleApiError(error, "deleteZone");
    }
}
