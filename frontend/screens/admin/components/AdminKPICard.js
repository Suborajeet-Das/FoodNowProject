import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ADMIN, SIZE } from "../../../constants/Theme";

/**
 * AdminKPICard
 * Props: icon (Ionicons name), label, value, trend ("+12%" | "-3%"), trendUp (bool), color
 */
export default function AdminKPICard({ icon, label, value, trend, trendUp, color }) {
  const accentColor = color || ADMIN.accent;
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: accentColor + "1A" }]}>
        <Ionicons name={icon} size={22} color={accentColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {trend ? (
        <View style={styles.trendRow}>
          <Ionicons
            name={trendUp ? "arrow-up" : "arrow-down"}
            size={12}
            color={trendUp ? ADMIN.green : ADMIN.red}
          />
          <Text style={[styles.trend, { color: trendUp ? ADMIN.green : ADMIN.red }]}>
            {trend}
          </Text>
          <Text style={styles.trendSub}> vs last week</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ADMIN.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: ADMIN.border,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: SIZE.small,
    color: ADMIN.textMuted,
    fontWeight: "500",
    marginBottom: 4,
  },
  value: {
    fontSize: SIZE.h2,
    fontWeight: "700",
    color: ADMIN.text,
    marginBottom: 6,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  trend: {
    fontSize: SIZE.xsmall,
    fontWeight: "600",
    marginLeft: 2,
  },
  trendSub: {
    fontSize: SIZE.xsmall,
    color: ADMIN.textMuted,
  },
});
