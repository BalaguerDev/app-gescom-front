// 🎨 Paleta corporativa unificada para todo el sistema
export const PARETO_COLORS = {
  A: "#16A34A", // Alta facturación — verde
  B: "#F59E0B", // Media facturación — ámbar
  C: "#9CA3AF", // Baja facturación — gris
  PROSPECT: "#2563EB", // Prospecto — azul profesional
  UNKNOWN: "#6B7280", // Desconocido — gris oscuro
};

// 🔧 Devuelve el color asociado a cada tipo
export const getParetoColor = (type) =>
  PARETO_COLORS[type?.toUpperCase()] || PARETO_COLORS.UNKNOWN;

// 🔧 Utilidad para generar tonos más suaves (rgba)
export const hexToRgba = (hex, alpha = 0.15) => {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
