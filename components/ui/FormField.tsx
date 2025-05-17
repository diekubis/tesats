import React from "react";
import { View, Text, TextInput, StyleSheet, ViewStyle } from "react-native";

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  style?: ViewStyle;
  error?: string;
}

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style,
  error,
}: FormFieldProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: "#E2E8F0",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0B1B2A",
    borderWidth: 1,
    borderColor: "#2D3748",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#F56565",
  },
  errorText: {
    color: "#F56565",
    fontSize: 12,
    marginTop: 4,
  },
});