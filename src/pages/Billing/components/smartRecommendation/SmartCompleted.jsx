import { Trophy } from "lucide-react";

export function SmartCompleted({ bg, keyName }) {
    return (
        <div className={`rounded-xl p-4 sm:p-5 ${bg} flex flex-col items-center text-center`}>
            <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 mb-2" />
            <p className="text-sm sm:text-base text-gray-800 font-medium leading-snug">
                Has alcanzado el objetivo de{" "}
                <span className="font-semibold text-emerald-700">{keyName}</span>.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md leading-relaxed">
                🏆 Excelente trabajo. Enfoca tus esfuerzos en las familias o categorías que aún no han alcanzado su meta.
            </p>
        </div>
    );
}
