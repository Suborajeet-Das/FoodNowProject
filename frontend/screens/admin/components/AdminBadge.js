import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ADMIN, SIZE } from "../../../constants/Theme";

const STATUS_MAP = {
  active:    { bg: ADMIN.green + "20", text: ADMIN.green, label: "Active" },
  inactive:  { bg: ADMIN.red + "20",   text: ADMIN.red,   label: "Inactive" },
  pending:   { bg: ADMIN.orange + "20",text: ADMIN.orange, label: "Pending" },
  open:      { bg: ADMIN.green + "20", text: ADMIN.green, label: "Open" },
  closed:    { bg: ADMIN.red + "20",   text: ADMIN.red,   label: "Closed" },
  preparing: { bg: ADMIN.orange + "20",text: ADMIN.orange, label: "Preparing" },
  completed: { bg: ADMIN.accent + "20",text: ADMIN.accent, label: "Completed" },
};

/**
 * AdminBadge
 * Props: status ("active" | "inactive" | "pending" | "open" | "closed" | "preparing" | "completed")
 *        label (override the default label)
 */
export default function AdminBadge({ status = "active", label }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP.active;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <View style={[styles.dot, { backgroundColor: cfg.text }]} />
      <Text style={[styles.text, { color: cfg.text }]}>{label || cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  text: {
    fontSize: SIZE.xsmall,
    fontWeight: "600",
  },
});
