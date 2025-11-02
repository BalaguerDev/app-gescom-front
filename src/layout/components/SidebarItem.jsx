import { useNavigation } from "../hooks/useNavigation";

export function SidebarItem({ name, icon: Icon, path }) {
    const { navigateTo, isActive } = useNavigation();

    const base =
        "flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer";
    const active = isActive(path)
        ? "bg-blue-50 text-blue-600"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600";

    return (
        <button
            onClick={() => navigateTo(path)}
            className={`${base} ${active}`}
            aria-label={name}
        >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
        </button>
    );
}
