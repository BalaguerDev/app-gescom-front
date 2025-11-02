/**
 * Selector simple entre dos vistas: "mensual" o "anual"
 * Props:
 * - vista: string
 * - setVista: (vista: string) => void
 */

export const ToggleVista = ({ vista, setVista }) => {
  const opciones = [
    { id: "mensual", label: "Mes" },
    { id: "anual", label: "Año" },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg shadow-sm w-fit overflow-hidden border border-gray-200">
      {opciones.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setVista(opt.id)}
          className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-all duration-200
          ${vista === opt.id
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-200"}`}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleVista;
