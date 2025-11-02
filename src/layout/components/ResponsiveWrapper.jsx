import { useViewport } from "../hooks/useViewport";

/**
 * Envuelve contenido y decide si mostrar children, mobile o desktop.
 * Si no se pasa mobile/desktop, simplemente renderiza los children.
 */
export function ResponsiveWrapper({ mobile, desktop, children }) {
  const { isMobile } = useViewport();

  // Si se pasan mobile/desktop, elige uno
  if (mobile || desktop) {
    return isMobile ? mobile : desktop;
  }

  // Si solo hay children (como en MainLayout), muestra directamente
  return <>{children}</>;
}

export default ResponsiveWrapper;
