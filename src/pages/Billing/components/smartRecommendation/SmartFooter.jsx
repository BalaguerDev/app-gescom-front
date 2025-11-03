import { Lightbulb } from "lucide-react";

export function SmartFooter({ diasRestantes, probabilidad, accion }) {
    const resumen =
        probabilidad === "alta"
            ? "Sigue optimizando tus rutas y prioriza clientes top."
            : probabilidad === "media"
                ? "Refuerza las categorías más lentas."
                : "Focaliza acciones en clientes clave.";

    return (
        <div className="mt-4 sm:mt-5 text-[11px] sm:text-xs text-gray-600 leading-relaxed">
            <p>
                📅 Quedan <b>{diasRestantes}</b> días · {resumen}
            </p>

            <div className="mt-2 flex items-center gap-2 text-gray-700 font-medium">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                <span>💡 {accion}</span>
            </div>
        </div>
    );
}
