import { Trophy, Sparkles } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatters } from "../../../utils/formatters.utils";

export default function FacturacionCard({
  nombre,
  facturado = 0,
  objetivo = 1,
  diasRestantes = 1,
  onOpenRecommendation, // 🔹 Prop opcional
}) {
  const progreso = objetivo > 0 ? (facturado / objetivo) * 100 : 0;
  const alcanzado = progreso >= 100;
  const restante = Math.max(objetivo - facturado, 0);
  const promedioDiario = diasRestantes > 0 ? restante / diasRestantes : restante;
  const color = progreso < 50 ? "red" : progreso < 100 ? "orange" : "green";

  return (
    <div
      className={`
        relative rounded-xl border p-4 shadow-sm bg-white
        transition-all duration-500 group
        ${alcanzado ? "bg-green-50 border-green-300" : "border-gray-200"}
        ${onOpenRecommendation ? "hover:shadow-md hover:border-indigo-200 cursor-pointer" : ""}
      `}
      onClick={() => onOpenRecommendation?.()}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-1">
        {/* NOMBRE */}
        <h3 className="font-medium text-gray-800 capitalize">{nombre}</h3>

        {/* BLOQUE DERECHA: % + IA */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold text-${color}-600`}>
            {progreso.toFixed(1)}%
          </span>

          {onOpenRecommendation && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenRecommendation?.();
              }}
              className={`
                flex items-center gap-1 px-1.5 py-1 
                rounded-full bg-gray-50 text-gray-400 shadow-sm transition-all
                group-hover:text-indigo-600 group-hover:bg-indigo-50
              `}
              title="Ver recomendación inteligente"
              aria-label="Abrir recomendación IA"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide">IA</span>
            </button>
          )}
        </div>
      </div>

      {/* BARRA DE PROGRESO */}
      <ProgressBar progreso={Math.min(progreso, 100)} />

      {/* FACTURADO / OBJETIVO */}
      <div className="mt-3 text-sm flex justify-between text-gray-700">
        <span>{formatters.currency(facturado)}</span>
        <span className="text-gray-400">/ {formatters.currency(objetivo)}</span>
      </div>

      {/* MENSAJE INFORMATIVO */}
      <div className="mt-3 text-xs text-center">
        {alcanzado ? (
          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold text-xs">
            <span>+{((facturado / objetivo) * 100 - 100).toFixed(1)}%</span>
            <Trophy className="w-4 h-4" /> ¡Buen trabajo!
          </div>
        ) : (
          <div className="text-gray-600">
            Necesitas <b>{formatters.currency(promedioDiario)}</b> / día
          </div>
        )}
      </div>
    </div>
  );
}
