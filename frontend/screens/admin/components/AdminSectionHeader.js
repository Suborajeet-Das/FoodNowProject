import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ADMIN, SIZE } from "../../../constants/Theme";

/**
 * AdminSectionHeader
 * Props: title, actionLabel (optional), onAction (optional)
 */
export default function AdminSectionHeader({ title, actionLabel, onAction }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  title: {
    fontSize: SIZE.large,
    fontWeight: "700",
    color: ADMIN.text,
  },
  action: {
    fontSize: SIZE.small,
    fontWeight: "600",
    color: ADMIN.accent,
  },
});
