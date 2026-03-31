import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch, Alert,
} from "react-native";
import { SafeAreaView }  from "react-native-safe-area-context";
import { Ionicons }      from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { ADMIN, SIZE } from "../../constants/Theme";

const APP_VERSION  = "2.4.1";
const BUILD_NUMBER = "2041";
const ENV          = "Production";

function ToggleRow({ icon, title, subtitle, value, onChange, color }) {
  return (
    <View style={styles.toggleRow}>
      <View style={[styles.toggleIcon, { backgroundColor: (color || ADMIN.accent) + "18" }]}>
        <Ionicons name={icon} size={18} color={color || ADMIN.accent} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleSub}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: ADMIN.border, true: ADMIN.accent + "88" }}
        thumbColor={value ? ADMIN.accent : ADMIN.textMuted}
      />
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function AdminSystem({ navigation }) {
  const [maintenance, setMaintenance] = useState(false);
  const [ordersOpen,  setOrdersOpen]  = useState(true);
  const [notifs,      setNotifs]      = useState(true);
  const [qrVerify,    setQrVerify]    = useState(true);
  const [autoClose,   setAutoClose]   = useState(false);
  const [analytics,   setAnalytics]   = useState(true);

  const handleDanger = (action) => {
    Alert.alert(
      "Danger Zone",
      `Are you sure you want to ${action}? This action cannot be undone.`,
      [{ text: "Cancel", style: "cancel" }, { text: "Confirm", style: "destructive" }]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={ADMIN.text} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>System Control</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Maintenance Banner */}
        {maintenance && (
          <LinearGradient
            colors={[ADMIN.orange, "#D97706"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.maintenanceBanner}
          >
            <Ionicons name="warning" size={20} color={ADMIN.white} />
            <Text style={styles.maintenanceText}>Maintenance Mode is ACTIVE — app is offline for users</Text>
          </LinearGradient>
        )}

        {/* App Controls */}
        <Text style={styles.groupLabel}>APP CONTROLS</Text>
        <View style={styles.card}>
          <ToggleRow
            icon="construct-outline"
            title="Maintenance Mode"
            subtitle="Blocks all user access to the app"
            value={maintenance}
            onChange={setMaintenance}
            color={ADMIN.orange}
          />
          <View style={styles.rowDivider} />
          <ToggleRow
            icon="cart-outline"
            title="Accept Orders"
            subtitle="Allow customers to place new orders"
            value={ordersOpen}
            onChange={setOrdersOpen}
            color={ADMIN.green}
          />
          <View style={styles.rowDivider} />
          <ToggleRow
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Send order alerts to staff and customers"
            value={notifs}
            onChange={setNotifs}
            color={ADMIN.accent}
          />
        </View>

        {/* Order Settings */}
        <Text style={styles.groupLabel}>ORDER SETTINGS</Text>
        <View style={styles.card}>
          <ToggleRow
            icon="qr-code-outline"
            title="QR Verification"
            subtitle="Require QR scan for order pickup"
            value={qrVerify}
            onChange={setQrVerify}
            color={ADMIN.navyMid}
          />
          <View style={styles.rowDivider} />
          <ToggleRow
            icon="time-outline"
            title="Auto-close Orders"
            subtitle="Auto-complete orders after 30 min"
            value={autoClose}
            onChange={setAutoClose}
            color={ADMIN.purple}
          />
          <View style={styles.rowDivider} />
          <ToggleRow
            icon="pulse-outline"
            title="Analytics Tracking"
            subtitle="Collect usage data for reporting"
            value={analytics}
            onChange={setAnalytics}
            color={ADMIN.accent}
          />
        </View>

        {/* App Info */}
        <Text style={styles.groupLabel}>APP INFORMATION</Text>
        <View style={styles.card}>
          <InfoRow label="App Version"    value={`v${APP_VERSION}`} />
          <View style={styles.rowDivider} />
          <InfoRow label="Build Number"   value={BUILD_NUMBER}      />
          <View style={styles.rowDivider} />
          <InfoRow label="Environment"    value={ENV}               />
          <View style={styles.rowDivider} />
          <InfoRow label="Backend Status" value="✅ Connected"      />
          <View style={styles.rowDivider} />
          <InfoRow label="DB Status"      value="✅ Healthy"        />
        </View>

        {/* Quick Actions */}
        <Text style={styles.groupLabel}>QUICK ACTIONS</Text>
        <View style={styles.actionGrid}>
          {[
            { icon: "refresh",         label: "Clear Cache",     color: ADMIN.accent  },
            { icon: "cloud-upload",    label: "Force Sync",      color: ADMIN.green   },
            { icon: "document-text",   label: "Export Logs",     color: ADMIN.purple  },
            { icon: "mail",            label: "Send Report",     color: ADMIN.orange  },
          ].map((a) => (
            <TouchableOpacity key={a.label} style={styles.actionBtn} activeOpacity={0.7}>
              <View style={[styles.actionIcon, { backgroundColor: a.color + "18" }]}>
                <Ionicons name={`${a.icon}-outline`} size={22} color={a.color} />
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Danger Zone */}
        <Text style={[styles.groupLabel, { color: ADMIN.red }]}>DANGER ZONE</Text>
        <View style={[styles.card, { borderColor: ADMIN.red + "44" }]}>
          {[
            { label: "Reset All Orders",  action: "reset all orders" },
            { label: "Clear Menu Data",   action: "clear all menu items" },
            { label: "Wipe Database",     action: "wipe the entire database" },
          ].map((d, i, arr) => (
            <View key={d.label}>
              <TouchableOpacity
                style={styles.dangerRow}
                onPress={() => handleDanger(d.action)}
              >
                <Ionicons name="warning-outline" size={18} color={ADMIN.red} />
                <Text style={styles.dangerLabel}>{d.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={ADMIN.red} />
              </TouchableOpacity>
              {i < arr.length - 1 && <View style={styles.rowDivider} />}
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:              { flex: 1, backgroundColor: ADMIN.offWhite },
  topBar:            { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, backgroundColor: ADMIN.surface, borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  menuBtn:           { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.offWhite, justifyContent: "center", alignItems: "center", marginRight: 12 },
  pageTitle:         { fontSize: SIZE.large, fontWeight: "700", color: ADMIN.text },
  content:           { padding: 20, paddingBottom: 40 },
  maintenanceBanner: { flexDirection: "row", alignItems: "center", borderRadius: 14, padding: 14, gap: 10, marginBottom: 16 },
  maintenanceText:   { color: ADMIN.white, fontWeight: "600", fontSize: SIZE.small, flex: 1 },
  groupLabel:        { fontSize: 10, fontWeight: "700", color: ADMIN.textMuted, letterSpacing: 1.2, marginBottom: 10, marginTop: 6, marginLeft: 4 },
  card:              { backgroundColor: ADMIN.surface, borderRadius: 16, borderWidth: 1, borderColor: ADMIN.border, marginBottom: 20, overflow: "hidden" },
  rowDivider:        { height: 1, backgroundColor: ADMIN.border },
  toggleRow:         { flexDirection: "row", alignItems: "center", padding: 16 },
  toggleIcon:        { width: 38, height: 38, borderRadius: 11, justifyContent: "center", alignItems: "center" },
  toggleTitle:       { fontSize: SIZE.medium, fontWeight: "600", color: ADMIN.text },
  toggleSub:         { fontSize: SIZE.xsmall, color: ADMIN.textMuted, marginTop: 2 },
  infoRow:           { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 13, paddingHorizontal: 16 },
  infoLabel:         { fontSize: SIZE.medium, color: ADMIN.textMuted },
  infoValue:         { fontSize: SIZE.medium, fontWeight: "600", color: ADMIN.text },
  actionGrid:        { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 20 },
  actionBtn:         { width: "47%", backgroundColor: ADMIN.surface, borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: ADMIN.border, gap: 10 },
  actionIcon:        { width: 46, height: 46, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  actionLabel:       { fontSize: SIZE.small, fontWeight: "600", color: ADMIN.text },
  dangerRow:         { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  dangerLabel:       { flex: 1, fontSize: SIZE.medium, fontWeight: "600", color: ADMIN.red },
});
