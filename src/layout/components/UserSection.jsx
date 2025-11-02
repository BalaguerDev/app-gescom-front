import { useAuth0 } from "@auth0/auth0-react";

export default function UserSection({ compact = false }) {
  const { user, logout } = useAuth0();
  if (!user) return null;

  return (
    <div
      className={`flex items-center justify-between gap-3 p-4 border-t border-gray-200 ${
        compact ? "md:hidden" : "hidden md:flex"
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={user.picture}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm">{user.name}</span>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="text-xs text-gray-500 hover:text-red-500 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
