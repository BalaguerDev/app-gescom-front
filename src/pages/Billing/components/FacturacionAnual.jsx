import { motion } from "framer-motion";
import { Trophy, TrendingUp, AlertTriangle } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatters } from "../../../utils/formatters.utils";

export default function FacturacionAnual({ anualFacturacion, objetivoAnual }) {
  const total = anualFacturacion?.total || 0;
  const progreso = objetivoAnual > 0 ? (total / objetivoAnual) * 100 : 0;
  const diff = ((total / objetivoAnual - 1) * 100).toFixed(1);

  // Estado visual
  const status =
    progreso >= 100 ? "cumplido" : progreso >= 70 ? "en-curso" : "riesgo";

  const statusConfig = {
    cumplido: {
      icon: Trophy,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200",
      msg: `🎉 Objetivo anual superado · +${diff}% sobre el plan.`,
    },
    "en-curso": {
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-200",
      msg: "Buen ritmo. Mantén la constancia para cerrar el año con éxito.",
    },
    riesgo: {
      icon: AlertTriangle,
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-200",
      msg: "Ritmo por debajo del objetivo. Refuerza las categorías clave.",
    },
  };

  const { icon: Icon, color, bg, msg } = statusConfig[status];

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
        Facturación anual
      </h2>

      <div
        className={`
          rounded-2xl border shadow-sm p-6 sm:p-7 
          bg-gradient-to-br from-white to-gray-50 ${bg}
          transition-all duration-500
        `}
      >
        {/* ENCABEZADO */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Facturación total</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {formatters.currency(total)}
            </p>
            <p className="text-sm text-gray-500">
              Objetivo: {formatters.currency(objetivoAnual)}
            </p>
          </div>

          <div className={`flex flex-col items-end ${color}`}>
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
            <span className="font-semibold text-sm sm:text-base">
              {formatters.percentage(progreso)}
            </span>
          </div>
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="mt-3 mb-4">
          <ProgressBar progreso={Math.min(progreso, 100)} />
        </div>

        {/* MENSAJE CONTEXTUAL */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-sm sm:text-base ${color} font-medium flex items-center gap-2`}
        >
          <Icon className="w-4 h-4" />
          {msg}
        </motion.p>
      </div>
    </motion.section>
  );
}
