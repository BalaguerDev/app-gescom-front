import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatters } from "../../../utils/formatters.utils";
import ProgressBar from "@/components/ui/ProgressBar";
import { TrendingUp, ChevronLeft, BarChart3 } from "lucide-react";

export default function FacturacionTrimestral({
  trimestreActual,
  trimestralFacturacion,
  objetivosTrimestralesFamilias,
}) {
  const [modoDetalle, setModoDetalle] = useState(null);
  const scrollRef = useRef(null);

  // 🔹 Centra el trimestre actual en móvil
  useEffect(() => {
    if (scrollRef.current && trimestreActual) {
      const activeCard = scrollRef.current.querySelector(`[data-q="${trimestreActual}"]`);
      if (activeCard) {
        activeCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [trimestreActual]);

  // 🔹 Desactivar scroll lateral cuando está en detalle
  useEffect(() => {
    const container = scrollRef.current;
    if (modoDetalle && container) {
      container.style.overflowX = "hidden";
    } else if (container) {
      container.style.overflowX = "auto";
    }
  }, [modoDetalle]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Facturación Trimestral
        </h2>
      </div>

      {/* GRID EN DESKTOP / CARRUSEL EN MOBILE */}
      <div
        ref={scrollRef}
        className={`
          flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 
          sm:overflow-visible 
          snap-x snap-mandatory sm:snap-none
          scroll-smooth pb-3 sm:pb-0
          ${modoDetalle ? "overflow-x-hidden" : "overflow-x-auto"}
        `}
      >
        {Object.keys(objetivosTrimestralesFamilias).map((q) => {
          const factQ = trimestralFacturacion?.[q] || {};
          const totalQ = Object.values(factQ).reduce((a, b) => a + b, 0);
          const objetivoQ = Object.values(objetivosTrimestralesFamilias[q]).reduce(
            (a, b) => a + b,
            0
          );
          const progreso = objetivoQ > 0 ? (totalQ / objetivoQ) * 100 : 0;
          const isActive = q === trimestreActual;
          const isDetail = modoDetalle === q;

          // Familias ordenadas
          const ranking = Object.entries(factQ)
            .map(([cat, val]) => ({
              cat,
              fact: val,
              obj: objetivosTrimestralesFamilias[q][cat],
              prog: (val / objetivosTrimestralesFamilias[q][cat]) * 100,
            }))
            .sort((a, b) => b.prog - a.prog);

          const inactiveStyle = !isActive
            ? "opacity-60 scale-[0.95] blur-[0.2px]"
            : "opacity-100 scale-100";

          return (
            <motion.div
              key={q}
              data-q={q}
              layout
              onClick={() => setModoDetalle(isDetail ? null : q)}
              className={`
                snap-center flex-shrink-0 sm:flex-shrink p-3
                rounded-2xl border shadow-sm cursor-pointer
                transition-all duration-500 bg-gradient-to-br from-white to-gray-50
                ${isActive ? "border-indigo-300 shadow-md" : "border-gray-200"}
                ${
                  isDetail
                    ? "w-full min-w-full sm:min-w-0 scale-[1.02] px-4 sm:px-5 py-5"
                    : `min-w-[85%] sm:min-w-0 hover:scale-[1.01] ${inactiveStyle}`
                }
              `}
            >
              <AnimatePresence mode="wait">
                {!isDetail ? (
                  // 🟢 VISTA GLOBAL
                  <motion.div
                    key="global"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`font-semibold ${
                          isActive ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {q}
                      </h3>
                      <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        {formatters.percentage(progreso)}
                      </div>
                    </div>

                    <p className="text-lg font-bold text-gray-900 mb-1">
                      {formatters.currency(totalQ)}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Objetivo: {formatters.currency(objetivoQ)}
                    </p>

                    <ProgressBar progreso={progreso} />

                    <div className="flex justify-end mt-3">
                      <button
                        className={`text-xs ${
                          isActive ? "text-indigo-600" : "text-gray-400"
                        } font-medium flex items-center gap-1 hover:underline`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModoDetalle(q);
                        }}
                      >
                        <BarChart3 className="w-3.5 h-3.5" /> Ver familias
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  // 🔵 VISTA DETALLE — OCUPA TODO EL ANCHO EN MÓVIL
                  <motion.div
                    key="detalle"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    <div className="max-w-[800px] mx-auto w-full">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                          {q} · Familias
                        </h3>
                        <button
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModoDetalle(null);
                          }}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>

                      {/* GLOBAL ARRIBA */}
                      <div className="text-xs text-gray-600 mb-3">
                        <p>
                          Total facturado:{" "}
                          <b className="text-gray-900">
                            {formatters.currency(totalQ)}
                          </b>{" "}
                          /{" "}
                          <span className="text-gray-500">
                            {formatters.currency(objetivoQ)} objetivo
                          </span>{" "}
                          (
                          <span className="font-semibold text-green-600">
                            {formatters.percentage(progreso)}
                          </span>
                          )
                        </p>
                      </div>

                      {/* FAMILIAS */}
                      <div className="space-y-3">
                        {ranking.map((f) => (
                          <div key={f.cat} className="flex flex-col p-2">
                            <div className="flex justify-between items-center">
                              <p className="capitalize text-sm font-medium text-gray-800">
                                {f.cat}
                              </p>
                              <span
                                className={`text-xs sm:text-sm font-semibold ${
                                  f.prog >= 100
                                    ? "text-green-600"
                                    : f.prog >= 70
                                    ? "text-orange-500"
                                    : "text-red-500"
                                }`}
                              >
                                {f.prog.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px] sm:text-xs text-gray-600 mt-1">
                              <span>{formatters.currency(f.fact)} facturado</span>
                              <span className="text-gray-400 text-end">
                                {formatters.currency(f.obj)} objetivo
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BOTÓN VOLVER */}
                    <div className="flex justify-end mt-4 max-w-[800px] mx-auto w-full">
                      <button
                        className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModoDetalle(null);
                        }}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" /> Volver
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
