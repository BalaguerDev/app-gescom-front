import { NavLink } from "react-router-dom";
import { useMenuItems } from "../hooks/useMenuItems";
import { AppLogo } from "./AppLogo";
import UserSection from "./UserSection";

export default function Sidebar() {
  const menuItems = useMenuItems();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* 🔹 Logo superior */}
      <div className="p-6 border-b border-gray-100">
        <AppLogo />
      </div>

      {/* 🔹 Menú principal con scroll si es largo */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* 🔹 Usuario anclado abajo */}
      <div className="sticky bottom-0">
        <UserSection />
      </div>
    </aside>
  );
}
