import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Truck } from "lucide-react-native";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { useSupplierStore } from "@/stores/supplierStore";
import { Supplier } from "@/types";

export default function SuppliersSection() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useSupplierStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState<Supplier>({
    id: "",
    name: "",
    offeredProducts: "",
    contactPerson: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.offeredProducts.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setCurrentSupplier(null);
    setFormData({
      id: "",
      name: "",
      offeredProducts: "",
      contactPerson: "",
    });
    setErrors({});
    setModalVisible(true);
  };

  const handleEditClick = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setFormData({ ...supplier });
    setErrors({});
    setModalVisible(true);
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
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

    if (currentSupplier) {
      updateSupplier(currentSupplier.id, formData);
    } else {
      addSupplier({
        ...formData,
        id: Date.now().toString(),
      });
    }
    
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (currentSupplier) {
      deleteSupplier(currentSupplier.id);
      setDeleteModalVisible(false);
    }
  };

  const columns = [
    { key: "name", title: "Name", width: "30%" },
    { key: "offeredProducts", title: "Angebotene Produkte", width: "40%" },
    { key: "contactPerson", title: "Ansprechpartner", width: "30%" },
  ];

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Lieferanten" 
        icon={<Truck size={20} color="#A0CE4E" />} 
      />
      
      <View style={styles.toolbar}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Lieferanten durchsuchen..."
        />
        <Button
          title="+ Lieferant hinzufügen"
          onPress={handleAddClick}
          style={styles.addButton}
        />
      </View>

      <Table
        columns={columns}
        data={filteredSuppliers}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit Modal */}
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={currentSupplier ? "Lieferant bearbeiten" : "Neuen Lieferanten hinzufügen"}
      >
        <FormField
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Name des Lieferanten"
          error={errors.name}
        />
        <FormField
          label="Angebotene Produkte"
          value={formData.offeredProducts}
          onChangeText={(text) => setFormData({ ...formData, offeredProducts: text })}
          placeholder="Produkte und Dienstleistungen"
          multiline
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
        title="Lieferant löschen"
      >
        <View style={styles.deleteModalContent}>
          <FormField
            label="Möchten Sie diesen Lieferanten wirklich löschen?"
            value={currentSupplier?.name || ""}
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