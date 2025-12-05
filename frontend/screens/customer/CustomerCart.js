import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StaffHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Customer Home</Text>
      <Text style={styles.subtitle}>Welcome, Dear Customer!</Text>
    </SafeAreaView>
  );
};

export default StaffHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { fontSize: 16, marginTop: 10 },
});
