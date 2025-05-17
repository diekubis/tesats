import React, { ReactNode } from "react";
import { View, Text, StyleSheet, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
}

export default function SectionHeader({ title, icon }: SectionHeaderProps) {
  // Define colors as ColorValue array to match LinearGradient's expected type
  const gradientColors: readonly [ColorValue, ColorValue] = ["#A0CE4E", "#00BCD4"];
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.line}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  line: {
    height: 2,
    width: 60,
    marginTop: 8,
    borderRadius: 1,
  },
});