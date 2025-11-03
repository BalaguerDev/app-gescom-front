import { Brain, X } from "lucide-react";

export function SmartHeader({ objetivoCumplido, keyName, badge, icon, probabilidad, onClose }) {
    return (
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <Brain className={`w-5 h-5 sm:w-6 sm:h-6 ${icon}`} />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2 flex-wrap">
                    {objetivoCumplido ? (
                        <>
                            <span>🎯 Objetivo cumplido</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${badge}`}>
                                {keyName}
                            </span>
                        </>
                    ) : (
                        <>
                            <span>Recomendación IA ·</span>
                            <span className="capitalize text-gray-700 font-normal">{keyName}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${badge}`}>
                                {probabilidad === "alta"
                                    ? "✅ Alcanzable"
                                    : probabilidad === "media"
                                        ? "⚡ Impulsa"
                                        : "🔴 En riesgo"}
                            </span>
                        </>
                    )}
                </h3>
            </div>

            {!objetivoCumplido && (
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 -mr-2"
                    aria-label="Cerrar recomendación"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
