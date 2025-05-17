import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Supplier } from "@/types";

interface SupplierState {
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (id: string, updatedSupplier: Supplier) => void;
  deleteSupplier: (id: string) => void;
}

export const useSupplierStore = create<SupplierState>()(
  persist(
    (set) => ({
      suppliers: [],
      addSupplier: (supplier) => set((state) => ({ 
        suppliers: [...state.suppliers, supplier] 
      })),
      updateSupplier: (id, updatedSupplier) => set((state) => ({
        suppliers: state.suppliers.map((supplier) => 
          supplier.id === id ? { ...updatedSupplier, id } : supplier
        ),
      })),
      deleteSupplier: (id) => set((state) => ({
        suppliers: state.suppliers.filter((supplier) => supplier.id !== id),
      })),
    }),
    {
      name: "mediio-suppliers-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);