import { useViewport } from "./useViewport";

export function useLayoutOffsets() {
  const { isMobile } = useViewport();

  // Alturas fijas aproximadas
  const navbarHeight = isMobile ? 25 : 0; // px
  const bottomNavHeight = isMobile ? 82 : 0; // px

  return {
    top: navbarHeight,
    bottom: bottomNavHeight,
  };
}
