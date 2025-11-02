export function NavItem({ name, icon: Icon, isActive, onClick }) {
    const base = "flex flex-col items-center text-xs transition-colors duration-200";
    const active = isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600";

    return (
        <button
            onClick={onClick}
            className={`${base} ${active}`}
            aria-label={name}
        >
            <Icon className="w-6 h-6" />
            <span>{name}</span>
        </button>
    );
}
