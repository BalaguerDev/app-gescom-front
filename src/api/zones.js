import { handleApiError } from "@/utils/api.utils";

export const fetchZones = async (getToken) => {
  try {
    const token = await getToken();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/zones`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    return handleApiError(err, "fetchZones");
  }
};

export const autoGenerateZones = async (getToken) => {
  try {
    const token = await getToken();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/zones/auto`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    return handleApiError(err, "autoGenerateZones");
  }
};

export const createZone = async (getToken, zoneData) => {
  try {
    const token = await getToken();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/zones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(zoneData),
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    return handleApiError(err, "createZone");
  }
};

export const deleteZone = async (getToken, id) => {
  try {
    const token = await getToken();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/zones/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: res.ok };
  } catch (err) {
    return handleApiError(err, "deleteZone");
  }
};
