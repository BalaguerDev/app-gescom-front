import { DataStateHandler } from "../../components/ui/DataStateHandler";
import { useBillingData } from "./hooks/useBillingData";
import {
    BillingHeader,
    FacturacionMensual,
    FacturacionTrimestral,
    FacturacionAnual,
} from "./components";

export default function BillingPage() {
    const data = useBillingData();

    return (
        <DataStateHandler loading={data.loading} error={data.error} onRetry={data.reload}>
            <div className="space-y-10 animate-fadeIn">
                <BillingHeader {...data} />
                <FacturacionMensual
                    mensualFacturacion={data.mensualFacturacion}
                    objetivosCategorias={data.objetivosCategorias}
                    diasRestantes={data.diasRestantes}
                />
                <FacturacionTrimestral {...data} />
                <FacturacionAnual {...data} />
            </div>
        </DataStateHandler>
    );
}
