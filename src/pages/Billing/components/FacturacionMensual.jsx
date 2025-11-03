import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FacturacionCard from "./FacturacionCard";
import SmartRecommendation from "./SmartRecommendation";

export default function FacturacionMensual({
    mensualFacturacion,
    objetivosCategorias,
    diasRestantes,
}) {
    const [familiaSeleccionada, setFamiliaSeleccionada] = useState(null);

    const familias = Object.entries(objetivosCategorias).map(([key, objetivo]) => {
        const facturado = mensualFacturacion?.[key] || 0;
        const progreso = objetivo > 0 ? (facturado / objetivo) * 100 : 0;
        return { key, objetivo, facturado, progreso };
    });

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
        >
            {/* HEADER */}
            <div className="mb-5 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Facturación mensual por familias
                </h2>
            </div>

            {/* GRID DE FAMILIAS */}
            <div className="flex justify-center">
                <div
                    className="
            grid 
            grid-cols-1 
            xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 
            gap-4 sm:gap-5 
            w-full max-w-[1300px]
            justify-items-center
          "
                >
                    {familias.map((f, i) => (
                        <motion.div
                            key={f.key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`w-full sm:w-[90%] md:w-full cursor-pointer transition-all duration-300 ${familiaSeleccionada?.key === f.key
                                    ? "scale-[1.02]"
                                    : "hover:scale-[1.02]"
                                }`}
                            onClick={() => setFamiliaSeleccionada(f)}
                        >
                            <FacturacionCard
                                nombre={f.key.charAt(0).toUpperCase() + f.key.slice(1)}
                                facturado={f.facturado}
                                objetivo={f.objetivo}
                                diasRestantes={diasRestantes}
                                isActive={familiaSeleccionada?.key === f.key}
                                onOpenRecommendation={() => setFamiliaSeleccionada("accesorios")}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* RECOMENDACIÓN IA: solo visible cuando se selecciona una familia */}
            <AnimatePresence mode="wait">
                {familiaSeleccionada && (
                    <motion.div
                        key={familiaSeleccionada.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SmartRecommendation
                            familia={familiaSeleccionada}
                            diasRestantes={diasRestantes}

                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
