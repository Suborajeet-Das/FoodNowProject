import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const KioskHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kiosk Mode</Text>
      <Text style={styles.subtitle}>Kiosk ready for use!</Text>
    </SafeAreaView>
  );
};

export default KioskHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { fontSize: 16, marginTop: 10 },
});
