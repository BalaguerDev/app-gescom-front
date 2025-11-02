export default function LoadingScreen({ message = "Cargando..." }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <span className="text-gray-700 text-sm font-medium">{message}</span>
        </div>
    );
}
