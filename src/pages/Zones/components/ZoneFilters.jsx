import { Filter } from "lucide-react";

export const ZoneFilters = ({
  filterType,
  setFilterType,
  totalClients,
  visibleClients,
}) => {
  return (
    <div className="w-full md:w-auto bg-white border border-gray-200 rounded-2xl shadow p-3 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium pr-2 border-r border-gray-100">
        <Filter className="w-4 h-4" />
        <span>Filtro por tipo</span>
      </div>

      {/* Tipo */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="text-sm border rounded-md px-2 py-1"
      >
        <option value="ALL">Todos los tipos</option>
        <option value="A">A — Alta facturación</option>
        <option value="B">B — Media facturación</option>
        <option value="C">C — Baja facturación</option>
        <option value="PROSPECT">P — Prospecto</option>
      </select>

      {/* Indicadores y limpiar */}
      <div className="ml-auto flex items-center gap-3">
        <p className="text-xs text-gray-500">
          {visibleClients} visibles / {totalClients} totales
        </p>

        <button
          onClick={() => setFilterType("ALL")}
          className="text-xs text-blue-600 hover:text-blue-700 underline"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};
