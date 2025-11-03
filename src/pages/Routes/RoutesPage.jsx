// src/pages/RoutesPage.jsx
import { useAuth0 } from "@auth0/auth0-react";

export default function RoutesPage() {
  const { user } = useAuth0();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-800">
          Hola, {user?.given_name || user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm">
          Bienvenido de nuevo a tu panel de gestión comercial.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-gray-800 font-medium mb-1">Clientes activos</h3>
          <p className="text-3xl font-semibold text-blue-600">124</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-gray-800 font-medium mb-1">Campañas activas</h3>
          <p className="text-3xl font-semibold text-green-600">8</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-gray-800 font-medium mb-1">Ventas mensuales</h3>
          <p className="text-3xl font-semibold text-purple-600">€45.320</p>
        </div>
      </div>
    </section>
  );
}
