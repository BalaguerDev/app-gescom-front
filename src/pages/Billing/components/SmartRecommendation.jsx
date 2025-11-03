import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmartRecommendation } from "../hooks/useSmartRecommendation";
import { SmartHeader } from "./smartRecommendation/SmartHeader";
import { SmartMetrics } from "./smartRecommendation/SmartMetrics";
import { SmartFooter } from "./smartRecommendation/SmartFooter";
import { SmartCompleted } from "./smartRecommendation/SmartCompleted";

export default function SmartRecommendation({ familia, diasRestantes }) {
  const [visible, setVisible] = useState(true);
  const data = useSmartRecommendation(familia, diasRestantes);
  const { key: _omitKey, ...rest } = data;

  useEffect(() => setVisible(true), [familia.key]);

  if (!visible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.key}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl border ${data.border} bg-gradient-to-br from-white to-gray-50 relative shadow-md sm:shadow-sm transition-all ${data.objetivoCumplido
          ? "pointer-events-none opacity-95"
          : "active:scale-[0.98]"
          }`}
      >
        <SmartHeader
          objetivoCumplido={data.objetivoCumplido}
          keyName={data.key}
          badge={data.badge}
          icon={data.icon}
          probabilidad={data.probabilidad}
          onClose={() => setVisible(false)}
        />

        {data.objetivoCumplido ? (
          <SmartCompleted bg={data.bg} keyName={data.key} />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`rounded-xl p-3 sm:p-4 ${data.bg} mb-4 sm:mb-5`}
            >
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                {data.msg}
              </p>
            </motion.div>


            <SmartMetrics {...rest} />
            <SmartFooter {...rest} />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
