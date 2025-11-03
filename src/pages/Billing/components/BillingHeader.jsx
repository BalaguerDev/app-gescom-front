import { TrendingUp, CalendarDays, Target, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { formatters } from "../../../utils/formatters.utils";

export default function BillingHeader({
  mesActual,
  añoActual,
  diasRestantes,
  fechaActual,
  totalMes,
  objetivoMes,
  progresoMes,
}) {
  // Colores dinámicos
  const colorTexto =
    progresoMes >= 100
      ? "text-emerald-600"
      : progresoMes >= 75
      ? "text-amber-500"
      : "text-rose-600";

  const bgColor =
    progresoMes >= 100
      ? "bg-emerald-50 border-emerald-100"
      : progresoMes >= 75
      ? "bg-amber-50 border-amber-100"
      : "bg-rose-50 border-rose-100";

  const mesNombre = formatters.monthName(mesActual);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        
        flex flex-col gap-4 md:flex-row md:items-center md:justify-between
        transition-all duration-300 backdrop-blur-sm
      "
    >
      {/* BLOQUE IZQUIERDA */}
      <div className="flex flex-col gap-2 w-full md:w-2/3 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
          <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 shrink-0" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 tracking-tight leading-tight">
            Facturación {mesNombre} {añoActual}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 flex items-center justify-center md:justify-start gap-1 sm:gap-2 flex-wrap">
          <Clock className="w-4 h-4 text-gray-400 shrink-0" />
          <span>
            Faltan <b>{diasRestantes}</b> días ·{" "}
            <span className="text-gray-500">
              Última actualización:{" "}
              {fechaActual.toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
        </p>
      </div>

      {/* BLOQUE DERECHA */}
      <div
        className={`flex flex-col sm:flex-row items-center sm:items-end justify-center md:justify-end
                    w-full md:w-auto gap-3 px-4 sm:px-5 py-3 rounded-2xl border ${bgColor} shadow-inner`}
      >
        <div className="text-center sm:text-right">
          <p className="text-sm sm:text-base font-semibold text-gray-800 flex flex-col sm:flex-row sm:justify-end items-center gap-1">
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4 text-gray-500" />
              Facturado:
            </span>
            <span className="font-bold text-gray-900">
              {formatters.currency(totalMes)}
            </span>
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            Objetivo: {formatters.currency(objetivoMes)}
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
          className={`flex items-center justify-center sm:justify-end gap-1 sm:gap-2 font-semibold ${colorTexto}`}
        >
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-base sm:text-lg">{progresoMes.toFixed(1)}%</span>
          <span className="hidden sm:inline text-gray-600 font-medium">
            del objetivo
          </span>
        </motion.div>
      </div>
    </motion.header>
  );
}
