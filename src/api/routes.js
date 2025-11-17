// src/api/routes.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/routes";

export const getRouteByDay = async ({ userId, date, startAddress, endAddress }) => {
  const res = await axios.get(`${API}/day`, {
    params: { userId, date, startAddress, endAddress },
  });
  return res.data.data;
};

export const regenerateRoute = async ({ userId, date, startAddress, endAddress }) => {
  const res = await axios.post(`${API}/regenerate`, {
    userId,
    date,
    startAddress,
    endAddress,
  });
  return res.data.data;
};

export const getRouteDirectByDate = async ({ userId, date, startAddress, endAddress }) => {
  const res = await axios.get(`${API}/${date}`, {
    params: { userId, startAddress, endAddress },
  });
  return res.data.data;
};
