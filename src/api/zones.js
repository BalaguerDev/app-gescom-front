import { handleApiError } from "@/utils/api.utils";
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL;


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

export const updateZone = async (getToken, zoneId, updatedData) => {
  try {
    const token = await getToken();
    const response = await axios.put(
      `${API_BASE_URL}/zones/${zoneId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Devuelve un formato coherente con el resto
    return { success: true, data: response.data };
  } catch (err) {
    return handleApiError(err, "updateZone");
  }
};
