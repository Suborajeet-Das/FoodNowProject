import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function BarChartCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Order Summary</Text>

      <BarChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [{ data: [10, 20, 15, 30, 25] }],
        }}
        width={Dimensions.get("window").width - 70}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#FDF3D7",
          backgroundGradientTo: "#FDF3D7",
          color: () => "#F2A900",
        }}
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FDF3D7",
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6A0A0A",
    marginBottom: 10,
  },
});
