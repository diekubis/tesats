import React from "react";
import { View, Text, StyleSheet, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Header() {
  // Define colors as ColorValue array to match LinearGradient's expected type
  const gradientColors: readonly [ColorValue, ColorValue] = ["#A0CE4E", "#00BCD4"];
  
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>MEDIIO</Text>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.logoLine}
        />
      </View>
      <Text style={styles.subtitle}>Interne Verwaltung</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0B1B2A",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#1E2A3A",
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  logoLine: {
    height: 3,
    width: 100,
    marginTop: 4,
    borderRadius: 2,
  },
  subtitle: {
    color: "#A0AEC0",
    fontSize: 16,
    marginTop: 4,
  },
});