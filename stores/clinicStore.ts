import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Clinic } from "@/types";

interface ClinicState {
  clinics: Clinic[];
  addClinic: (clinic: Clinic) => void;
  updateClinic: (id: string, updatedClinic: Clinic) => void;
  deleteClinic: (id: string) => void;
}

export const useClinicStore = create<ClinicState>()(
  persist(
    (set) => ({
      clinics: [],
      addClinic: (clinic) => set((state) => ({ 
        clinics: [...state.clinics, clinic] 
      })),
      updateClinic: (id, updatedClinic) => set((state) => ({
        clinics: state.clinics.map((clinic) => 
          clinic.id === id ? { ...updatedClinic, id } : clinic
        ),
      })),
      deleteClinic: (id) => set((state) => ({
        clinics: state.clinics.filter((clinic) => clinic.id !== id),
      })),
    }),
    {
      name: "mediio-clinics-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);