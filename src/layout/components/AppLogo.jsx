import { Link } from "react-router-dom";

export function AppLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
    >
      <span className="text-xl font-bold text-blue-600 group-hover:text-blue-700">
        Gescom
      </span>
      <span className="text-xs text-gray-400 font-medium hidden sm:block">
        Smart Sales
      </span>
    </Link>
  );
}


