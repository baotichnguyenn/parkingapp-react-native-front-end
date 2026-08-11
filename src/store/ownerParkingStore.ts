import { create } from "zustand";

type PriceRange = {
  minCharge: number;
  maxCharge: number;
};

type PriceState = {
  priceRange: PriceRange | null;
  setPriceRange: (range: PriceRange) => void;
  clearPriceRange: () => void;

  totalSlots: number | null;
  setTotalSlots: (slots: number) => void;
  clearTotalSlots: () => void;

  vehicleType: string[] | null;
  setVehicleType: (type: string[]) => void;
  toggleVehicleType: (type: string) => void;

  clearVehicleType: () => void;

  opensAt: string | null;
  closesAt: string | null;
  setTimingsOpenAt: (opens: string) => void;
  setTimingsClosesAt: (closes: string) => void;
  clearTimings: () => void;
};

export const useOwnerStore = create<PriceState>((set) => ({
  // Price range
  priceRange: null,
  setPriceRange: (range) => set({ priceRange: range }),
  clearPriceRange: () => set({ priceRange: null }),

  // Total slots
  totalSlots: 1,
  setTotalSlots: (slots) => set({ totalSlots: slots }),
  clearTotalSlots: () => set({ totalSlots: 1 }),

  // Vehicle type
  vehicleType: [],
  setVehicleType: (types) => set({ vehicleType: types }),
  clearVehicleType: () => set({ vehicleType: [] }),
  toggleVehicleType: (type) =>
    set((state) => {
      const exists = state.vehicleType?.includes(type);
      return {
        vehicleType: exists
          ? state.vehicleType?.filter((t) => t !== type)
          : [...state.vehicleType, type],
      };
    }),

  // Timing
  opensAt: null,
  closesAt: null,

  setTimingsOpenAt: (opens) => set({ opensAt: opens }),
  setTimingsClosesAt: (closes) => set({ closesAt: closes }),
  clearTimings: () => set({ opensAt: null, closesAt: null }),
}));
