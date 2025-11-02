import { NavItem } from "./NavItem";
import { useMenuItems } from "../hooks/useMenuItems";
import { useNavigation } from "../hooks/useNavigation";

export function BottomNavMobile() {
    const menuItems = useMenuItems();
    const { navigateTo, isActive } = useNavigation();

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 shadow-sm"
            aria-label="Navegación inferior móvil"
        >
            {menuItems
                .filter((item) => item.icon)
                .map((item) => (
                    <NavItem
                        key={item.name}
                        name={item.name}
                        icon={item.icon}
                        path={item.path}
                        isActive={isActive(item.path)}
                        onClick={() => navigateTo(item.path)}
                    />
                ))}
        </nav>
    );
}
