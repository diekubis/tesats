import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Search, X } from "lucide-react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder = "Suchen..." }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color="#A0AEC0" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")} style={styles.clearButton}>
          <X size={18} color="#A0AEC0" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A2A3A",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: "#2D3748",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    padding: 0,
    height: "100%",
  },
  clearButton: {
    padding: 4,
  },
});