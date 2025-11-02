import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function useAuthRedirect(isAuthenticated, isLoading) {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);
}
