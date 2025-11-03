import { useState } from "react";
import { formatters } from "../../utils/formatters.utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useClientFamilyRevenue } from "../../hooks/useClientFamilyRevenue";
import ToggleVista from "../ui/ToggleVista";

const ClientFamilyChart = ({ client }) => {
    const [vista, setVista] = useState("mensual");
    const familias = useClientFamilyRevenue(client, vista);

    if (!familias.length) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center text-gray-500 text-sm">
                Sin datos de facturación por familia.
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm w-full">
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold text-gray-800 text-lg">
                    Facturación por familia
                </h4>
                <ToggleVista vista={vista} setVista={setVista} />
            </div>

            {/* 📊 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {familias.map(({ fam, current, last, growth }) => {
                    const isPositive = growth >= 0;
                    const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

                    return (
                        <div
                            key={fam}
                            className={`p-5 rounded-2xl shadow-sm border relative transition group
                flex flex-col items-center text-center justify-between
                ${isPositive
                                    ? "border-green-100 bg-green-50/60 hover:bg-green-50"
                                    : "border-red-100 bg-red-50/60 hover:bg-red-50"}`}
                        >
                            <h5 className="text-base font-semibold text-gray-900 capitalize mb-3 truncate max-w-[90%]">
                                {fam}
                            </h5>

                            <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="text-xl font-bold text-gray-900">
                                    {formatters.currency(current)}
                                </span>
                            </div>

                            <div
                                className={`flex items-center justify-center gap-1 text-sm font-semibold mb-2 ${isPositive ? "text-green-700" : "text-red-700"
                                    }`}
                            >
                                <Icon size={16} />
                                <span>{formatters.percentage(growth)}</span>
                            </div>

                            <div className="flex flex-col text-xs text-gray-500 bg-white/50 rounded-md px-2 py-1 w-fit mx-auto">
                                2024:
                                <span className="font-medium text-gray-700">
                                    {formatters.currency(last)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ClientFamilyChart;
