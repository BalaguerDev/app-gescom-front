import { Target } from "lucide-react";

const ClientCampaigns = ({ client }) => {
    if (!client.revenueCurrentYear) return null;

    const lastMonth = client.revenueCurrentYear.at(-1);
    const families = lastMonth?.families || {};

    // Ejemplo simple: recomendar campañas de familias no compradas recientemente
    const allFamilies = ["maquinas", "accesorios", "herramienta"];
    const missing = allFamilies.filter((f) => !families[f] || families[f] === 0);

    return (
        <div className="space-y-2">
            {missing.length === 0 ? (
                <p className="text-gray-500 text-sm">El cliente ha comprado en todas las familias.</p>
            ) : (
                missing.map((f) => (
                    <div
                        key={f}
                        className="flex items-center gap-2 bg-blue-50 text-blue-700 p-2 rounded-lg"
                    >
                        <Target size={16} />
                        <span className="text-sm">
                            Recomendado: campaña de <strong>{f}</strong>
                        </span>
                    </div>
                ))
            )}
        </div>
    );
};

export default ClientCampaigns;
