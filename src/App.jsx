// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import LoadingScreen from "@/components/common/LoadingScreen";
import routes from "@/routes/appRoutes";
import MainLayout from "./layout/MainLayout";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  useAuthRedirect(isAuthenticated, isLoading);

  if (isLoading) return <LoadingScreen message="Cargando sesión..." />;
  if (!isAuthenticated) return null;

  return (
    <Routes>
      {/* Todas las rutas privadas comparten MainLayout */}
      <Route element={<MainLayout />}>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path.replace(/^\//, "")} element={<Component />} />
        ))}
      </Route>

      {/* Redirección fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
