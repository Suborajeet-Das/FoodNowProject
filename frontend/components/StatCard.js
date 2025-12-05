import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatCard({ icon, title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FDF3D7",
    padding: 15,
    borderRadius: 15,
    width: "48%",
    marginVertical: 8,
    elevation: 4,
  },
  icon: {
    fontSize: 32,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: "#6A0A0A",
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6A0A0A",
  },
});
