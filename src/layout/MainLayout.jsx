import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { BottomNavMobile } from "./components/BottomNavMobile";
import { NavbarMobile } from "./components/NavbarMobile";
import { useLayoutOffsets } from "./hooks/useLayoutOffsets";
import { ResponsiveWrapper } from "./components/ResponsiveWrapper";

export default function MainLayout() {
    const { top, bottom } = useLayoutOffsets();

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-900">
            {/* Sidebar desktop */}
            <Sidebar />

            {/* Contenido principal */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Navbar superior móvil */}
                <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
                    <NavbarMobile />
                </div>

                {/* Contenido central */}
                <main
                    className={`
        flex-1 
        px-6 md:px-10 
        transition-all duration-300
        overflow-y-auto
    `}
                    style={{
                        // En móvil usa offsets dinámicos, en desktop aplica padding fijo
                        paddingTop: window.innerWidth < 768 ? `${top}px` : "1.25rem",
                        paddingBottom: window.innerWidth < 768 ? `${bottom}px` : "1.25rem",
                    }}
                >
                    <ResponsiveWrapper>
                        <Outlet />
                    </ResponsiveWrapper>
                </main>

                {/* Nav inferior móvil */}
                <div className="md:hidden sticky bottom-0 z-40 bg-white border-t border-gray-200">
                    <BottomNavMobile />
                </div>
            </div>
        </div>
    );
}
