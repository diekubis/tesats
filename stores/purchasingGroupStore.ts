import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PurchasingGroup } from "@/types";

interface PurchasingGroupState {
  purchasingGroups: PurchasingGroup[];
  addPurchasingGroup: (group: PurchasingGroup) => void;
  updatePurchasingGroup: (id: string, updatedGroup: PurchasingGroup) => void;
  deletePurchasingGroup: (id: string) => void;
}

export const usePurchasingGroupStore = create<PurchasingGroupState>()(
  persist(
    (set) => ({
      purchasingGroups: [],
      addPurchasingGroup: (group) => set((state) => ({ 
        purchasingGroups: [...state.purchasingGroups, group] 
      })),
      updatePurchasingGroup: (id, updatedGroup) => set((state) => ({
        purchasingGroups: state.purchasingGroups.map((group) => 
          group.id === id ? { ...updatedGroup, id } : group
        ),
      })),
      deletePurchasingGroup: (id) => set((state) => ({
        purchasingGroups: state.purchasingGroups.filter((group) => group.id !== id),
      })),
    }),
    {
      name: "mediio-purchasing-groups-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);