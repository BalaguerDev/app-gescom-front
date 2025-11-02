import { useAuth0 } from "@auth0/auth0-react";
import { useLayoutStore } from "../store/layoutStore";
import { AppLogo } from "./AppLogo";


export function NavbarMobile() {
    const { user } = useAuth0();
    const { toggleUserModal } = useLayoutStore();

    return (
        <>
            <header className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow-sm">
                <AppLogo />
                <button onClick={toggleUserModal} aria-label="Abrir usuario">
                    <img
                        src={user?.picture}
                        alt={user?.name}
                        className="w-9 h-9 rounded-full border border-gray-200"
                    />
                </button>
            </header>
        </>
    );
}
