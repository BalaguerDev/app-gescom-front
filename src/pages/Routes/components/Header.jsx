// src/components/routes/Header.jsx
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

export default function Header({ date, setDate }) {
  const goPrev = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d.toISOString().slice(0, 10));
  };

  const goNext = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d.toISOString().slice(0, 10));
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">

      {/* IZQUIERDA: Título */}
      <h1 className="text-2xl font-semibold tracking-tight">Rutero</h1>

      {/* DERECHA: Flechas + calendario */}
      <div className="flex items-center gap-3">

        <button
          onClick={goPrev}
          className="p-2 rounded-md border bg-gray-50 hover:bg-gray-100 transition"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative flex items-center">
          <CalendarDays size={18} className="absolute left-3 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="pl-10 pr-3 py-2 border rounded-md bg-white shadow-sm hover:bg-gray-50 transition"
          />
        </div>

        <button
          onClick={goNext}
          className="p-2 rounded-md border bg-gray-50 hover:bg-gray-100 transition"
        >
          <ChevronRight size={20} />
        </button>

      </div>
    </div>
  );
}
