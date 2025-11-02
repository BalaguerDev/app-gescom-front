export default function WelcomeBanner({ user }) {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-md">
            <h1 className="text-2xl font-semibold">
                Hola, {user?.name || "usuario"} 👋
            </h1>
            <p className="mt-1 text-sm opacity-90">
                Bienvenido de nuevo a tu panel de gestión comercial.
            </p>
        </div>
    );
}
