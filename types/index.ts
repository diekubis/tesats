export interface Clinic {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
}

export interface PurchasingGroup {
  id: string;
  name: string;
  associatedClinics: string[]; // Array of clinic IDs
  contactPerson: string;
}

export interface Supplier {
  id: string;
  name: string;
  offeredProducts: string;
  contactPerson: string;
}

export interface Customer {
  id: string;
  name: string;
  clinicAffiliation: string; // Clinic ID
  contactPerson: string;
}