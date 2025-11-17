// src/hooks/useRoute.js
import { useState } from "react";
import { getRouteByDay, regenerateRoute, getRouteDirectByDate } from "../api/routes";

export function useRoute() {
  const [route, setRoute] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadRoute = async ({ userId, date, startAddress, endAddress }) => {
    setLoading(true);
    try {
      const data = await getRouteByDay({ userId, date, startAddress, endAddress });
      setRoute(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const reloadRoute = async (params) => {
    setLoading(true);
    try {
      const data = await regenerateRoute(params);
      setRoute(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return {
    route,
    selectedClient,
    loading,
    setSelectedClient,
    loadRoute,
    reloadRoute,
  };
}
