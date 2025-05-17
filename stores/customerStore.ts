import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Customer } from "@/types";

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updatedCustomer: Customer) => void;
  deleteCustomer: (id: string) => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: [],
      addCustomer: (customer) => set((state) => ({ 
        customers: [...state.customers, customer] 
      })),
      updateCustomer: (id, updatedCustomer) => set((state) => ({
        customers: state.customers.map((customer) => 
          customer.id === id ? { ...updatedCustomer, id } : customer
        ),
      })),
      deleteCustomer: (id) => set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== id),
      })),
    }),
    {
      name: "mediio-customers-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);