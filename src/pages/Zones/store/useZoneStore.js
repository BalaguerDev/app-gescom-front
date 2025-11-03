// useZoneStore.js
import { create } from "zustand";

export const useZonesStore = create((set) => ({
  zones: [], // ✅ array vacío por defecto
  setZones: (zones) => set({ zones: Array.isArray(zones) ? zones : [] }),
  addZone: (zone) =>
    set((state) => ({
      zones: [...(Array.isArray(state.zones) ? state.zones : []), zone],
    })),
  deleteZone: (id) =>
    set((state) => ({
      zones: state.zones.filter((z) => z.id !== id),
    })),
  selectedZone: null,
  setSelectedZone: (zone) => set({ selectedZone: zone }),
}));
