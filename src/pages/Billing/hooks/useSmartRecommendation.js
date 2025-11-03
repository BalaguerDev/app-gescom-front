import { useMemo } from "react";

export function useSmartRecommendation(familia, diasRestantes) {
  const { key, facturado, objetivo } = familia;

  const restante = Math.max(objetivo - facturado, 0);
  const promedioDiario = diasRestantes > 0 ? restante / diasRestantes : restante;

  const fecha = new Date();
  const diaActual = fecha.getDate();
  const totalDiasMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();

  const ritmoActual = facturado / diaActual;
  const ritmoIdeal = objetivo / totalDiasMes;
  const diferenciaRitmo = ritmoActual - ritmoIdeal;
  const proyeccion = ritmoActual * totalDiasMes;
  const proyeccionPorcentaje = (proyeccion / objetivo) * 100;
  const objetivoCumplido = facturado >= objetivo;

  const probabilidad =
    proyeccion >= objetivo
      ? "alta"
      : proyeccion >= objetivo * 0.9
      ? "media"
      : "baja";

  const colorClasses = {
    alta: {
      border: "border-emerald-200",
      text: "text-emerald-700",
      bg: "bg-emerald-50/60",
      icon: "text-emerald-600",
      badge: "bg-emerald-100 text-emerald-700",
      msg: "🚀 Ritmo excelente. Estás por delante del plan.",
      accion: "Prioriza clientes premium o upselling de productos top.",
    },
    media: {
      border: "border-amber-200",
      text: "text-amber-700",
      bg: "bg-amber-50/60",
      icon: "text-amber-600",
      badge: "bg-amber-100 text-amber-700",
      msg: "⚡ Buen ritmo, pero conviene reforzar las familias más débiles.",
      accion: "Refuerza promociones y seguimiento con clientes indecisos.",
    },
    baja: {
      border: "border-rose-200",
      text: "text-rose-700",
      bg: "bg-rose-50/60",
      icon: "text-rose-600",
      badge: "bg-rose-100 text-rose-700",
      msg: "⚠️ Ritmo bajo. Priorizá clientes activos y oportunidades inmediatas.",
      accion: "Lanza acciones directas con clientes clave.",
    },
  };

  const theme = colorClasses[probabilidad];

  return useMemo(
    () => ({
      key,
      restante,
      promedioDiario,
      ritmoActual,
      ritmoIdeal,
      diferenciaRitmo,
      proyeccion,
      proyeccionPorcentaje,
      objetivoCumplido,
      probabilidad,
      diasRestantes,
      ...theme,
    }),
    [familia, diasRestantes, probabilidad]
  );
}
