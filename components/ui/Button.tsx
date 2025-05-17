import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getColors = (): readonly [ColorValue, ColorValue] => {
    switch (variant) {
      case "primary":
        return ["#A0CE4E", "#00BCD4"];
      case "secondary":
        return ["#2D3748", "#4A5568"];
      case "danger":
        return ["#F56565", "#E53E3E"];
      default:
        return ["#A0CE4E", "#00BCD4"];
    }
  };

  const getSizeStyles = (): { button: ViewStyle; text: TextStyle } => {
    switch (size) {
      case "small":
        return {
          button: { paddingVertical: 6, paddingHorizontal: 12 },
          text: { fontSize: 14 },
        };
      case "large":
        return {
          button: { paddingVertical: 14, paddingHorizontal: 24 },
          text: { fontSize: 18 },
        };
      default:
        return {
          button: { paddingVertical: 10, paddingHorizontal: 16 },
          text: { fontSize: 16 },
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const colors = getColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonContainer,
        { opacity: disabled ? 0.6 : 1 },
        style,
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, sizeStyles.button]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={[styles.text, sizeStyles.text, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});