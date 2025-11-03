import { Target, CalendarClock, TrendingUp, Gauge } from "lucide-react";
import { formatters } from "@/utils/formatters.utils";

export function SmartMetrics({
    restante,
    promedioDiario,
    proyeccion,
    proyeccionPorcentaje,
    diferenciaRitmo,
    icon,
    text,
}) {
    return (
        <div className="flex sm:grid sm:grid-cols-4 gap-4 overflow-x-auto pb-2 no-scrollbar">
            <Metric
                label="Restante"
                value={formatters.currency(restante)}
                icon={<Target className="w-4 h-4 text-gray-500 mb-1" />}
            />
            <Metric
                label="Necesario/día"
                value={formatters.currency(promedioDiario)}
                icon={<CalendarClock className="w-4 h-4 text-gray-500 mb-1" />}

            />
            <Metric
                label="Proyección"
                value={`${formatters.currency(proyeccion)} (${proyeccionPorcentaje.toFixed(1)}%)`}
                icon={<TrendingUp className={`w-4 h-4 mb-1 ${icon}`} />}
                textClass={text}
            />
            <Metric
                label="Ritmo actual"
                value={`${diferenciaRitmo >= 0 ? "+" : ""}${formatters.currency(diferenciaRitmo)} /día`}
                icon={<Gauge className="w-4 h-4 text-gray-500 mb-1" />}
                textClass={diferenciaRitmo >= 0 ? "text-emerald-700" : "text-rose-600"}
            />
        </div>
    );
}

function Metric({ label, value, icon, textClass = "text-gray-900" }) {
    return (
        <div className="min-w-[100px] flex flex-col items-center sm:items-center">
            {icon}
            <p className="text-[11px] text-gray-500 text-center">{label}</p>
            <p className={`text-xs font-semibold text-center ${textClass}`}>{value}</p>
        </div>
    );
}
