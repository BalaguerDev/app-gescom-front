"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ZoneModal = ({
    zoneName,
    setZoneName,
    zoneColor,
    setZoneColor,
    setShowModal,
    handleConfirmNewZone,
}) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative border border-gray-100"
                >
                    {/* ❌ Botón cerrar */}
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                    >
                        <X size={20} />
                    </button>

                    {/* 🧭 Título */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Crear nueva zona
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Asigna un nombre y un color identificativo para tu nueva zona en el mapa.
                        </p>
                    </div>

                    {/* 🏷️ Nombre */}
                    <div className="mb-5">
                        <label
                            htmlFor="zoneName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nombre de la zona
                        </label>
                        <input
                            id="zoneName"
                            type="text"
                            value={zoneName}
                            onChange={(e) => setZoneName(e.target.value)}
                            placeholder="Ej. Zona Norte"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 placeholder-gray-400 transition"
                        />
                    </div>

                    {/* 🎨 Color */}
                    <div className="mb-8">
                        <label
                            htmlFor="zoneColor"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Color de la zona
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="zoneColor"
                                type="color"
                                value={zoneColor}
                                onChange={(e) => setZoneColor(e.target.value)}
                                className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200 shadow-sm"
                            />
                            <span className="text-sm text-gray-600">
                                Selecciona un color que represente la zona en el mapa.
                            </span>
                        </div>
                    </div>

                    {/* 💾 Botón */}
                    <button
                        onClick={handleConfirmNewZone}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-150"
                    >
                        Guardar zona
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
