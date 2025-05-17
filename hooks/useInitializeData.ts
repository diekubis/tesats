import { useEffect } from "react";
import { Platform } from "react-native";
import { useClinicStore } from "@/stores/clinicStore";
import { usePurchasingGroupStore } from "@/stores/purchasingGroupStore";
import { useSupplierStore } from "@/stores/supplierStore";
import { useCustomerStore } from "@/stores/customerStore";

// Sample data for initial setup
const sampleClinics = [
  {
    id: "c1",
    name: "Universitätsklinikum Berlin",
    address: "Charitéplatz 1, 10117 Berlin",
    contactPerson: "Dr. Müller",
  },
  {
    id: "c2",
    name: "Klinikum München-Schwabing",
    address: "Kölner Platz 1, 80804 München",
    contactPerson: "Prof. Schmidt",
  },
];

const samplePurchasingGroups = [
  {
    id: "pg1",
    name: "Einkaufsverbund Nord",
    associatedClinics: ["c1"],
    contactPerson: "Frau Weber",
  },
];

const sampleSuppliers = [
  {
    id: "s1",
    name: "MedTech GmbH",
    offeredProducts: "Medizinische Geräte, Verbrauchsmaterialien",
    contactPerson: "Herr Schulz",
  },
];

const sampleCustomers = [
  {
    id: "cu1",
    name: "Praxis Dr. Fischer",
    clinicAffiliation: "c2",
    contactPerson: "Dr. Fischer",
  },
];

export function useInitializeData() {
  const { clinics, addClinic } = useClinicStore();
  const { purchasingGroups, addPurchasingGroup } = usePurchasingGroupStore();
  const { suppliers, addSupplier } = useSupplierStore();
  const { customers, addCustomer } = useCustomerStore();

  useEffect(() => {
    // Only initialize data if stores are empty
    if (clinics.length === 0) {
      sampleClinics.forEach(clinic => addClinic(clinic));
    }
    
    if (purchasingGroups.length === 0) {
      samplePurchasingGroups.forEach(group => addPurchasingGroup(group));
    }
    
    if (suppliers.length === 0) {
      sampleSuppliers.forEach(supplier => addSupplier(supplier));
    }
    
    if (customers.length === 0) {
      sampleCustomers.forEach(customer => addCustomer(customer));
    }
  }, []);
}