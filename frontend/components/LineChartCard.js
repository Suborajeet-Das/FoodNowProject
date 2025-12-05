import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function LineChartCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sales Overview</Text>

      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [{ data: [40, 55, 30, 80, 60] }],
        }}
        width={Dimensions.get("window").width - 70}
        height={180}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: "#6A0A0A",
          backgroundGradientFrom: "#6A0A0A",
          backgroundGradientTo: "#8C1C1C",
          color: () => "#F4D39A",
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
