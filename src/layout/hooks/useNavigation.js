import { useNavigate, useLocation } from "react-router-dom";

export function useNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const navigateTo = (path) => navigate(path);
    const isActive = (path) => pathname === path;

    return { navigateTo, isActive, currentPath: pathname };
}
