import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TopProductCard({ product }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Product</Text>
      <Text style={styles.product}>{product}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FDF3D7",
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#6A0A0A" },
  product: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F2A900",
    marginTop: 8,
  },
});
