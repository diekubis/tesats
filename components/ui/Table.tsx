import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Edit, Trash2 } from "lucide-react-native";

interface Column {
  key: string;
  title: string;
  width?: number | string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export default function Table({ columns, data, onEdit, onDelete }: TableProps) {
  const isWeb = Platform.OS === "web";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        {columns.map((column) => (
          <View
            key={column.key}
            style={[styles.headerCell, column.width ? { width: column.width } : {}]}
          >
            <Text style={styles.headerText}>{column.title}</Text>
          </View>
        ))}
        {(onEdit || onDelete) && <View style={styles.actionsHeader}><Text style={styles.headerText}>Aktionen</Text></View>}
      </View>

      {/* Body */}
      <ScrollView style={styles.body}>
        {data.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Keine Einträge vorhanden</Text>
          </View>
        ) : (
          data.map((item, index) => (
            <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
              {columns.map((column) => (
                <View
                  key={column.key}
                  style={[styles.cell, column.width ? { width: column.width } : {}]}
                >
                  <Text style={styles.cellText} numberOfLines={isWeb ? 0 : 2}>
                    {Array.isArray(item[column.key])
                      ? item[column.key].join(", ")
                      : item[column.key] || "-"}
                  </Text>
                </View>
              ))}
              {(onEdit || onDelete) && (
                <View style={styles.actions}>
                  {onEdit && (
                    <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
                      <Edit size={18} color="#00BCD4" />
                    </TouchableOpacity>
                  )}
                  {onDelete && (
                    <TouchableOpacity onPress={() => onDelete(item)} style={styles.actionButton}>
                      <Trash2 size={18} color="#F56565" />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A2A3A",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2D3748",
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#2D3748",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerCell: {
    flex: 1,
  },
  headerText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  actionsHeader: {
    width: 120,
    alignItems: "center",
  },
  body: {
    maxHeight: 300,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2D3748",
  },
  evenRow: {
    backgroundColor: "#1A2A3A",
  },
  oddRow: {
    backgroundColor: "#1E2A3A",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
  },
  cellText: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    color: "#A0AEC0",
    fontSize: 14,
  },
});