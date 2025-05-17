import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Building2 } from "lucide-react-native";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { useClinicStore } from "@/stores/clinicStore";
import { Clinic } from "@/types";

export default function ClinicsSection() {
  const { clinics, addClinic, updateClinic, deleteClinic } = useClinicStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentClinic, setCurrentClinic] = useState<Clinic | null>(null);
  const [formData, setFormData] = useState<Clinic>({
    id: "",
    name: "",
    address: "",
    contactPerson: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clinic.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setCurrentClinic(null);
    setFormData({
      id: "",
      name: "",
      address: "",
      contactPerson: "",
    });
    setErrors({});
    setModalVisible(true);
  };

  const handleEditClick = (clinic: Clinic) => {
    setCurrentClinic(clinic);
    setFormData({ ...clinic });
    setErrors({});
    setModalVisible(true);
  };

  const handleDeleteClick = (clinic: Clinic) => {
    setCurrentClinic(clinic);
    setDeleteModalVisible(true);
  };

  const handleSave = () => {
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name ist erforderlich";
    if (!formData.address.trim()) newErrors.address = "Adresse ist erforderlich";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (currentClinic) {
      updateClinic(currentClinic.id, formData);
    } else {
      addClinic({
        ...formData,
        id: Date.now().toString(),
      });
    }
    
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (currentClinic) {
      deleteClinic(currentClinic.id);
      setDeleteModalVisible(false);
    }
  };

  const columns = [
    { key: "name", title: "Name", width: "30%" },
    { key: "address", title: "Adresse", width: "40%" },
    { key: "contactPerson", title: "Ansprechpartner", width: "30%" },
  ];

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Kliniken" 
        icon={<Building2 size={20} color="#A0CE4E" />} 
      />
      
      <View style={styles.toolbar}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Kliniken durchsuchen..."
        />
        <Button
          title="+ Klinik hinzufügen"
          onPress={handleAddClick}
          style={styles.addButton}
        />
      </View>

      <Table
        columns={columns}
        data={filteredClinics}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit Modal */}
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={currentClinic ? "Klinik bearbeiten" : "Neue Klinik hinzufügen"}
      >
        <FormField
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Klinikname eingeben"
          error={errors.name}
        />
        <FormField
          label="Adresse"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholder="Straße, PLZ, Ort"
          error={errors.address}
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
        title="Klinik löschen"
      >
        <View style={styles.deleteModalContent}>
          <FormField
            label="Möchten Sie diese Klinik wirklich löschen?"
            value={currentClinic?.name || ""}
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