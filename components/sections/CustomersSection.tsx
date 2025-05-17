import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { UserCircle } from "lucide-react-native";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { useCustomerStore } from "@/stores/customerStore";
import { useClinicStore } from "@/stores/clinicStore";
import { Customer } from "@/types";

export default function CustomersSection() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomerStore();
  const { clinics } = useClinicStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Customer>({
    id: "",
    name: "",
    clinicAffiliation: "",
    contactPerson: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.clinicAffiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Map clinic IDs to names for display
  const enhancedCustomers = filteredCustomers.map(customer => {
    const clinic = clinics.find(c => c.id === customer.clinicAffiliation);
    return {
      ...customer,
      clinicAffiliation: clinic ? clinic.name : customer.clinicAffiliation,
    };
  });

  const handleAddClick = () => {
    setCurrentCustomer(null);
    setFormData({
      id: "",
      name: "",
      clinicAffiliation: "",
      contactPerson: "",
    });
    setErrors({});
    setModalVisible(true);
  };

  const handleEditClick = (customer: Customer) => {
    setCurrentCustomer(customer);
    setFormData({ ...customer });
    setErrors({});
    setModalVisible(true);
  };

  const handleDeleteClick = (customer: Customer) => {
    setCurrentCustomer(customer);
    setDeleteModalVisible(true);
  };

  const handleSave = () => {
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name ist erforderlich";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (currentCustomer) {
      updateCustomer(currentCustomer.id, formData);
    } else {
      addCustomer({
        ...formData,
        id: Date.now().toString(),
      });
    }
    
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (currentCustomer) {
      deleteCustomer(currentCustomer.id);
      setDeleteModalVisible(false);
    }
  };

  const columns = [
    { key: "name", title: "Name", width: "30%" },
    { key: "clinicAffiliation", title: "Klinikzugehörigkeit", width: "40%" },
    { key: "contactPerson", title: "Ansprechpartner", width: "30%" },
  ];

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Kunden" 
        icon={<UserCircle size={20} color="#00BCD4" />} 
      />
      
      <View style={styles.toolbar}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Kunden durchsuchen..."
        />
        <Button
          title="+ Kunde hinzufügen"
          onPress={handleAddClick}
          style={styles.addButton}
        />
      </View>

      <Table
        columns={columns}
        data={enhancedCustomers}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit Modal */}
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={currentCustomer ? "Kunde bearbeiten" : "Neuen Kunden hinzufügen"}
      >
        <FormField
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Name des Kunden"
          error={errors.name}
        />
        
        <FormField
          label="Klinikzugehörigkeit"
          value={formData.clinicAffiliation}
          onChangeText={(text) => {
            // Try to match clinic name to ID
            const clinic = clinics.find(c => c.name === text);
            setFormData({ 
              ...formData, 
              clinicAffiliation: clinic ? clinic.id : text 
            });
          }}
          placeholder="Zugehörige Klinik"
        />
        
        <FormField
          label="Ansprechpartner"
          value={formData.contactPerson}
          onChangeText={(text) => setFormData({ ...formData, contactPerson: text })}
          placeholder="Name des Ansprechpartners"
        />
        
        <View style={styles.modalActions}>
          <Button
            title="Abbrechen"
            onPress={() => setModalVisible(false)}
            variant="secondary"
            style={styles.modalButton}
          />
          <Button
            title="Speichern"
            onPress={handleSave}
            style={styles.modalButton}
          />
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Kunde löschen"
      >
        <View style={styles.deleteModalContent}>
          <FormField
            label="Möchten Sie diesen Kunden wirklich löschen?"
            value={currentCustomer?.name || ""}
            onChangeText={() => {}}
            style={styles.readOnlyField}
          />
          
          <View style={styles.modalActions}>
            <Button
              title="Abbrechen"
              onPress={() => setDeleteModalVisible(false)}
              variant="secondary"
              style={styles.modalButton}
            />
            <Button
              title="Löschen"
              onPress={handleDelete}
              variant="danger"
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addButton: {
    marginLeft: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
  },
  modalButton: {
    marginLeft: 12,
  },
  deleteModalContent: {
    paddingVertical: 8,
  },
  readOnlyField: {
    opacity: 0.7,
  },
});