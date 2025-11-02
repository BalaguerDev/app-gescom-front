/**
 * Utilidades para manejo centralizado de errores API
 * 
 * ✅ Captura errores de red, respuesta o código.
 * ✅ Devuelve un objeto con { success, data, error }.
 * ✅ Loggea en consola para debug local.
 */

export const handleApiError = (error, context = "API") => {
    console.error(`❌ [${context}]`, error);

    // Si es un error de red (sin respuesta)
    if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
        return {
            success: false,
            data: null,
            error: "No se pudo conectar con el servidor. Revisa tu conexión.",
        };
    }

    // Si viene de una respuesta HTTP con formato JSON
    if (error.response) {
        const status = error.response.status;
        let message = "Error desconocido en la API.";

        if (status === 401) message = "No autorizado. Inicia sesión nuevamente.";
        if (status === 403) message = "Acceso denegado. No tienes permisos.";
        if (status === 404) message = "Recurso no encontrado.";
        if (status >= 500) message = "Error interno del servidor.";

        return {
            success: false,
            data: null,
            error: message,
        };
    }

    // Si es un error general de JS
    return {
        success: false,
        data: null,
        error: error.message || "Error inesperado al procesar la solicitud.",
    };
};

/**
 * Helper para verificar y parsear respuestas HTTP.
 * 
 * Uso típico:
 *   const data = await safeJson(response)
 */
export const safeJson = async (response) => {
    try {
        return await response.json();
    } catch {
        return null;
    }
};
