import React from "react";
import { View, ScrollView, StyleSheet, Text, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import ClinicsSection from "@/components/sections/ClinicsSection";
import PurchasingGroupsSection from "@/components/sections/PurchasingGroupsSection";
import SuppliersSection from "@/components/sections/SuppliersSection";
import CustomersSection from "@/components/sections/CustomersSection";
import { useInitializeData } from "@/hooks/useInitializeData";

export default function Dashboard() {
  // Initialize data on first load
  useInitializeData();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <ClinicsSection />
        <PurchasingGroupsSection />
        <SuppliersSection />
        <CustomersSection />
        {Platform.OS === "web" && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>© {new Date().getFullYear()} MEDIIO - Interne Verwaltung</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1B2A",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  footer: {
    marginTop: 40,
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#6B7280",
    fontSize: 14,
  },
});