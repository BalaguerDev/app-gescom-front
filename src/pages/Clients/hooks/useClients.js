import { useState, useEffect, useCallback } from "react";
import { fetchClients } from "@/api/clients";

export const useClients = (getAccessTokenSilently) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadClients = useCallback(async () => {
        try {
            setLoading(true);
            const { success, data, error: apiError } = await fetchClients(getAccessTokenSilently);
            if (!success) throw new Error(apiError);
            setClients(data);
        } catch (err) {
            console.error("❌ Error al cargar clientes:", err);
            setError("No se pudieron obtener los clientes.");
        } finally {
            setLoading(false);
        }
    }, [getAccessTokenSilently]);

    useEffect(() => {
        if (getAccessTokenSilently) loadClients();
    }, [getAccessTokenSilently, loadClients]);

    return { clients, loading, error, reload: loadClients };
};
