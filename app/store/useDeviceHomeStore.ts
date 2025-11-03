import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DeviceHomeState {
    device: string | null;
    setDevice: (device: string) => void;
    clear: () => void;
}

export const useDeviceHomeStore = create<DeviceHomeState>()(
  persist(
    (set) => ({
      device: null,
      setDevice: (device: string) => set({ device }),
      clear: () => set({ device: null }),
    }),
    {
      name: "device-home-storage",
    }
  )
);
