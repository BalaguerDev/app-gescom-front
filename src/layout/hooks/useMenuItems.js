import { routes } from "@/constants/routes";

export function useMenuItems() {
  return Array.isArray(routes) ? routes : [];
}
