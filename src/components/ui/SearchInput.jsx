import { Search } from "lucide-react";

/**
 * Input controlado de búsqueda con icono y estilos integrados.
 * Props:
 * - value: string
 * - onChange: (valor: string) => void
 */
export const SearchInput = ({ value, onChange, placeholder = "Buscar..." }) => {
    return (
        <div className="relative w-full">
            <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
        </div>
    );
};

export default SearchInput;
