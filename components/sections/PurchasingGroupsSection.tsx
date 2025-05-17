import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Users } from "lucide-react-native";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { usePurchasingGroupStore } from "@/stores/purchasingGroupStore";
import { useClinicStore } from "@/stores/clinicStore";
import { PurchasingGroup } from "@/types";

export default function PurchasingGroupsSection() {
  const { purchasingGroups, addPurchasingGroup, updatePurchasingGroup, deletePurchasingGroup } = usePurchasingGroupStore();
  const { clinics } = useClinicStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<PurchasingGroup | null>(null);
  const [formData, setFormData] = useState<PurchasingGroup>({
    id: "",
    name: "",
    associatedClinics: [],
    contactPerson: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredGroups = purchasingGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Map clinic IDs to names for display
  const enhancedGroups = filteredGroups.map(group => ({
    ...group,
    associatedClinics: group.associatedClinics.map(clinicId => {
      const clinic = clinics.find(c => c.id === clinicId);
      return clinic ? clinic.name : clinicId;
    })
  }));

  const handleAddClick = () => {
    setCurrentGroup(null);
    setFormData({
      id: "",
      name: "",
      associatedClinics: [],
      contactPerson: "",
    });
    setErrors({});
    setModalVisible(true);
  };

  const handleEditClick = (group: PurchasingGroup) => {
    setCurrentGroup(group);
    setFormData({ ...group });
    setErrors({});
    setModalVisible(true);
  };

  const handleDeleteClick = (group: PurchasingGroup) => {
    setCurrentGroup(group);
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

    if (currentGroup) {
      updatePurchasingGroup(currentGroup.id, formData);
    } else {
      addPurchasingGroup({
        ...formData,
        id: Date.now().toString(),
      });
    }
    
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (currentGroup) {
      deletePurchasingGroup(currentGroup.id);
      setDeleteModalVisible(false);
    }
  };

  const handleClinicSelection = (clinicId: string) => {
    const updatedClinics = [...formData.associatedClinics];
    const index = updatedClinics.indexOf(clinicId);
    
    if (index === -1) {
      updatedClinics.push(clinicId);
    } else {
      updatedClinics.splice(index, 1);
    }
    
    setFormData({ ...formData, associatedClinics: updatedClinics });
  };

  const columns = [
    { key: "name", title: "Name", width: "30%" },
    { key: "associatedClinics", title: "Zugehörige Kliniken", width: "40%" },
    { key: "contactPerson", title: "Ansprechpartner", width: "30%" },
  ];

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Einkaufsgemeinschaften" 
        icon={<Users size={20} color="#00BCD4" />} 
      />
      
      <View style={styles.toolbar}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Einkaufsgemeinschaften durchsuchen..."
        />
        <Button
          title="+ Gruppe hinzufügen"
          onPress={handleAddClick}
          style={styles.addButton}
        />
      </View>

      <Table
        columns={columns}
        data={enhancedGroups}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit Modal */}
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={currentGroup ? "Einkaufsgemeinschaft bearbeiten" : "Neue Einkaufsgemeinschaft hinzufügen"}
      >
        <FormField
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Name der Einkaufsgemeinschaft"
          error={errors.name}
        />
        
        <FormField
          label="Ansprechpartner"
          value={formData.contactPerson}
          onChangeText={(text) => setFormData({ ...formData, contactPerson: text })}
          placeholder="Name des Ansprechpartners"
        />
        
        <FormField
          label="Zugehörige Kliniken (durch Komma getrennt)"
          value={formData.associatedClinics.map(id => {
            const clinic = clinics.find(c => c.id === id);
            return clinic ? clinic.name : id;
          }).join(", ")}
          onChangeText={(text) => {
            // Simple comma-separated parsing
            const clinicNames = text.split(",").map(name => name.trim());
            const clinicIds = clinicNames
              .map(name => {
                const clinic = clinics.find(c => c.name === name);
                return clinic ? clinic.id : null;
              })
              .filter(id => id !== null) as string[];
            
            setFormData({ ...formData, associatedClinics: clinicIds });
          }}
          placeholder="Kliniken eingeben (durch Komma getrennt)"
          multiline
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
        title="Einkaufsgemeinschaft löschen"
      >
        <View style={styles.deleteModalContent}>
          <FormField
            label="Möchten Sie diese Einkaufsgemeinschaft wirklich löschen?"
            value={currentGroup?.name || ""}
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