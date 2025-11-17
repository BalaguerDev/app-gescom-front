// src/pages/components/ClientDetail.jsx
import React, { useMemo, useState } from "react";
import { computeRevenueData } from "../../../utils/revenue.utils";
import { 
  MapPin, Phone, Tag,
  TrendingUp, TrendingDown 
} from "lucide-react";

// % crecimiento
const getGrowth = (now, last) => {
  if (last === 0) return 0;
  return (((now - last) / last) * 100).toFixed(1);
};

export default function ClientDetail({ client, routeDate }) {

  // HOOKS SIEMPRE ARRIBA
  const [showVisitModal, setShowVisitModal] = useState(false);

  const revenue = useMemo(() => {
    if (!client) return null;
    return computeRevenueData(client, routeDate);
  }, [client, routeDate]);

  // Render seguro
  if (!client || !revenue) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Selecciona un cliente para ver los detalles
      </div>
    );
  }

  const { families, monthTotal, ytd } = revenue;

  const Trend = ({ now, last }) => {
    if (now > last)
      return (
        <div className="flex items-center text-green-600 font-medium">
          <TrendingUp size={18} />
          <span className="ml-1">+{getGrowth(now, last)}%</span>
        </div>
      );
    if (now < last)
      return (
        <div className="flex items-center text-red-600 font-medium">
          <TrendingDown size={18} />
          <span className="ml-1">{getGrowth(now, last)}%</span>
        </div>
      );
    return <span className="text-gray-400">0%</span>;
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-12">
      
      {/* ===============================
          CABECERA
      =============================== */}
      <section className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">{client.name}</h2>
          <p className="text-gray-500 mt-1">
            Última visita: {client.visits?.[0]?.date || "Nunca"}
          </p>

          <div className="mt-5 space-y-3 text-gray-700 text-sm">
            <p className="flex items-center gap-3">
              <MapPin size={20} className="text-red-600" />
              {client.address}
            </p>
            <p className="flex items-center gap-3">
              <Phone size={20} className="text-blue-600" />
              {client.phone}
            </p>
            <p className="flex items-center gap-3">
              <Tag size={20} className="text-yellow-600" />
              {client.category}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowVisitModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm text-sm font-medium transition"
        >
          Registrar visita
        </button>
      </section>

      {/* ===============================
          FAMILIAS
      =============================== */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Detalle por familias</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {families.map((f) => {
            const growth = getGrowth(f.current, f.lastYear);

            const bgClass =
              growth > 0
                ? "bg-gradient-to-br from-green-50 to-green-100"
                : growth < 0
                ? "bg-gradient-to-br from-red-50 to-red-100"
                : "bg-gray-50";

            return (
              <div
                key={f.family}
                className={`${bgClass} p-5 border rounded-xl shadow-sm transition-all`}
              >
                <div className="text-gray-600 text-sm capitalize">{f.family}</div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold text-gray-800">
                    {f.current} €
                  </span>
                  <Trend now={f.current} last={f.lastYear} />
                </div>

                <div className="text-gray-500 text-xs mt-1">
                  Año anterior: {f.lastYear} €
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===============================
          KPIs
      =============================== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow-sm border rounded-xl p-5">
          <div className="text-gray-500 text-sm">Facturación del mes</div>
          <div className="flex items-center mt-2 text-3xl font-bold text-gray-800 gap-3">
            {monthTotal.current} €
            <Trend now={monthTotal.current} last={monthTotal.lastYear} />
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Año anterior: {monthTotal.lastYear} €
          </div>
        </div>

        <div className="bg-white shadow-sm border rounded-xl p-5">
          <div className="text-gray-500 text-sm">Acumulado YTD</div>
          <div className="flex items-center mt-2 text-3xl font-bold text-gray-800 gap-3">
            {ytd.current} €
            <Trend now={ytd.current} last={ytd.lastYear} />
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Año anterior: {ytd.lastYear} €
          </div>
        </div>

        <div className="bg-white shadow-sm border rounded-xl p-5">
          <div className="text-gray-500 text-sm">Familia destacada</div>

          {(() => {
            const best = [...families].sort(
              (a, b) =>
                getGrowth(b.current, b.lastYear) -
                getGrowth(a.current, a.lastYear)
            )[0];

            return (
              <div className="mt-2">
                <div className="text-xl font-semibold capitalize text-gray-800">
                  {best.family}
                </div>
                <div className="flex items-center text-lg mt-1 text-gray-700 gap-2">
                  {best.current} €
                  <Trend now={best.current} last={best.lastYear} />
                </div>
                <div className="text-gray-500 text-sm">
                  Año anterior: {best.lastYear} €
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ===============================
          MODAL
      =============================== */}
      {showVisitModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-6">

            <h3 className="text-xl font-semibold text-gray-900">
              Registrar visita a {client.name}
            </h3>

            <div>
              <label className="text-sm font-medium">Fecha y hora</label>
              <input
                type="datetime-local"
                defaultValue={new Date().toISOString().slice(0, 16)}
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Resultado</label>
              <select className="mt-1 w-full border rounded-lg p-2">
                <option>Reunión realizada</option>
                <option>Pedido cerrado</option>
                <option>Interés potencial</option>
                <option>No localizado / visita fallida</option>
              </select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Oportunidades</p>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-blue-600" />
                Cliente solicita oferta
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-blue-600" />
                Interés en nuevas familias
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-blue-600" />
                Posible nueva línea de producto
              </label>
            </div>

            <div>
              <label className="text-sm font-medium">Notas</label>
              <textarea
                rows="3"
                className="mt-1 w-full border rounded-lg p-2"
                placeholder="Escribe notas..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowVisitModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                onClick={() => setShowVisitModal(false)}
              >
                Guardar visita
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
