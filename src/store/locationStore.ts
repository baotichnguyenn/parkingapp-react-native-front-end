import { create } from "zustand";

type LocationState = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  address: string;

  setLocation: (
    location: { latitude: number; longitude: number },
    address: string
  ) => void;
  clearLocation: () => void;
};

type LocationType = {
  locationType: string;

  setLocationType: (locationType: string) => void;
  clearLocationType: () => void;
};

export const useLocationTypeStore = create<LocationType>((set) => ({
  locationType: "",

  setLocationType: (locationType) => set({ locationType }),
  clearLocationType: () => set({ locationType: "" }),
}));
export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  address: "",

  setLocation: (location, address) => set({ location, address }),
  clearLocation: () => set({ location: null, address: "" }),
}));
