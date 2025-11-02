import { Loader2, RefreshCcw } from "lucide-react";

/**
 * Componente que maneja los tres estados de datos:
 * - loading: muestra un spinner
 * - error: muestra mensaje con botón reintentar
 * - children: renderiza el contenido normal
 */
export const DataStateHandler = ({ loading, error, onRetry, children }) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Loader2 size={32} className="animate-spin mb-2 text-blue-500" />
                <p>Cargando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="mb-3 text-center text-red-500">{error}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        <RefreshCcw size={16} />
                        Reintentar
                    </button>
                )}
            </div>
        );
    }

    return <>{children}</>;
};

export default DataStateHandler;
